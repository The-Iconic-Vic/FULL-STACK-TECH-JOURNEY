# 📘 Week 14 Review: Authentication & Authorization

## 🎯 Week 14 Overview

This week covered building a complete authentication system with FastAPI, PostgreSQL, and JWT. The focus was on secure user management, password hashing, token-based authentication, and protecting routes.

---

## 📁 Day 92: PostgreSQL Setup & SQLAlchemy

### Core Concepts

| Concept | Description |
|---------|-------------|
| **PostgreSQL** | Production-ready relational database |
| **SQLAlchemy** | ORM for database interaction |
| **Connection Pooling** | Reuse database connections |
| **Environment Variables** | Secure configuration |

### Quick Reference

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:pass@localhost:5432/db"
engine = create_engine(DATABASE_URL, pool_size=5, max_overflow=10)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

## 🔐 Day 93: User Model & Password Hashing

### Core Concepts

| Concept | Description |
|---------|-------------|
| **User Model** | id, email, username, hashed_password, is_active |
| **bcrypt** | Secure password hashing algorithm |
| **Passlib** | Password hashing library |

### Quick Reference

```python
from passlib.context import CryptContext
from sqlalchemy import Column, Integer, String, Boolean, DateTime

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
```

---

## 🔑 Day 94: JWT Authentication

### Core Concepts

| Concept | Description |
|---------|-------------|
| **JWT** | Stateless authentication token |
| **jwt.encode()** | Create token with payload |
| **jwt.decode()** | Verify and decode token |
| **Expiration** | `exp` claim for token expiry |

### Quick Reference

```python
from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

def create_access_token(data: dict) -> str:
    expire = datetime.utcnow() + timedelta(minutes=30)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> dict:
    return jwt.decode(token, SECRET_KEY, [ALGORITHM])
```

---

## 🛡️ Day 95: Protected Routes & Current User

### Core Concepts

| Concept | Description |
|---------|-------------|
| **oauth2_scheme** | Extracts Bearer token from header |
| **get_current_user** | Validates token and returns user |
| **Depends()** | Dependency injection for auth |

### Quick Reference

```python
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    payload = verify_token(token)
    user = db.query(User).filter(User.id == payload["user_id"]).first()
    if not user:
        raise HTTPException(401, "Invalid token")
    return user

@router.get("/users/me")
async def get_me(user: User = Depends(get_current_user)):
    return user
```

---

## 🔗 Day 96: User-Task Relationship

### Core Concepts

| Concept | Description |
|---------|-------------|
| **Foreign Key** | Links tasks to users |
| **relationship()** | Bidirectional navigation |
| **Cascade Delete** | Delete tasks when user is deleted |

### Quick Reference

```python
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class User(Base):
    # ...
    tasks = relationship("Task", back_populates="user", cascade="all, delete-orphan")

class Task(Base):
    # ...
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    user = relationship("User", back_populates="tasks")

@router.get("/tasks")
async def get_tasks(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Task).filter(Task.user_id == user.id).all()
```

---

## 📝 Day 97: Pydantic Schemas for Auth

### Core Concepts

| Concept | Description |
|---------|-------------|
| **EmailStr** | Automatic email validation |
| **field_validator** | Custom validation rules |
| **Response Models** | Exclude sensitive data |
| **from_attributes** | ORM conversion support |

### Quick Reference

```python
from pydantic import BaseModel, EmailStr, Field, field_validator

class UserCreate(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)

    @field_validator('password')
    def validate_password(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Must contain uppercase')
        if not any(c.islower() for c in v):
            raise ValueError('Must contain lowercase')
        if not any(c.isdigit() for c in v):
            raise ValueError('Must contain a number')
        return v

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
```

---

## 📊 Quick Reference

### Authentication Flow

```
1. User registers → POST /auth/register
2. Password hashed with bcrypt
3. User logs in → POST /auth/login
4. JWT token created and returned
5. Client stores token (localStorage/headers)
6. Client sends token in Authorization header
7. get_current_user validates token
8. Protected routes return user-specific data
```

### Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@localhost:5432/db` |
| `SECRET_KEY` | JWT signing | `your-secret-key-here` |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiry | `30` |

### HTTP Status Codes for Auth

| Code | Meaning | Use Case |
|------|---------|----------|
| 201 | Created | User registration |
| 200 | OK | Login, successful requests |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Invalid/expired token |
| 403 | Forbidden | Account deactivated |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate email/username |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Never store plain text passwords** | Always use bcrypt hashing |
| **JWT is stateless** | No server-side session storage |
| **Always filter by user_id** | Prevent data leakage |
| **Use EmailStr for validation** | Automatic email format validation |
| **Set token expiration** | Reduce security risk |
| **Cascade delete** | Clean up child records |
| **from_attributes for ORM** | Required for SQLAlchemy responses |
| **Protected routes via Depends()** | Clean dependency injection |

