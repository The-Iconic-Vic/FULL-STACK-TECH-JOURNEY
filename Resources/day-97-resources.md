# 📚 Day 97 Resources - Pydantic Schemas for Auth

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| Pydantic: EmailStr | https://docs.pydantic.dev/latest/api/types/#pydantic.types.EmailStr | Email validation type |
| Pydantic: Field | https://docs.pydantic.dev/latest/concepts/fields/ | Field validation and metadata |
| Pydantic: Validators | https://docs.pydantic.dev/latest/concepts/validators/ | Custom validation with field_validator |
| Pydantic: Config | https://docs.pydantic.dev/latest/concepts/models/#model-config | Model configuration |
| FastAPI: Response Models | https://fastapi.tiangolo.com/tutorial/response-model/ | Response model documentation |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| Pydantic Schemas for Auth | https://youtu.be/6ThXsUwLWvc | 20 min |

## 🛠️ Essential Packages

| Package | Command | Purpose |
|---------|---------|---------|
| email-validator | `pip install email-validator` | EmailStr validation |
| pydantic | `pip install pydantic` | Validation library |
| pydantic-settings | `pip install pydantic-settings` | Settings validation |

## 📂 Auth Schemas Template

```python
from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime
from typing import Optional

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
        return v

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int

class TokenData(BaseModel):
    username: Optional[str] = None
    user_id: Optional[int] = None
```

## 📖 Further Reading

| Article | Link |
|---------|------|
| Pydantic Models | https://docs.pydantic.dev/latest/concepts/models/ |
| FastAPI Pydantic Integration | https://fastapi.tiangolo.com/tutorial/body/ |

