from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


# ==========================================
# Task Schemas
# ==========================================

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100, examples=["Complete assignment"])
    description: Optional[str] = Field(None, examples=["Finish the FastAPI authentication task"])
    is_completed: bool = Field(default=False)

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    is_completed: Optional[bool] = None

class TaskResponse(TaskBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ==========================================
# User Schemas
# ==========================================

class UserBase(BaseModel):
    email: EmailStr = Field(..., examples=["user@example.com"])
    username: str = Field(..., min_length=3, max_length=50, examples=["john_doe"])

class UserRegister(UserBase):
    password: str = Field(..., min_length=6, max_length=128, examples=["secretpassword123"])

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ==========================================
# Auth / Token Schemas
# ==========================================

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
