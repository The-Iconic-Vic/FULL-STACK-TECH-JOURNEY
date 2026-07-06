# 📅 Day 97: Pydantic Schemas for Auth

**Date:** July 4, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Pydantic Schemas, EmailStr, Password Validation, Response Models, Token Schemas

---

## 📋 Learning Objectives

- ✅ Create type-safe auth schemas with Pydantic
- ✅ Use EmailStr for email validation
- ✅ Implement password strength validation
- ✅ Build proper response models
- ✅ Create token schemas for JWT
- ✅ Use `from_attributes` for ORM conversion

---

## 🎯 Part 1: Email Validation with EmailStr

### What is EmailStr?

`EmailStr` is a Pydantic type that automatically validates email format using the `email-validator` library.

### Installation

```bash
pip install email-validator
```

### Using EmailStr

```python
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr  # Auto-validates email format
    username: str
    password: str

# Valid
user = UserCreate(
    email="user@example.com",  # ✅ Valid
    username="john",
    password="secure123"
)

# Invalid - raises ValidationError
user = UserCreate(
    email="invalid-email",  # ❌ Invalid
    username="john",
    password="secure123"
)
```

### Email Validation Results

| Input | Result |
|-------|--------|
| `user@example.com` | ✅ Valid |
| `user.name@domain.com` | ✅ Valid |
| `invalid-email` | ❌ Invalid (ValidationError) |
| `user@.com` | ❌ Invalid (ValidationError) |
| `user@domain` | ❌ Invalid (ValidationError) |

---

## 🔐 Part 2: Password Validation

### Inline Field Validation

```python
from pydantic import BaseModel, Field, field_validator

class UserCreate(BaseModel):
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
        if not any(c in "!@#$%^&*()_+-=[]{}|;:'\",.<>/?`~" for c in v):
            raise ValueError('Password must contain a special character')
        return v
```

### Password Strength Levels

```python
from enum import Enum

class PasswordStrength(Enum):
    WEAK = "weak"
    MEDIUM = "medium"
    STRONG = "strong"
    VERY_STRONG = "very_strong"

def check_password_strength(password: str) -> dict:
    """Check password strength and return feedback."""
    score = 0
    feedback = []
    
    if len(password) >= 8:
        score += 1
    else:
        feedback.append("Password should be at least 8 characters")
    
    if any(c.isupper() for c in password):
        score += 1
    else:
        feedback.append("Add uppercase letters")
    
    if any(c.islower() for c in password):
        score += 1
    else:
        feedback.append("Add lowercase letters")
    
    if any(c.isdigit() for c in password):
        score += 1
    else:
        feedback.append("Add numbers")
    
    if any(c in "!@#$%^&*()_+-=[]{}|;:'\",.<>/?`~" for c in password):
        score += 1
    else:
        feedback.append("Add special characters")
    
    # Determine strength
    if score <= 2:
        strength = PasswordStrength.WEAK
    elif score <= 3:
        strength = PasswordStrength.MEDIUM
    elif score <= 4:
        strength = PasswordStrength.STRONG
    else:
        strength = PasswordStrength.VERY_STRONG
    
    return {
        "strength": strength.value,
        "score": score,
        "feedback": feedback
    }
```

---

## 📝 Part 3: Complete Auth Schemas

```python
# schemas.py
from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime
from typing import Optional, List


# ============================================
# User Schemas
# ============================================

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
        errors = []
        if len(v) < 8:
            errors.append("Password must be at least 8 characters")
        if not any(c.isupper() for c in v):
            errors.append("Password must contain an uppercase letter")
        if not any(c.islower() for c in v):
            errors.append("Password must contain a lowercase letter")
        if not any(c.isdigit() for c in v):
            errors.append("Password must contain a number")
        if not any(c in "!@#$%^&*()_+-=[]{}|;:'\",.<>/?`~" for c in v):
            errors.append("Password must contain a special character")
        
        if errors:
            raise ValueError(errors)
        return v


class UserUpdate(BaseModel):
    """Schema for updating user profile."""
    email: Optional[EmailStr] = None
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    password: Optional[str] = Field(None, min_length=8)
    is_active: Optional[bool] = None
    
    @field_validator('username')
    def validate_username(cls, v):
        if v and not v.isalnum():
            raise ValueError('Username must be alphanumeric')
        return v
    
    @field_validator('password')
    def validate_password(cls, v):
        if v:
            errors = []
            if len(v) < 8:
                errors.append("Password must be at least 8 characters")
            if not any(c.isupper() for c in v):
                errors.append("Password must contain an uppercase letter")
            if not any(c.islower() for c in v):
                errors.append("Password must contain a lowercase letter")
            if not any(c.isdigit() for c in v):
                errors.append("Password must contain a number")
            if errors:
                raise ValueError(errors)
        return v


class UserResponse(BaseModel):
    """Schema for user response (excludes password)."""
    id: int
    email: EmailStr
    username: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class UserWithTasksResponse(UserResponse):
    """User response with tasks."""
    tasks: List['TaskResponse'] = []


# ============================================
# Task Schemas
# ============================================

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    completed: Optional[bool] = None

class TaskResponse(TaskBase):
    id: int
    completed: bool
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# ============================================
# Auth Schemas
# ============================================

class LoginRequest(BaseModel):
    """Schema for login request."""
    username_or_email: str
    password: str


class Token(BaseModel):
    """Schema for JWT token response."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class TokenData(BaseModel):
    """Schema for decoded token data."""
    username: Optional[str] = None
    user_id: Optional[int] = None
    email: Optional[str] = None


class PasswordResetRequest(BaseModel):
    """Schema for password reset request."""
    email: EmailStr


class PasswordResetConfirm(BaseModel):
    """Schema for password reset confirmation."""
    token: str
    new_password: str = Field(..., min_length=8)


class ChangePassword(BaseModel):
    """Schema for changing password."""
    old_password: str
    new_password: str = Field(..., min_length=8)
    
    @field_validator('new_password')
    def validate_password(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain an uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain a lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain a number')
        return v


class RefreshTokenRequest(BaseModel):
    """Schema for token refresh."""
    refresh_token: Optional[str] = None


# ============================================
# Error Schemas
# ============================================

class ErrorResponse(BaseModel):
    """Schema for error responses."""
    error: bool = True
    status_code: int
    detail: str
    timestamp: datetime
    path: Optional[str] = None


# ============================================
# Pagination Schemas
# ============================================

class PaginatedResponse(BaseModel):
    """Schema for paginated responses."""
    total: int
    skip: int
    limit: int
    data: List[dict]


# Handle forward references
UserWithTasksResponse.model_rebuild()
```

---

## 🛡️ Part 4: Auth Router with Schemas

```python
# routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from .. import models, schemas, auth
from ..database import get_db
from ..config import settings
from ..validators import check_password_strength

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: schemas.UserCreate,
    db: Session = Depends(get_db)
):
    """Register a new user with validation."""
    
    # Check existing email
    existing = db.query(models.User).filter(
        models.User.email == user_data.email
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    # Check existing username
    existing = db.query(models.User).filter(
        models.User.username == user_data.username
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already taken"
        )
    
    # Check password strength
    strength = check_password_strength(user_data.password)
    if strength["score"] < 3:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Weak password: {', '.join(strength['feedback'])}"
        )
    
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


@router.post("/login", response_model=schemas.Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Login and receive JWT token."""
    
    # Find user by username
    user = db.query(models.User).filter(
        models.User.username == form_data.username
    ).first()
    
    if not user:
        # Try email
        user = db.query(models.User).filter(
            models.User.email == form_data.username
        ).first()
    
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated"
        )
    
    # Create token
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


@router.post("/password-reset-request")
async def request_password_reset(
    reset_data: schemas.PasswordResetRequest,
    db: Session = Depends(get_db)
):
    """Request password reset (email will be sent)."""
    user = db.query(models.User).filter(
        models.User.email == reset_data.email
    ).first()
    
    if not user:
        # Don't reveal if email exists (security)
        return {"message": "If email exists, reset link has been sent"}
    
    # Generate reset token (simplified)
    reset_token = auth.create_access_token(
        data={"sub": user.username, "reset": True},
        expires_delta=timedelta(minutes=15)
    )
    
    # In production, send email with reset token
    return {
        "message": "Password reset link sent",
        "reset_token": reset_token  # Remove in production
    }


@router.post("/password-reset-confirm")
async def confirm_password_reset(
    reset_data: schemas.PasswordResetConfirm,
    db: Session = Depends(get_db)
):
    """Confirm password reset with token."""
    # Decode token
    try:
        payload = auth.verify_token(reset_data.token)
        username = payload.get("sub")
        is_reset = payload.get("reset", False)
        
        if not is_reset:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid reset token"
            )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    user = db.query(models.User).filter(
        models.User.username == username
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update password
    user.hashed_password = auth.hash_password(reset_data.new_password)
    db.commit()
    
    return {"message": "Password reset successful"}


@router.post("/change-password", response_model=schemas.UserResponse)
async def change_password(
    change_data: schemas.ChangePassword,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Change current user's password."""
    
    # Verify old password
    if not auth.verify_password(change_data.old_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password"
        )
    
    # Update password
    current_user.hashed_password = auth.hash_password(change_data.new_password)
    db.commit()
    db.refresh(current_user)
    
    return current_user
```

---

## 📊 Quick Reference

### Pydantic Types for Auth

| Type | Purpose | Example |
|------|---------|---------|
| `EmailStr` | Email validation | `email: EmailStr` |
| `Field(..., min_length=3)` | Required with min length | `username: str = Field(..., min_length=3)` |
| `field_validator` | Custom validation | `@field_validator('password')` |
| `Optional[Type]` | Optional field | `email: Optional[EmailStr] = None` |
| `from_attributes = True` | ORM conversion | `class Config: from_attributes = True` |

### Validation Patterns

| Pattern | Example |
|---------|---------|
| Length validation | `Field(..., min_length=3, max_length=50)` |
| Email validation | `EmailStr` |
| Custom validator | `@field_validator('field')` |
| Multiple validators | Multiple `@field_validator` methods |

### Response Model Options

| Option | Purpose |
|--------|---------|
| `response_model` | Model for response |
| `status_code` | HTTP status code |
| `response_model_exclude` | Exclude fields |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `email-validator` not found | Package not installed | `pip install email-validator` |
| `ValueError: invalid email` | Invalid email format | Use `EmailStr` type |
| `ValidationError` in nested fields | Invalid nested structure | Check field values |
| `from_attributes` error | Wrong Config | Use `from_attributes = True` |

---

## ✅ Day 97 Checklist

- [ ] Install `email-validator`
- [ ] Create UserCreate schema with EmailStr
- [ ] Add password validation with field_validator
- [ ] Create UserResponse schema
- [ ] Create Token and TokenData schemas
- [ ] Add login schema (username_or_email)
- [ ] Add password reset schemas
- [ ] Use response_model in endpoints
- [ ] Test all validation rules
- [ ] Push code to GitHub

