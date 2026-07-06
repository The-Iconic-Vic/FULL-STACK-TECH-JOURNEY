# 📘 User-Task Relationship

## 🎯 Overview

Database relationships define how tables connect to each other. In a task management system, each task belongs to a user, and each user can have many tasks. This is a **one-to-many** relationship.

---

## 📝 Part 1: Database Relationships

### Relationship Types

| Type | Description | Example |
|------|-------------|---------|
| **One-to-One** | One record links to one record | User → Profile |
| **One-to-Many** | One record links to many records | User → Tasks |
| **Many-to-Many** | Many records link to many records | Students → Courses |

### SQLAlchemy Relationship Setup

```python
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    
    # One-to-Many relationship
    tasks = relationship(
        "Task",
        back_populates="user",
        cascade="all, delete-orphan",
        lazy="dynamic"
    )


class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    # Many-to-One relationship
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
@router.post("/tasks/", status_code=201)
async def create_task(
    task_data: schemas.TaskCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_task = models.Task(
        title=task_data.title,
        user_id=current_user.id  # Link to current user
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task
```

### Querying User's Tasks

```python
# Using filter
@router.get("/tasks/")
async def get_tasks(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Task).filter(Task.user_id == current_user.id).all()

# Using relationship
@router.get("/tasks-relationship/")
async def get_tasks_relationship(
    current_user: models.User = Depends(get_current_user)
):
    return current_user.tasks.all()
```

### Ownership Checks

```python
@router.get("/tasks/{task_id}")
async def get_task(
    task_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user.id  # Ownership check
    ).first()
    
    if not task:
        raise HTTPException(404, "Task not found")
    return task
```

---

## 📊 Quick Reference

### Relationship Configuration

| Element | Syntax | Purpose |
|---------|--------|---------|
| Foreign Key | `Column(Integer, ForeignKey("users.id"))` | Link to parent table |
| Relationship | `relationship("Model", back_populates="name")` | Bidirectional navigation |
| Cascade Delete | `ForeignKey("users.id", ondelete="CASCADE")` | Delete children when parent deleted |

### User-Specific Query Patterns

| Pattern | Example | Purpose |
|---------|---------|---------|
| Filter by user_id | `filter(Task.user_id == user.id)` | Get user's tasks |
| Ownership check | `filter(Task.id == id, Task.user_id == user.id)` | Verify ownership |
| Use relationship | `user.tasks` | Access tasks via relationship |

### Common Query Scenarios

```python
# Get all user tasks
tasks = db.query(Task).filter(Task.user_id == current_user.id).all()

# Get task by ID with ownership check
task = db.query(Task).filter(
    Task.id == task_id,
    Task.user_id == current_user.id
).first()

# Get tasks with pagination
tasks = db.query(Task).filter(Task.user_id == current_user.id)\
    .offset(skip).limit(limit).all()
```

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `NoForeignKeysError` | Missing ForeignKey | Add `ForeignKey` to model |
| `IntegrityError: foreign key constraint failed` | Invalid user_id | Ensure user exists |
| Tasks not being deleted with user | Missing cascade | Add `cascade` to relationship |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Foreign key links tables** | `user_id` references `users.id` |
| **relationship() enables navigation** | Access tasks from user and vice versa |
| **Always filter by user_id** | Prevent data leakage |
| **Cascade delete removes children** | Tasks deleted when user is deleted |
| **Ownership checks are essential** | Users can only access their own tasks |

