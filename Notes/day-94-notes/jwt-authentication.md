# 📘 JWT Authentication

## 🎯 What is JWT?

JWT (JSON Web Token) is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. It's commonly used for authentication and authorization in web applications.

### JWT Structure

A JWT consists of three parts separated by dots:

```
xxxxx.yyyyy.zzzzz
  │     │     │
  │     │     └── Signature (verifies token integrity)
  │     └──────── Payload (claims/data)
  └────────────── Header (algorithm, type)
```

### JWT Components

| Part | Description | Example |
|------|-------------|---------|
| **Header** | Algorithm and token type | `{"alg": "HS256", "typ": "JWT"}` |
| **Payload** | Claims (data) | `{"sub": "user123", "exp": 1234567890}` |
| **Signature** | Verifies integrity | `HMACSHA256(header + "." + payload, secret)` |

### Why JWT?

| Feature | Benefit |
|---------|---------|
| **Stateless** | No server-side session storage |
| **Self-contained** | All user info in the token |
| **Scalable** | Works across multiple servers |
| **Cross-domain** | Can be used across different domains |
| **Standard** | Widely supported |

---

## 🔧 Part 1: JWT Setup

### Installation

```bash
pip install python-jose[cryptography]
pip install python-multipart
```

### Environment Configuration

```bash
# .env
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### JWT Utilities

```python
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import HTTPException, status
from .config import settings


def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def verify_token(token: str) -> dict:
    """Verify and decode a JWT token."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
```

---

## 🔐 Part 2: Login Endpoint

### OAuth2 Password Flow

FastAPI provides `OAuth2PasswordRequestForm` for handling login requests.

```python
from fastapi.security import OAuth2PasswordRequestForm


@router.post("/auth/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Login endpoint returning JWT access token."""
    
    # Find user
    user = db.query(User).filter(User.username == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Create token
    access_token = create_access_token(
        data={"sub": user.username, "user_id": user.id}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }
```

---

## 🛡️ Part 3: Token Verification

### OAuth2 Scheme

```python
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    """Get current user from JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        user_id = payload.get("user_id")
        
        if username is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload"
            )
        
        return {"username": username, "user_id": user_id}
    
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
```

### Protected Routes

```python
@router.get("/users/me")
async def get_current_user(current_user: dict = Depends(get_current_user)):
    """Get current user profile."""
    return current_user


@router.get("/protected")
async def protected_route(current_user: dict = Depends(get_current_user)):
    """Protected route example."""
    return {"message": "Access granted", "user": current_user}
```

---

## 📊 Quick Reference

### JWT Functions

| Function | Purpose |
|----------|---------|
| `jwt.encode(payload, key, algorithm)` | Create JWT token |
| `jwt.decode(token, key, algorithms)` | Decode JWT token |
| `create_access_token(data)` | Custom token creation |

### JWT Headers

```bash
# Authorization header format
Authorization: Bearer <your-jwt-token>

# Example curl
curl -X GET http://localhost:8000/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Token Payload Claims

| Claim | Purpose | Example |
|-------|---------|---------|
| `sub` | Subject (username) | `"user123"` |
| `exp` | Expiration time | `1234567890` |
| `iat` | Issued at time | `1234567890` |
| `user_id` | User ID (custom) | `1` |
| `email` | User email (custom) | `"user@example.com"` |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `JWTError: Signature verification failed` | Wrong secret key | Use same SECRET_KEY |
| `JWTError: Expired token` | Token expired | Refresh token |
| `401 Unauthorized` | Missing/invalid token | Include `Bearer ` prefix |
| `'alg' not allowed` | Wrong algorithm | Use `HS256` |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **JWT is stateless** | No server-side session storage |
| **Always set expiration** | Tokens should expire |
| **Sign with SECRET_KEY** | Must be kept secure |
| **Bearer scheme** | Authorization: Bearer `<token>` |
| **Verify before using** | Always verify token integrity |
| **Extract user from token** | `sub` claim identifies user |

