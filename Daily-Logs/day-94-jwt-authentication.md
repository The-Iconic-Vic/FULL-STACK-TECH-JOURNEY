# 📅 Day 94: JWT Authentication

**Date:** July 1, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** JWT Setup, Token Creation, Token Verification, Login Endpoint, Protected Routes

---

## 📋 Learning Objectives

- ✅ Install and configure python-jose for JWT
- ✅ Create JWT tokens with jwt.encode()
- ✅ Verify and decode tokens with jwt.decode()
- ✅ Implement login endpoint returning access token
- ✅ Set token expiration
- ✅ Protect routes with token verification dependency

---

## 🎯 Part 1: What is JWT?

### JWT (JSON Web Token)

JWT is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. It's commonly used for authentication and authorization.

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
| **Signature** | Verifies integrity | `HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)` |

### Why JWT?

| Feature | Benefit |
|---------|---------|
| **Stateless** | No server-side session storage |
| **Self-contained** | All user info in the token |
| **Scalable** | Works across multiple servers |
| **Cross-domain** | Can be used across different domains |
| **Standard** | Widely supported |

---

## 🔧 Part 2: JWT Setup

### Installation

```bash
# Core JWT library with cryptography support
pip install python-jose[cryptography]

# Required for OAuth2 password flow
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
# auth.py
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import HTTPException, status
from .config import settings


def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    """
    Create a JWT access token.
    
    Args:
        data: Dictionary of claims to encode
        expires_delta: Custom expiration time (optional)
    
    Returns:
        Encoded JWT string
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> dict:
    """
    Verify and decode a JWT token.
    
    Args:
        token: JWT string to verify
    
    Returns:
        Decoded payload dictionary
    
    Raises:
        HTTPException: If token is invalid or expired
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_token_data(token: str) -> dict:
    """
    Get data from token without verification (for debugging).
    """
    try:
        return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except JWTError:
        return None
```

### Configuration

```python
# config.py
import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Application settings."""

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/db")
    
    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # Server
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"


settings = Settings()
```

---

## 🔐 Part 3: Login Endpoint

### OAuth2 Password Flow

FastAPI provides `OAuth2PasswordRequestForm` for handling login requests.

```python
from fastapi.security import OAuth2PasswordRequestForm


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Login endpoint using OAuth2 password flow.
    
    Args:
        form_data: OAuth2 form with username and password
    
    Returns:
        Access token for authentication
    """
    # Find user
    user = db.query(User).filter(User.username == form_data.username).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Verify password
    if not verify_password(form_data.password, user.hashed_password):
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

### Complete Auth Router

```python
# routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from .. import models, schemas, auth
from ..database import get_db
from ..config import settings

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=schemas.UserResponse, status_code=201)
async def register(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register a new user."""
    # Check existing email
    existing = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing:
        raise HTTPException(409, "Email already registered")
    
    # Check existing username
    existing = db.query(models.User).filter(models.User.username == user_data.username).first()
    if existing:
        raise HTTPException(409, "Username already taken")
    
    # Hash password
    hashed = auth.hash_password(user_data.password)
    
    # Create user
    db_user = models.User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user


@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Login endpoint returning JWT access token.
    
    Args:
        form_data: OAuth2 form with username and password
    
    Returns:
        Access token with bearer scheme
    """
    # Find user
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Verify password
    if not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated"
        )
    
    # Create access token
    access_token = auth.create_access_token(
        data={
            "sub": user.username,
            "user_id": user.id,
            "email": user.email
        }
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }


@router.post("/refresh")
async def refresh_token(
    current_user: dict = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Refresh access token."""
    user = db.query(models.User).filter(models.User.id == current_user["user_id"]).first()
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user"
        )
    
    # Create new token
    access_token = auth.create_access_token(
        data={
            "sub": user.username,
            "user_id": user.id,
            "email": user.email
        }
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }
```

---

## 🛡️ Part 4: Protected Routes

### Token Verification Dependency

```python
# auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

# OAuth2 scheme (extracts token from Authorization header)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Get current user from JWT token.
    
    Args:
        token: JWT token from Authorization header
    
    Returns:
        User data from token payload
    
    Raises:
        HTTPException: If token is invalid
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        
        if username is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload"
            )
        
        return {"username": username, "user_id": user_id}
    
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


# Optional: Get current user with database lookup
def get_current_user_db(
    token_data: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current user from database."""
    user = db.query(User).filter(User.id == token_data["user_id"]).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated"
        )
    
    return user
```

### Protected User Routes

```python
# routers/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import schemas, auth
from ..database import get_db

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=schemas.UserResponse)
async def get_current_user(
    current_user: models.User = Depends(auth.get_current_user_db),
    db: Session = Depends(get_db)
):
    """Get current user profile."""
    return current_user


@router.put("/me", response_model=schemas.UserResponse)
async def update_current_user(
    user_update: schemas.UserUpdate,
    current_user: models.User = Depends(auth.get_current_user_db),
    db: Session = Depends(get_db)
):
    """Update current user profile."""
    update_data = user_update.model_dump(exclude_unset=True)
    
    if "password" in update_data:
        update_data["hashed_password"] = auth.hash_password(update_data.pop("password"))
    
    for key, value in update_data.items():
        setattr(current_user, key, value)
    
    db.commit()
    db.refresh(current_user)
    
    return current_user


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_current_user(
    current_user: models.User = Depends(auth.get_current_user_db),
    db: Session = Depends(get_db)
):
    """Delete current user account (soft delete)."""
    current_user.is_active = False
    db.commit()
    return


@router.get("/")
async def list_users(
    skip: int = 0,
    limit: int = 10,
    current_user: models.User = Depends(auth.get_current_user_db),
    db: Session = Depends(get_db)
):
    """List all users (admin only)."""
    # Only allow admin users (in real app, check role)
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users
```

---

## 🏗️ Part 5: Complete Main Application

```python
# main.py
from fastapi import FastAPI
from .database import engine, Base
from .routers import auth, users

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="JWT Authentication API",
    description="API with JWT-based authentication",
    version="1.0.0"
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to the JWT Authentication API",
        "endpoints": {
            "POST /auth/register": "Register a new user",
            "POST /auth/login": "Login and get JWT token",
            "POST /auth/refresh": "Refresh JWT token",
            "GET /users/me": "Get current user profile (protected)",
            "PUT /users/me": "Update current user profile (protected)",
            "DELETE /users/me": "Delete current user account (protected)",
            "/docs": "Interactive API documentation"
        }
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
```

---

## 📊 Quick Reference

### JWT Functions

| Function | Purpose |
|----------|---------|
| `jwt.encode(payload, key, algorithm)` | Create JWT token |
| `jwt.decode(token, key, algorithms)` | Decode JWT token |
| `create_access_token(data)` | Custom token creation with expiration |

### JWT Headers for Requests

```bash
# Authorization header format
Authorization: Bearer <your-jwt-token>

# Example curl request
curl -X GET http://localhost:8000/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Token Payload Claims

| Claim | Purpose | Example |
|-------|---------|---------|
| `sub` | Subject (usually username/user ID) | `"user123"` |
| `exp` | Expiration time (Unix timestamp) | `1234567890` |
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

## ✅ Day 94 Checklist

- [ ] Install `python-jose[cryptography]` and `python-multipart`
- [ ] Configure JWT settings in `.env`
- [ ] Create JWT utilities (encode, decode)
- [ ] Implement login endpoint with token creation
- [ ] Add OAuth2PasswordRequestForm
- [ ] Create token verification dependency
- [ ] Protect routes with `Depends(get_current_user)`
- [ ] Test login and token extraction
- [ ] Test protected routes with Bearer token
- [ ] Push code to GitHub

