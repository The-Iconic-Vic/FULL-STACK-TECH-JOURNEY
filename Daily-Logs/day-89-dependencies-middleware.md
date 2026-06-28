# 📅 Day 89: Dependencies & Middleware

**Date:** June 26, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Dependencies, Depends(), Middleware, CORS, Logging, Authentication

---

## 📋 Learning Objectives

- ✅ Create reusable dependencies with `Depends()`
- ✅ Use dependencies with parameters
- ✅ Stack dependencies
- ✅ Implement logging middleware
- ✅ Add CORS middleware
- ✅ Build authentication dependency
- ✅ Protect routes with dependencies

---

## 🎯 Part 1: Dependencies

### What are Dependencies?

Dependencies are reusable functions that can be injected into path operations. They help avoid code duplication and keep your code clean.

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

---

## 🔒 Part 2: Authentication Dependency

### JWT Authentication

```python
# auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from datetime import datetime, timedelta

# Security scheme
security = HTTPBearer()

# Secret key (store in environment variables)
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
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
```

### Protecting Routes

```python
@app.get("/protected/")
async def protected_route(user: dict = Depends(verify_token)):
    return {"message": "Access granted", "user": user}

# With specific user info
def get_current_user(claims: dict = Depends(verify_token)):
    user_id = claims.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    # Fetch user from database
    return {"id": user_id, "username": "user123"}

@app.get("/users/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
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
# middleware.py
from fastapi import Request
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def log_requests(request: Request, call_next):
    """Log all incoming requests."""
    start_time = time.time()
    
    # Log request
    logger.info(f"→ {request.method} {request.url.path}")
    
    # Process request
    response = await call_next(request)
    
    # Log response
    duration = time.time() - start_time
    logger.info(f"← {request.method} {request.url.path} - {response.status_code} - {duration:.3f}s")
    
    return response
```

### Adding Middleware to App

```python
# main.py
from fastapi import FastAPI
from .middleware import log_requests

app = FastAPI()

# Add middleware (order matters!)
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

### Custom Headers Middleware

```python
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response

app.middleware("http")(add_security_headers)
```

---

## 🏗️ Part 4: Complete Implementation

### File: `app/dependencies.py`

```python
"""
Reusable dependencies for the API.
"""

from fastapi import Depends, Query, HTTPException, status
from typing import Optional


def pagination(
    skip: int = Query(0, ge=0, description="Number of items to skip"),
    limit: int = Query(10, ge=1, le=100, description="Number of items to return")
):
    """Pagination dependency."""
    return {"skip": skip, "limit": limit}


def sort_by(
    sort: str = Query("id", description="Field to sort by"),
    order: str = Query("asc", regex="^(asc|desc)$", description="Sort order")
):
    """Sorting dependency."""
    return {"sort": sort, "order": order}


def filter_by(
    search: Optional[str] = Query(None, min_length=1, description="Search term"),
    category: Optional[str] = Query(None, description="Filter by category")
):
    """Filtering dependency."""
    return {"search": search, "category": category}


def get_pagination_and_filters(
    pagination: dict = Depends(pagination),
    sort: dict = Depends(sort_by),
    filters: dict = Depends(filter_by)
):
    """Combine multiple dependencies."""
    return {**pagination, **sort, **filters}


# Authentication dependencies
def verify_api_key(api_key: str = Query(..., description="API Key")):
    """Verify API key."""
    # In production, check against database
    valid_keys = ["test-key-123", "admin-key-456"]
    if api_key not in valid_keys:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )
    return {"api_key": api_key}


def require_admin(auth: dict = Depends(verify_api_key)):
    """Require admin privileges."""
    if auth["api_key"] != "admin-key-456":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return auth
```

### File: `app/middleware.py`

```python
"""
Custom middleware for the API.
"""

from fastapi import Request
from fastapi.responses import JSONResponse
import time
import logging
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def log_requests(request: Request, call_next):
    """Log all incoming requests with timing."""
    start_time = time.time()
    
    # Log request details
    logger.info(f"→ {request.method} {request.url.path}")
    
    # Process request
    try:
        response = await call_next(request)
        duration = time.time() - start_time
        logger.info(f"← {request.method} {request.url.path} - {response.status_code} - {duration:.3f}s")
        return response
    except Exception as e:
        logger.error(f"✗ {request.method} {request.url.path} - Error: {str(e)}")
        raise


async def add_security_headers(request: Request, call_next):
    """Add security headers to all responses."""
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


async def request_id_middleware(request: Request, call_next):
    """Add a unique request ID to each request."""
    request_id = request.headers.get("X-Request-ID") or f"req-{int(time.time()*1000)}"
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response
```

### File: `app/auth.py`

```python
"""
Authentication and authorization functions.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta
import jwt
import os

# Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

security = HTTPBearer()


def create_access_token(data: dict, expires_delta: timedelta = None):
    """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify JWT token."""
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user(payload: dict = Depends(verify_token)):
    """Get current user from token."""
    user_id = payload.get("sub")
    username = payload.get("username")
    
    if not user_id or not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )
    
    return {"id": user_id, "username": username}


def require_admin(current_user: dict = Depends(get_current_user)):
    """Require admin role."""
    # In production, check user role from database
    if current_user["username"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return current_user
```

### File: `app/main.py`

```python
"""
Complete FastAPI application with dependencies and middleware.
"""

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .middleware import log_requests, add_security_headers, request_id_middleware
from .dependencies import get_pagination_and_filters, verify_api_key, require_admin
from .auth import verify_token, get_current_user, require_admin as require_admin_auth
from .routers import items, admin

app = FastAPI(
    title="API with Dependencies & Middleware",
    description="Demonstrates dependencies, authentication, and middleware",
    version="1.0.0"
)

# ============================================
# Add Middleware (order matters)
# ============================================

# 1. Request ID (earliest)
app.middleware("http")(request_id_middleware)

# 2. Logging
app.middleware("http")(log_requests)

# 3. Security headers
app.middleware("http")(add_security_headers)

# 4. CORS (using add_middleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, use specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================
# Include Routers
# ============================================

app.include_router(items.router)
app.include_router(admin.router)


# ============================================
# Protected Endpoints
# ============================================

@app.get("/protected/")
async def protected_route(payload: dict = Depends(verify_token)):
    """Protected endpoint requiring valid JWT."""
    return {
        "message": "Access granted",
        "user": payload,
        "timestamp": "2024-01-01T00:00:00"
    }


@app.get("/users/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current user information."""
    return current_user


# ============================================
# Admin Endpoint
# ============================================

@app.get("/admin/dashboard")
async def admin_dashboard(current_user: dict = Depends(require_admin_auth)):
    """Admin-only dashboard."""
    return {
        "message": "Admin dashboard",
        "user": current_user,
        "stats": {
            "users": 100,
            "items": 500,
            "orders": 50
        }
    }


# ============================================
# Public Endpoints with Dependencies
# ============================================

@app.get("/items/")
async def list_items(
    params: dict = Depends(get_pagination_and_filters)
):
    """List items with pagination, sorting, and filtering."""
    return {
        "params": params,
        "items": [
            {"id": i, "name": f"Item {i}"}
            for i in range(
                params["skip"],
                min(params["skip"] + params["limit"], 100)
            )
        ]
    }


@app.get("/api-keys/")
async def list_api_keys(auth: dict = Depends(verify_api_key)):
    """List API keys (requires API key)."""
    return {
        "message": "API keys accessed",
        "auth": auth,
        "keys": ["key1", "key2", "key3"]
    }


# ============================================
# Health Check
# ============================================

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "timestamp": "2024-01-01T00:00:00"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
```

### File: `app/routers/items.py`

```python
"""
Items router with dependencies.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional
from ..dependencies import pagination, sort_by, filter_by

router = APIRouter(prefix="/items", tags=["items"])

# Mock database
items_db = [
    {"id": 1, "name": "Laptop", "category": "electronics", "price": 999},
    {"id": 2, "name": "Headphones", "category": "audio", "price": 199},
    {"id": 3, "name": "Keyboard", "category": "accessories", "price": 89},
]


@router.get("/")
async def list_items(
    skip: int = 0,
    limit: int = 10,
    sort: str = "id",
    order: str = "asc",
    search: Optional[str] = None,
    category: Optional[str] = None
):
    """List items with pagination, sorting, and filtering."""
    items = items_db.copy()
    
    # Filter by search
    if search:
        items = [i for i in items if search.lower() in i["name"].lower()]
    
    # Filter by category
    if category:
        items = [i for i in items if i["category"] == category]
    
    # Sort
    reverse = order == "desc"
    items = sorted(items, key=lambda x: x.get(sort, ""), reverse=reverse)
    
    # Paginate
    total = len(items)
    items = items[skip:skip + limit]
    
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "items": items
    }


@router.get("/{item_id}")
async def get_item(item_id: int):
    """Get a single item by ID."""
    item = next((i for i in items_db if i["id"] == item_id), None)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item {item_id} not found"
        )
    return item


@router.post("/")
async def create_item(name: str, category: str, price: float):
    """Create a new item."""
    new_item = {
        "id": len(items_db) + 1,
        "name": name,
        "category": category,
        "price": price
    }
    items_db.append(new_item)
    return new_item


@router.delete("/{item_id}")
async def delete_item(item_id: int):
    """Delete an item."""
    item = next((i for i in items_db if i["id"] == item_id), None)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item {item_id} not found"
        )
    items_db.remove(item)
    return {"message": f"Item {item_id} deleted"}
```

### File: `app/routers/admin.py`

```python
"""
Admin router with authentication dependencies.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from ..auth import get_current_user, require_admin

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/dashboard")
async def admin_dashboard(current_user: dict = Depends(require_admin)):
    """Admin dashboard (requires admin role)."""
    return {
        "message": "Welcome to admin dashboard",
        "user": current_user,
        "stats": {
            "total_users": 150,
            "total_items": 45,
            "total_orders": 320
        },
        "recent_activity": [
            {"action": "User created", "timestamp": "2024-01-01T10:00:00"},
            {"action": "Item updated", "timestamp": "2024-01-01T09:30:00"},
            {"action": "Order placed", "timestamp": "2024-01-01T09:00:00"}
        ]
    }


@router.get("/users")
async def list_users(current_user: dict = Depends(require_admin)):
    """List all users (admin only)."""
    return {
        "users": [
            {"id": 1, "username": "admin", "role": "admin"},
            {"id": 2, "username": "user1", "role": "user"},
            {"id": 3, "username": "user2", "role": "user"},
        ]
    }


@router.delete("/users/{user_id}")
async def delete_user(user_id: int, current_user: dict = Depends(require_admin)):
    """Delete a user (admin only)."""
    if user_id == 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete the main admin user"
        )
    return {"message": f"User {user_id} deleted successfully"}
```

---

## 📊 Quick Reference

### Dependency Injection

| Feature | Syntax | Example |
|---------|--------|---------|
| Basic | `Depends(function)` | `Depends(pagination)` |
| With params | `Depends(helper)` | `Depends(get_user)` |
| Stacking | Multiple `Depends` | `pagination: dict = Depends(paginate)` |

### Middleware Order

```
1. Request ID (earliest)
2. Logging
3. Security headers
4. CORS (latest)
```

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
| Dependency not injecting | Wrong parameter name | Match parameter names |
| Middleware order matters | Wrong order | Add in correct sequence |
| CORS not working | Missing configuration | Check allow_origins |
| Token not validating | Wrong secret key | Use same secret key |
| Authentication bypassed | Missing Depends() | Add Depends to routes |

---

## ✅ Day 89 Checklist

- [ ] Create reusable dependencies with `Depends()`
- [ ] Build pagination dependency
- [ ] Create authentication dependency
- [ ] Protect routes with dependencies
- [ ] Implement logging middleware
- [ ] Add CORS middleware
- [ ] Add security headers middleware
- [ ] Stack multiple dependencies
- [ ] Create admin-only routes
- [ ] Test all endpoints with curl/Postman
- [ ] Visit `/docs` for interactive documentation
- [ ] Push code to GitHub

