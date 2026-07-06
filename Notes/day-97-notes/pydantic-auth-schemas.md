# 📘 Pydantic Schemas for Authentication

## 🎯 Overview

Pydantic schemas define the structure and validation rules for data entering and leaving your API. For authentication, they ensure that user data is properly validated before processing.

---

## 📝 Part 1: Email Validation with EmailStr

### What is EmailStr?

`EmailStr` is a Pydantic type that automatically validates email format using the `email-validator` library.

```python
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr  # Auto-validates email format
    username: str
    password: str
```

### Installation

```bash
pip install email-validator
```

### Email Validation Results

| Input | Result |
|-------|--------|
| `user@example.com` | ✅ Valid |
| `user.name@domain.com` | ✅ Valid |
| `invalid-email` | ❌ Invalid |
| `user@.com` | ❌ Invalid |
| `user@domain` | ❌ Invalid |

---

## 🔐 Part 2: Password Validation

### Using field_validator

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
            raise ValueError('Password must contain uppercase')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain lowercase')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain a number')
        if not any(c in "!@#$%^&*()_+-=[]{}|;:'\",.<>/?`~" for c in v):
            raise ValueError('Password must contain special character')
        return v
```

### Password Strength Check

```python
def check_password_strength(password: str) -> dict:
    score = 0
    feedback = []
    
    if len(password) >= 8:
        score += 1
    else:
        feedback.append("At least 8 characters")
    
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
    
    return {
        "strength": ["Weak", "Medium", "Strong", "Very Strong"][min(score, 4) - 1],
        "score": score,
        "feedback": feedback
    }
```

---

## 📝 Part 3: Complete Auth Schemas

### User Schemas

```python
class UserCreate(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    password: Optional[str] = Field(None, min_length=8)
    is_active: Optional[bool] = None

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
```

### Token Schemas

```python
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int

class TokenData(BaseModel):
    username: Optional[str] = None
    user_id: Optional[int] = None
    email: Optional[str] = None

class LoginRequest(BaseModel):
    username_or_email: str
    password: str

class ChangePassword(BaseModel):
    old_password: str
    new_password: str = Field(..., min_length=8)
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

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **EmailStr validates email** | `EmailStr` auto-validates email format |
| **field_validator adds custom rules** | Use for password strength, username rules |
| **from_attributes enables ORM conversion** | Required for SQLAlchemy responses |
| **Optional fields for updates** | Allow partial updates |
| **Response models exclude passwords** | Never return hashed_password |

