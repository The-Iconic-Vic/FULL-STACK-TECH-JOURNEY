# 📘 FastAPI Dependencies & Middleware

## 🎯 Overview

Dependencies and middleware are powerful features in FastAPI that help you write cleaner, more maintainable code. **Dependencies** inject reusable logic into endpoints, while **middleware** runs code before every request.

---

## 📝 Part 1: Dependencies

### What are Dependencies?

Dependencies are reusable functions that can be injected into path operations. They help avoid code duplication and keep your code organized.

```python
from fastapi import FastAPI, Depends

app = FastAPI()

# Simple dependency
def pagination(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

@app.get("/items/")
async def get_items(pagination: dict = Depends(pagination)):
    return pagination
```

### Dependency with Parameters

```python
def pagination(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

def sort_by(sort_field: str = "id", order: str = "asc"):
    return {"sort_field": sort_field, "order": order}

@app.get("/items/")
async def get_items(
    pagination: dict = Depends(pagination),
    sort: dict = Depends(sort_by)
):
    return {**pagination, **sort}
```

### Stacking Dependencies

```python
def get_token():
    return "token123"

def verify_token(token: str = Depends(get_token)):
    if token != "token123":
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"user": "authenticated"}

@app.get("/protected/")
async def protected_endpoint(auth: dict = Depends(verify_token)):
    return auth
```

### Dependency with Class

```python
class Pagination:
    def __init__(self, skip: int = 0, limit: int = 10):
        self.skip = skip
        self.limit = limit

async def pagination_dep(skip: int = 0, limit: int = 10):
    return Pagination(skip=skip, limit=limit)

@app.get("/items/")
async def get_items(pagination: Pagination = Depends(pagination_dep)):
    return {"skip": pagination.skip, "limit": pagination.limit}
```

### Dependency with Yield (Database Sessions)

```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/items/")
async def get_items(db: Session = Depends(get_db)):
    return db.query(Item).all()
```

---

## 🔒 Part 2: Authentication Dependency

### Basic Authentication

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    if token != "valid-token":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    return {"user": "authenticated"}

@app.get("/protected/")
async def protected_route(user: dict = Depends(verify_token)):
    return user
```

### JWT Authentication

```python
import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

def create_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

### Getting Current User

```python
def get_current_user(payload: dict = Depends(verify_token)):
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"id": user_id, "username": "user123"}

@app.get("/users/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
```

### Role-Based Authorization

```python
def require_admin(current_user: dict = Depends(get_current_user)):
    if current_user["username"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return current_user

@app.get("/admin/dashboard")
async def admin_dashboard(current_user: dict = Depends(require_admin)):
    return {"message": "Admin access granted"}
```

---

## 🛠️ Part 3: Middleware

### What is Middleware?

Middleware runs **before** every request and can modify the request/response.

```
Request → Middleware → Route → Response → Middleware → Client
```

### Logging Middleware

```python
from fastapi import Request
import time
import logging

logger = logging.getLogger(__name__)

async def log_requests(request: Request, call_next):
    start_time = time.time()
    
    logger.info(f"→ {request.method} {request.url.path}")
    response = await call_next(request)
    
    duration = time.time() - start_time
    logger.info(f"← {request.method} {request.url.path} - {response.status_code} - {duration:.3f}s")
    
    return response

app.middleware("http")(log_requests)
```

### CORS Middleware

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, use specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Security Headers Middleware

```python
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response

app.middleware("http")(add_security_headers)
```

### Request ID Middleware

```python
import uuid

async def request_id_middleware(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response

app.middleware("http")(request_id_middleware)
```

### Rate Limiting Middleware (Simple)

```python
from collections import defaultdict
import time

rate_limit_store = defaultdict(list)

async def rate_limit_middleware(request: Request, call_next):
    client_ip = request.client.host
    current_time = time.time()
    
    # Clean old entries
    rate_limit_store[client_ip] = [
        t for t in rate_limit_store[client_ip] 
        if current_time - t < 60
    ]
    
    # Check limit (10 requests per minute)
    if len(rate_limit_store[client_ip]) >= 10:
        return JSONResponse(
            status_code=429,
            content={"detail": "Too many requests"}
        )
    
    rate_limit_store[client_ip].append(current_time)
    return await call_next(request)
```

### Middleware Order

```python
# Order matters! They execute in this order
app.middleware("http")(request_id_middleware)  # 1st
app.middleware("http")(log_requests)            # 2nd
app.middleware("http")(add_security_headers)    # 3rd

# CORS uses add_middleware (not decorator)
app.add_middleware(CORSMiddleware, ...)         # 4th
```

---

## 📊 Quick Reference

### Dependencies

| Feature | Syntax | Example |
|---------|--------|---------|
| Basic | `Depends(function)` | `Depends(pagination)` |
| With params | `Depends(helper)` | `Depends(get_user)` |
| Stacking | Multiple `Depends` | `pagination: dict = Depends(paginate)` |
| Yield | `def dep(): yield` | Database sessions |

### Middleware

| Feature | Syntax | Example |
|---------|--------|---------|
| Decorator | `@app.middleware("http")` | Logging |
| Add | `app.add_middleware()` | CORS |
| Order | Top to bottom | Request ID → Logging → Headers |

### Common Dependencies Use Cases

| Use Case | Description |
|----------|-------------|
| Authentication | Verify JWT tokens |
| Pagination | Reusable pagination params |
| Database Session | Get DB connection |
| Rate Limiting | Limit requests per IP |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Dependency not injecting | Wrong parameter name | Match parameter names exactly |
| Middleware order matters | Wrong execution order | Add in correct sequence |
| CORS not working | Missing configuration | Check allow_origins |
| Token not validating | Wrong secret key | Use same secret key |
| Authentication bypassed | Missing `Depends()` | Add Depends to routes |
| Rate limiting not working | No cleanup | Clean old entries |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Dependencies = reusable logic** | Inject functions into endpoints |
| **Depends() injects dependencies** | `param: Type = Depends(function)` |
| **Dependencies can stack** | One endpoint can have multiple deps |
| **Middleware runs before requests** | Execute code for every request |
| **Order of middleware matters** | They execute top to bottom |
| **CORS uses add_middleware** | Different syntax than decorator |
| **Use yield for cleanup** | Database sessions, resources |

