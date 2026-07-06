# 📅 Day 95: Protected Routes & Current User

**Date:** July 2, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** OAuth2 Scheme, get_current_user Dependency, Protected Routes, User-Specific Data, Task CRUD

---

## 📋 Learning Objectives

- ✅ Create oauth2_scheme for token extraction
- ✅ Build get_current_user dependency
- ✅ Protect routes with Depends(get_current_user)
- ✅ Retrieve current user information
- ✅ Create user-specific data (tasks)
- ✅ Implement full CRUD for user tasks

---

## 🎯 Part 1: OAuth2 Scheme & Token Extraction

### What is OAuth2PasswordBearer?

`OAuth2PasswordBearer` is a FastAPI class that handles token extraction from the `Authorization` header. It expects the token in the format: `Bearer <token>`

```python
from fastapi.security import OAuth2PasswordBearer

# Token URL is the login endpoint
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# In routes, extract token automatically
async def get_current_user(token: str = Depends(oauth2_scheme)):
    # token is automatically extracted from Authorization header
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload
```

### How Token Extraction Works

```
Request Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

oauth2_scheme extracts: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Complete get_current_user Implementation

```python
# auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session
from . import models, schemas
from .database import get_db
from .config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> models.User:
    """
    Get current user from JWT token.
    
    Args:
        token: JWT token from Authorization header
        db: Database session
    
    Returns:
        User object
    
    Raises:
        HTTPException: If token is invalid or user not found
    """
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        
        if username is None or user_id is None:
            raise credentials_exception
            
        token_data = schemas.TokenData(username=username, user_id=user_id)
        
    except JWTError:
        raise credentials_exception
    
    user = db.query(models.User).filter(
        models.User.id == token_data.user_id
    ).first()
    
    if user is None:
        raise credentials_exception
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated"
        )
    
    return user


async def get_current_active_user(
    current_user: models.User = Depends(get_current_user)
) -> models.User:
    """Get current active user (same as get_current_user)."""
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated"
        )
    return current_user
```

---

## 🛡️ Part 2: Protecting Routes

### Simple Protected Route

```python
from fastapi import Depends
from .auth import get_current_user
from .models import User

@router.get("/users/me")
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Get current user profile."""
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "created_at": current_user.created_at
    }
```

### Protecting with Active User Check

```python
@router.get("/protected")
async def protected_route(
    current_user: User = Depends(get_current_active_user)
):
    """Protected route requiring active user."""
    return {"message": "You are authenticated!", "user": current_user.username}
```

### Multiple Dependency Levels

```python
# Two-level dependency
@router.get("/secure")
async def secure_route(
    token_valid: dict = Depends(verify_token),
    user: User = Depends(get_current_user)
):
    return {"user": user.username}
```

---

## 🏗️ Part 3: User-Specific Task CRUD

### Task Model

```python
# models.py
class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    completed = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationship to User
    owner = relationship("User", back_populates="tasks")


# Add to User model
class User(Base):
    # ... existing fields
    tasks = relationship("Task", back_populates="owner")
```

### Task Schemas

```python
# schemas.py
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
```

### Task CRUD Operations

```python
# routers/tasks.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task: schemas.TaskCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new task for the current user."""
    db_task = models.Task(
        title=task.title,
        description=task.description,
        user_id=current_user.id
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@router.get("/", response_model=list[schemas.TaskResponse])
async def get_tasks(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    completed: Optional[bool] = Query(None),
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Get all tasks for the current user."""
    query = db.query(models.Task).filter(models.Task.user_id == current_user.id)
    
    if completed is not None:
        query = query.filter(models.Task.completed == completed)
    
    tasks = query.offset(skip).limit(limit).all()
    return tasks


@router.get("/{task_id}", response_model=schemas.TaskResponse)
async def get_task(
    task_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific task by ID."""
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    return task


@router.put("/{task_id}", response_model=schemas.TaskResponse)
async def update_task(
    task_id: int,
    task_update: schemas.TaskUpdate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Update a task."""
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    update_data = task_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(task, key, value)
    
    db.commit()
    db.refresh(task)
    return task


@router.patch("/{task_id}/complete", response_model=schemas.TaskResponse)
async def toggle_complete(
    task_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Toggle task completion status."""
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    task.completed = not task.completed
    db.commit()
    db.refresh(task)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a task."""
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    db.delete(task)
    db.commit()
    return
```

---

## 🏗️ Part 4: Complete Implementation

### File: `app/auth.py`

```python
"""
Authentication and authorization utilities.
"""

from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from . import models, schemas
from .database import get_db
from .config import settings

# Password context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Credentials exception
credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def hash_password(password: str) -> str:
    """Hash a plain text password."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hash."""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> models.User:
    """
    Get current user from JWT token.
    
    This dependency extracts the JWT from the Authorization header,
    validates it, and returns the corresponding user from the database.
    
    Returns:
        User object
    
    Raises:
        HTTPException: If authentication fails
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        
        if username is None or user_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()
    
    if user is None:
        raise credentials_exception
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated"
        )
    
    return user


async def get_current_active_user(
    current_user: models.User = Depends(get_current_user)
) -> models.User:
    """Get current active user."""
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated"
        )
    return current_user
```

### File: `app/routers/users.py`

```python
"""
User management endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=schemas.UserResponse)
async def get_current_user(
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get current user profile."""
    return current_user


@router.put("/me", response_model=schemas.UserResponse)
async def update_current_user(
    user_update: schemas.UserUpdate,
    current_user: models.User = Depends(auth.get_current_user),
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
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Soft delete current user account."""
    current_user.is_active = False
    db.commit()
    return
```

---

## 📊 Quick Reference

### Protecting Routes

| Method | Syntax | Purpose |
|--------|--------|---------|
| Basic | `Depends(get_current_user)` | Any authenticated user |
| Active Only | `Depends(get_current_active_user)` | Active user only |
| Admin Only | `Depends(get_current_admin_user)` | Admin role only |

### Common Dependency Patterns

```python
# 1. Simple authentication
@router.get("/protected")
async def route(user: User = Depends(get_current_user)):
    return {"user": user.username}

# 2. Authentication + Database session
@router.get("/tasks")
async def get_tasks(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Task).filter(Task.user_id == user.id).all()

# 3. Nested dependencies
@router.get("/secure")
async def secure_route(
    token: dict = Depends(verify_token),
    user: User = Depends(get_current_user)
):
    return user
```

### Error Responses

| Status | Message |
|--------|---------|
| 401 | Could not validate credentials |
| 403 | Account is deactivated |
| 404 | Task not found |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Could not validate credentials` | Invalid/expired token | Login again |
| `Account is deactivated` | User account disabled | Contact admin |
| `Task not found` | Task doesn't exist or belongs to other user | Check user_id filter |
| `Missing Bearer token` | No Authorization header | Include `Bearer <token>` |

---

## ✅ Day 95 Checklist

- [ ] Create oauth2_scheme
- [ ] Implement get_current_user dependency
- [ ] Add credential exception handling
- [ ] Protect routes with Depends(get_current_user)
- [ ] Implement user-specific task CRUD
- [ ] Add filtering by completion status
- [ ] Add pagination to list endpoint
- [ ] Test protected routes with valid/invalid tokens
- [ ] Test user isolation (can't see others' tasks)
- [ ] Push code to GitHub

