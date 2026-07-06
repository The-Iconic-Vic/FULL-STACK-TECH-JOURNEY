# 📅 Day 98: Week 14 Review & Capstone

**Date:** July 5, 2026  
**Author:** Victor Innocent (@IconicVic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Week 14 Review, Authentication System, PostgreSQL, JWT, Task Management, Capstone Project

---

## 📋 Learning Objectives

- ✅ Review all concepts from Days 92-97
- ✅ Complete 5 practice challenges
- ✅ Build a complete authentication system
- ✅ Apply PostgreSQL, JWT, and task management together
- ✅ Deploy and document the project

---

## 🎯 Part 1: Week 14 Concepts Summary

### Day 92: PostgreSQL Setup & SQLAlchemy

| Concept | Key Points |
|---------|-----------|
| **PostgreSQL** | Production database with connection pooling |
| **Connection String** | `postgresql://user:pass@localhost:5432/db` |
| **Environment Variables** | Use `.env` for sensitive config |
| **SQLAlchemy** | ORM for database interaction |

```python
# Quick reference
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

### Day 93: User Model & Password Hashing

| Concept | Key Points |
|---------|-----------|
| **User Model** | id, email, username, hashed_password, is_active |
| **Password Hashing** | bcrypt via passlib (never store plain text) |
| **Validation** | Password strength, email format |

```python
# Quick reference
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)
```

### Day 94: JWT Authentication

| Concept | Key Points |
|---------|-----------|
| **JWT** | JSON Web Token for stateless auth |
| **Token Creation** | `jwt.encode(payload, SECRET_KEY, ALGORITHM)` |
| **Token Verification** | `jwt.decode(token, SECRET_KEY, ALGORITHM)` |
| **Expiration** | Set with `exp` claim |

```python
# Quick reference
def create_access_token(data: dict) -> str:
    expire = datetime.utcnow() + timedelta(minutes=30)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, ALGORITHM)

def verify_token(token: str) -> dict:
    return jwt.decode(token, SECRET_KEY, [ALGORITHM])
```

### Day 95: Protected Routes & Current User

| Concept | Key Points |
|---------|-----------|
| **oauth2_scheme** | Extracts token from Authorization header |
| **get_current_user** | Validates token and returns user |
| **Depends()** | Injects authentication into routes |

```python
# Quick reference
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

### Day 96: User-Task Relationship

| Concept | Key Points |
|---------|-----------|
| **Foreign Key** | `user_id = Column(Integer, ForeignKey("users.id"))` |
| **Relationship** | `relationship("User", back_populates="tasks")` |
| **Cascade Delete** | `ondelete="CASCADE"` |
| **User-Specific Queries** | Filter tasks by `user_id` |

```python
# Quick reference
class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    user = relationship("User", back_populates="tasks")

@router.get("/tasks")
async def get_tasks(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Task).filter(Task.user_id == user.id).all()
```

### Day 97: Pydantic Schemas for Auth

| Concept | Key Points |
|---------|-----------|
| **EmailStr** | Automatic email validation |
| **field_validator** | Custom validation rules |
| **Response Models** | Exclude sensitive data |
| **Token Schemas** | access_token, token_type, expires_in |

```python
# Quick reference
class UserCreate(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3)
    password: str = Field(..., min_length=8)

    @field_validator('password')
    def validate_password(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Must contain uppercase')
        return v

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    created_at: datetime

    class Config:
        from_attributes = True
```

---

## 📝 Part 2: Practice Challenges

### Challenge #1: User Model with PostgreSQL

```python
# Solution
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

### Challenge #2: Password Hashing with bcrypt

```python
# Solution
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
```

### Challenge #3: JWT Token with 1-Hour Expiration

```python
# Solution
from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hour

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
```

### Challenge #4: Protected Route with get_current_user

```python
# Solution
from fastapi import Depends, APIRouter
from .auth import get_current_user
from .models import User

router = APIRouter()

@router.get("/protected")
async def protected_route(current_user: User = Depends(get_current_user)):
    return {
        "message": "Access granted",
        "user": current_user.username
    }
```

### Challenge #5: Tasks Query for Current User

```python
# Solution
@router.get("/tasks")
async def get_user_tasks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tasks = db.query(Task).filter(Task.user_id == current_user.id).all()
    return tasks
```

---

## 🏗️ Part 3: Capstone Project - Complete Auth System

### Project Structure

```
auth_api/
├── main.py
├── database.py
├── models.py          # User, Task
├── schemas.py         # Pydantic models
├── auth.py            # JWT, hashing, dependencies
├── routes/
│   ├── auth.py        # /auth endpoints
│   └── tasks.py       # /tasks endpoints
├── .env
└── requirements.txt
```

### Requirements

| Feature | Implementation |
|---------|----------------|
| User Model | PostgreSQL with SQLAlchemy |
| Password Security | bcrypt hashing with passlib |
| Authentication | JWT tokens with 30-minute expiry |
| Registration | POST /auth/register with validation |
| Login | POST /auth/login returns JWT |
| Protected Routes | Depends(get_current_user) |
| Task Management | CRUD with user ownership |
| Validation | Pydantic schemas with EmailStr |
| Error Handling | Proper HTTP status codes |

### Environment Variables

```bash
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/auth_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## 📊 Quick Reference

### Week 14 Summary Table

| Day | Topic | Key Concepts |
|-----|-------|--------------|
| 92 | PostgreSQL Setup | Connection strings, pooling, env vars |
| 93 | User Model & Hashing | SQLAlchemy models, bcrypt, passlib |
| 94 | JWT Authentication | jwt.encode, jwt.decode, expiration |
| 95 | Protected Routes | oauth2_scheme, get_current_user |
| 96 | User-Task Relationship | ForeignKey, relationship, cascade |
| 97 | Pydantic Schemas | EmailStr, field_validator, from_attributes |
| 98 | Review & Capstone | Complete auth system |

---

## ✅ Self-Assessment Checklist

| Concept | Understand? | Can implement? |
|---------|-------------|----------------|
| PostgreSQL connection with SQLAlchemy | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| User model with hashed passwords | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| bcrypt password hashing | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| JWT token creation and verification | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Protected routes with get_current_user | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| User-task relationship | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Pydantic schemas with validation | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| CRUD operations with user isolation | ☐ Yes / ☐ No | ☐ Yes / ☐ No |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `could not connect to server` | PostgreSQL not running | Start PostgreSQL service |
| `JWTError: Signature verification failed` | Wrong SECRET_KEY | Use consistent SECRET_KEY |
| `401 Unauthorized` | Invalid/expired token | Login again |
| `Task not found` | Task doesn't belong to user | Check user_id filter |
| `IntegrityError: foreign key` | Invalid user_id | Ensure user exists |

---

## ✅ Day 98 Checklist

- [ ] Review Days 92-97 daily logs and notes
- [ ] Complete Challenge #1 (User Model)
- [ ] Complete Challenge #2 (Password Hashing)
- [ ] Complete Challenge #3 (JWT Token)
- [ ] Complete Challenge #4 (Protected Route)
- [ ] Complete Challenge #5 (Tasks Query)
- [ ] Build Complete Auth System capstone
- [ ] Set up PostgreSQL database
- [ ] Test all endpoints with Postman
- [ ] Push code to GitHub
