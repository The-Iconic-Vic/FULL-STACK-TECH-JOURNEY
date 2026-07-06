# 📘 User Model & Password Hashing

## 🎯 Overview

User authentication is a critical part of any application. This guide covers creating a User model with SQLAlchemy and implementing secure password storage using passlib and bcrypt.

---

## 📝 Part 1: User Model

### Why a User Model?

The User model stores all authentication-related data for your application's users. It must be designed with security in mind, especially for password storage.

### Required Fields

| Field | SQLAlchemy Type | Purpose |
|-------|-----------------|---------|
| `id` | `Integer` | Unique identifier (primary key) |
| `email` | `String` | User's email (unique, used for login) |
| `username` | `String` | Display name (unique) |
| `hashed_password` | `String` | Securely hashed password |
| `is_active` | `Boolean` | Account status (soft delete) |
| `created_at` | `DateTime` | Account creation timestamp |
| `updated_at` | `DateTime` | Last update timestamp |

### SQLAlchemy User Model

```python
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
```

---

## 🔐 Part 2: Password Hashing

### Why Hash Passwords?

**Never store passwords in plain text!** If your database is compromised, all passwords are exposed.

### Hashing vs Encryption

| Feature | Hashing | Encryption |
|---------|---------|------------|
| **Reversible** | No (one-way) | Yes (two-way) |
| **Purpose** | Verify integrity | Protect confidentiality |
| **Deterministic** | Yes | Yes (with key) |
| **Use Case** | Passwords | Data transmission |

### Installation

```bash
pip install passlib bcrypt
```

### Passlib Configuration

```python
from passlib.context import CryptContext

# Create password context with bcrypt
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12,  # Cost factor
)


def hash_password(password: str) -> str:
    """Hash a plain text password."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hash."""
    return pwd_context.verify(plain_password, hashed_password)


def is_password_hashed(password: str) -> bool:
    """Check if a string is already hashed."""
    return pwd_context.identify(password) is not None
```

---

## 📝 Part 3: Pydantic Schemas

### Request/Response Models

```python
from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime
from typing import Optional


class UserCreate(BaseModel):
    """User registration schema."""
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
    """User login schema."""
    username_or_email: str
    password: str


class UserResponse(BaseModel):
    """User response schema (excludes password)."""
    id: int
    email: str
    username: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
```

---

## 🏗️ Part 4: Registration Endpoint

### Complete Auth Router

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from . import models, schemas, auth
from .database import get_db

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=schemas.UserResponse, status_code=201)
async def register(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register a new user."""
    
    # Check for existing email
    existing = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing:
        raise HTTPException(409, "Email already registered")
    
    # Check for existing username
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
        raise HTTPException(401, "Invalid credentials")
    
    # Verify password
    if not auth.verify_password(login_data.password, user.hashed_password):
        raise HTTPException(401, "Invalid credentials")
    
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email
    }
```

---

## 📊 Quick Reference

### Password Hashing Functions

| Function | Purpose |
|----------|---------|
| `pwd_context.hash(password)` | Hash plain text password |
| `pwd_context.verify(plain, hashed)` | Verify password against hash |
| `pwd_context.identify(hashed)` | Check if string is hashed |

### Registration Flow

```
1. Validate email/username uniqueness
2. Validate password strength
3. Hash password
4. Create user in database
5. Return user info (no password)
```

### HTTP Status Codes for Auth

| Code | Meaning | Use Case |
|------|---------|----------|
| 201 | Created | Successful registration |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Invalid credentials |
| 403 | Forbidden | Account deactivated |
| 409 | Conflict | Duplicate email/username |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Never store plain text passwords** | Always hash before storing |
| **Use bcrypt for hashing** | Industry standard, secure |
| **Unique constraints on email/username** | Prevent duplicates |
| **Hash is one-way** | Can't reverse to get original password |
| **Validation before hashing** | Check password strength first |
| **Response model excludes password** | Never return hashed or plain password |
| **Generic error for invalid credentials** | Don't reveal if email or password is wrong |

