# 📅 Day 93: User Model & Password Hashing

**Date:** June 30, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** User Model, Password Hashing, bcrypt, Passlib, Registration Endpoint

---

## 📋 Learning Objectives

- ✅ Create SQLAlchemy User model with necessary fields
- ✅ Install and configure passlib with bcrypt
- ✅ Hash passwords before storing in database
- ✅ Verify passwords during login
- ✅ Build user registration endpoint
- ✅ Handle duplicate email/username errors

---

## 🎯 Part 1: User Model

### Why a User Model?

The User model represents the users of your application. It stores authentication credentials and user metadata.

### Required Fields

| Field | Type | Purpose |
|-------|------|---------|
| `id` | Integer | Primary key |
| `email` | String | User's email (unique) |
| `username` | String | Display name (unique) |
| `hashed_password` | String | Securely stored password |
| `is_active` | Boolean | Account status |
| `created_at` | DateTime | Account creation timestamp |
| `updated_at` | DateTime | Last update timestamp |

### SQLAlchemy User Model

```python
# models.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from .database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<User {self.username}>"
```

### Pydantic Schemas

```python
# schemas.py
from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime
from typing import Optional


class UserCreate(BaseModel):
    """Schema for user registration."""
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)
    
    @field_validator('username')
    def validate_username(cls, v):
        if not v.isalnum():
            raise ValueError('Username must be alphanumeric')
        return v
    
    @field_validator('password')
    def validate_password(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain an uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain a lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain a number')
        return v


class UserLogin(BaseModel):
    """Schema for user login."""
    username_or_email: str
    password: str


class UserResponse(BaseModel):
    """Schema for user response (excludes password)."""
    id: int
    email: str
    username: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    """Schema for updating user."""
    email: Optional[EmailStr] = None
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    password: Optional[str] = Field(None, min_length=8)
    is_active: Optional[bool] = None


class TokenResponse(BaseModel):
    """Schema for token response."""
    access_token: str
    token_type: str = "bearer"
```

---

## 🔐 Part 2: Password Hashing

### Why Hash Passwords?

**Never store passwords in plain text!** If your database is compromised, all user passwords are exposed.

### What is Password Hashing?

Hashing transforms a password into a fixed-length string that cannot be reversed. When a user logs in, you hash the provided password and compare it to the stored hash.

### Hashing vs Encryption

| Feature | Hashing | Encryption |
|---------|---------|------------|
| **Reversible** | No (one-way) | Yes (two-way) |
| **Purpose** | Verify data integrity | Protect confidentiality |
| **Deterministic** | Yes (same input = same hash) | Yes (with same key) |
| **Use Case** | Passwords | Data transmission |

### Installation

```bash
pip install passlib bcrypt
```

### Passlib Configuration

```python
# auth.py
from passlib.context import CryptContext

# Create password context
pwd_context = CryptContext(
    schemes=["bcrypt"],  # Use bcrypt hashing algorithm
    deprecated="auto",   # Auto-handle deprecated schemes
    bcrypt__rounds=12,   # Cost factor (higher = more secure, slower)
)


def hash_password(password: str) -> str:
    """Hash a plain text password."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hash."""
    return pwd_context.verify(plain_password, hashed_password)


def is_password_hashed(password: str) -> bool:
    """Check if a password is already hashed."""
    return pwd_context.identify(password) is not None
```

### Password Validation

```python
def validate_password_strength(password: str) -> dict:
    """Validate password strength and return feedback."""
    feedback = {
        "is_valid": True,
        "errors": []
    }
    
    if len(password) < 8:
        feedback["is_valid"] = False
        feedback["errors"].append("Password must be at least 8 characters")
    
    if not any(c.isupper() for c in password):
        feedback["is_valid"] = False
        feedback["errors"].append("Password must contain an uppercase letter")
    
    if not any(c.islower() for c in password):
        feedback["is_valid"] = False
        feedback["errors"].append("Password must contain a lowercase letter")
    
    if not any(c.isdigit() for c in password):
        feedback["is_valid"] = False
        feedback["errors"].append("Password must contain a number")
    
    if not any(c in "!@#$%^&*()_+-=[]{}|;:'\",.<>/?`~" for c in password):
        feedback["errors"].append("Password should contain a special character for better security")
    
    return feedback
```

---

## 🏗️ Part 3: Registration Endpoint

### Complete Implementation

```python
# routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register a new user."""
    
    # Check if email already exists
    existing_email = db.query(models.User).filter(
        models.User.email == user_data.email
    ).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    # Check if username already exists
    existing_username = db.query(models.User).filter(
        models.User.username == user_data.username
    ).first()
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already taken"
        )
    
    # Validate password strength
    password_feedback = auth.validate_password_strength(user_data.password)
    if not password_feedback["is_valid"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=password_feedback["errors"]
        )
    
    # Hash password
    hashed_password = auth.hash_password(user_data.password)
    
    # Create user
    db_user = models.User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed_password
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user


@router.post("/login")
async def login(login_data: schemas.UserLogin, db: Session = Depends(get_db)):
    """Login a user."""
    
    # Find user by email or username
    user = db.query(models.User).filter(
        or_(
            models.User.email == login_data.username_or_email,
            models.User.username == login_data.username_or_email
        )
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Verify password
    if not auth.verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated"
        )
    
    # Return user info (will add JWT later)
    return {
        "message": "Login successful",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }
```

### Complete Main Application

```python
# main.py
from fastapi import FastAPI
from .database import engine, Base
from .routers import auth

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="User Authentication API",
    description="API with user registration and password hashing",
    version="1.0.0"
)

# Include routers
app.include_router(auth.router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to the User Authentication API",
        "endpoints": {
            "POST /auth/register": "Register a new user",
            "POST /auth/login": "Login a user",
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

### Password Hashing Functions

| Function | Purpose |
|----------|---------|
| `pwd_context.hash(password)` | Hash a plain text password |
| `pwd_context.verify(plain, hashed)` | Verify password against hash |
| `pwd_context.identify(hashed)` | Check if string is hashed |

### User Model Fields

| Field | SQLAlchemy | Purpose |
|-------|------------|---------|
| `id` | `Column(Integer, primary_key=True)` | Unique identifier |
| `email` | `Column(String, unique=True)` | Login credential |
| `username` | `Column(String, unique=True)` | Display name |
| `hashed_password` | `Column(String)` | Password hash |
| `is_active` | `Column(Boolean, default=True)` | Account status |
| `created_at` | `Column(DateTime, server_default=func.now())` | Creation timestamp |
| `updated_at` | `Column(DateTime, onupdate=func.now())` | Update timestamp |

### Registration Flow

```
1. User sends email, username, password
2. Validate email/username uniqueness
3. Validate password strength
4. Hash password (never store plain text)
5. Create user in database
6. Return user info (without password)
```

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Password must be at least 8 characters` | Password too short | Add validation in Pydantic |
| `Email already registered` | Duplicate email | Handle with 409 Conflict |
| `Invalid credentials` | Wrong password | Return generic 401 |
| `bcrypt` import error | Package not installed | `pip install bcrypt` |
| `ValueError: invalid hashed_password` | Password not hashed | Hash before storing |

---

## ✅ Day 93 Checklist

- [ ] Create SQLAlchemy User model
- [ ] Add required fields: email, username, hashed_password, is_active
- [ ] Install passlib and bcrypt
- [ ] Configure password hashing context
- [ ] Create password hashing utilities
- [ ] Build registration endpoint
- [ ] Handle duplicate email/username errors
- [ ] Validate password strength
- [ ] Return user info without password
- [ ] Test registration with valid/invalid data
- [ ] Push code to GitHub

