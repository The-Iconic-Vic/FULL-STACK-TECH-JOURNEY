# 📅 Day 96: User-Task Relationship

**Date:** July 3, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** SQLAlchemy Relationships, Foreign Keys, One-to-Many, Cascade Delete, User-Specific Queries

---

## 📋 Learning Objectives

- ✅ Create foreign key relationships in SQLAlchemy
- ✅ Use `relationship()` for bidirectional navigation
- ✅ Implement cascade delete behavior
- ✅ Filter tasks by current user
- ✅ Ensure ownership checks on updates/deletes
- ✅ Prevent users from accessing others' tasks

---

## 🎯 Part 1: Database Relationships

### Why Relationships?

Database relationships define how tables connect to each other. In a task management system, each task belongs to a user, and each user can have many tasks. This is a **one-to-many** relationship.

### Relationship Types

| Type | Description | Example |
|------|-------------|---------|
| **One-to-One** | One record links to one record | User → Profile |
| **One-to-Many** | One record links to many records | User → Tasks |
| **Many-to-Many** | Many records link to many records | Students → Courses |

### SQLAlchemy Relationship Setup

```python
# models.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # One-to-Many relationship with Task
    tasks = relationship(
        "Task",
        back_populates="user",
        cascade="all, delete-orphan",
        lazy="dynamic"
    )


class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False, index=True)
    description = Column(String(500), nullable=True)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Foreign key to User
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Many-to-One relationship with User
    user = relationship("User", back_populates="tasks")
```

### Foreign Key Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `ForeignKey("table.column")` | Reference to another table | `ForeignKey("users.id")` |
| `ondelete="CASCADE"` | Delete tasks when user is deleted | `ondelete="CASCADE"` |
| `nullable=False` | Field cannot be null | `nullable=False` |

### Relationship Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `back_populates` | Bidirectional reference | `back_populates="user"` |
| `cascade` | Cascade operations | `cascade="all, delete-orphan"` |
| `lazy` | Loading strategy | `lazy="dynamic"` |

### Cascade Options

| Option | Effect |
|--------|--------|
| `save-update` | Save/update related objects |
| `delete` | Delete related objects on delete |
| `delete-orphan` | Delete objects removed from relationship |
| `all` | All cascade options |

---

## 🔧 Part 2: User-Specific Queries

### Creating Task with User

```python
@router.post("/tasks/", response_model=schemas.TaskResponse, status_code=201)
async def create_task(
    task_data: schemas.TaskCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Create a task for the current user."""
    db_task = models.Task(
        title=task_data.title,
        description=task_data.description,
        user_id=current_user.id  # Link to current user
    )
    
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task
```

### Querying User's Tasks

```python
@router.get("/tasks/", response_model=list[schemas.TaskResponse])
async def get_tasks(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Get all tasks for the current user."""
    # Filter by user_id
    tasks = db.query(models.Task).filter(
        models.Task.user_id == current_user.id
    ).all()
    return tasks

# Using relationship (alternative)
@router.get("/tasks-relationship/")
async def get_tasks_relationship(
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get tasks using relationship."""
    # Access tasks through relationship
    return current_user.tasks
```

### Ownership Checks

```python
@router.get("/tasks/{task_id}", response_model=schemas.TaskResponse)
async def get_task(
    task_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific task (with ownership check)."""
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id  # Ownership check
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    return task
```

---

## 🏗️ Part 3: Complete Task CRUD with Ownership

```python
# routers/tasks.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_data: schemas.TaskCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new task for the current user."""
    db_task = models.Task(
        title=task_data.title,
        description=task_data.description,
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
    """Get all tasks for the current user with pagination and filtering."""
    query = db.query(models.Task).filter(models.Task.user_id == current_user.id)
    
    if completed is not None:
        query = query.filter(models.Task.completed == completed)
    
    return query.offset(skip).limit(limit).all()


@router.get("/{task_id}", response_model=schemas.TaskResponse)
async def get_task(
    task_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific task by ID (with ownership check)."""
    task = _get_user_task(db, task_id, current_user.id)
    return task


@router.put("/{task_id}", response_model=schemas.TaskResponse)
async def update_task(
    task_id: int,
    task_update: schemas.TaskUpdate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Update a task (with ownership check)."""
    task = _get_user_task(db, task_id, current_user.id)
    
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
    """Toggle task completion status (with ownership check)."""
    task = _get_user_task(db, task_id, current_user.id)
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
    """Delete a task (with ownership check)."""
    task = _get_user_task(db, task_id, current_user.id)
    db.delete(task)
    db.commit()
    return


# Helper function
def _get_user_task(db: Session, task_id: int, user_id: int) -> models.Task:
    """Get task by ID and verify ownership."""
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == user_id
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    return task
```

---

## 📝 Part 4: Pydantic Schemas with Relationships

```python
# schemas.py
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional, List


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
# User Schemas (with nested tasks)
# ============================================

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class UserWithTasksResponse(UserResponse):
    tasks: List[TaskResponse] = []


# ============================================
# Token Schemas
# ============================================

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
```

---

## 📊 Quick Reference

### Relationship Configuration

| Element | Syntax | Purpose |
|---------|--------|---------|
| Foreign Key | `Column(Integer, ForeignKey("users.id"))` | Link to parent table |
| Relationship | `relationship("Model", back_populates="name")` | Bidirectional navigation |
| Cascade Delete | `ForeignKey("users.id", ondelete="CASCADE")` | Delete children when parent deleted |
| Cascade Options | `cascade="all, delete-orphan"` | Delete orphans automatically |

### User-Specific Query Patterns

| Pattern | Example | Purpose |
|---------|---------|---------|
| Filter by user_id | `filter(Task.user_id == user.id)` | Get user's tasks |
| Ownership check | `filter(Task.id == id, Task.user_id == user.id)` | Verify ownership |
| Use relationship | `user.tasks` | Access tasks via relationship |
| Create with user | `Task(user_id=user.id)` | Link task to user |

### Common Query Scenarios

```python
# 1. Get all user tasks
tasks = db.query(Task).filter(Task.user_id == current_user.id).all()

# 2. Get task by ID with ownership check
task = db.query(Task).filter(
    Task.id == task_id,
    Task.user_id == current_user.id
).first()

# 3. Get tasks with pagination
tasks = db.query(Task).filter(Task.user_id == current_user.id)\
    .offset(skip).limit(limit).all()

# 4. Get tasks by completion status
tasks = db.query(Task).filter(
    Task.user_id == current_user.id,
    Task.completed == completed
).all()
```

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `sqlalchemy.exc.NoForeignKeysError` | Missing ForeignKey | Add `ForeignKey` to model |
| `IntegrityError: foreign key constraint failed` | Invalid user_id | Ensure user exists |
| Tasks not being deleted with user | Missing cascade | Add `cascade` to relationship |
| `AttributeError: 'User' object has no attribute 'tasks'` | Missing relationship | Add `relationship()` to model |

---

## ✅ Day 96 Checklist

- [ ] Add ForeignKey to Task model
- [ ] Add relationship to User model
- [ ] Configure cascade delete
- [ ] Create task with user_id
- [ ] Filter tasks by current user
- [ ] Add ownership checks to GET, PUT, DELETE
- [ ] Test user isolation (can't access others' tasks)
- [ ] Test cascade delete
- [ ] Add pagination to task list
- [ ] Push code to GitHub

