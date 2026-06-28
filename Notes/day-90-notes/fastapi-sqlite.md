# 📘 FastAPI Database Integration with SQLite & SQLAlchemy

## 🎯 Overview

SQLAlchemy is a powerful SQL toolkit and Object-Relational Mapping (ORM) library for Python. When combined with FastAPI, it provides a robust way to interact with databases using Python objects instead of raw SQL queries.

---

## 📦 Part 1: SQLAlchemy Setup

### Installation

```bash
pip install sqlalchemy
```

### Database Configuration

```python
# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLite database URL
DATABASE_URL = "sqlite:///./todo.db"

# Create engine (connection to database)
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # Required for SQLite
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

## 📝 Part 2: Database Models

### Defining Models

```python
# models.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func
from .database import Base

class Todo(Base):
    __tablename__ = "todos"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

### Common Column Types

| SQLAlchemy Type | Python Type | Description |
|-----------------|-------------|-------------|
| `Integer` | `int` | Integer values |
| `String(length)` | `str` | Variable-length string |
| `Text` | `str` | Long text (no length limit) |
| `Boolean` | `bool` | True/False values |
| `DateTime` | `datetime` | Date and time |
| `Float` | `float` | Decimal numbers |
| `JSON` | `dict` | JSON data |

### Column Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `primary_key` | Primary key | `primary_key=True` |
| `index` | Create index for faster queries | `index=True` |
| `nullable` | Allow null values | `nullable=False` |
| `default` | Default value | `default=False` |
| `unique` | Unique constraint | `unique=True` |

### Creating Tables

```python
# main.py
from .database import engine, Base

# Create all tables
Base.metadata.create_all(bind=engine)
```

---

## 🔧 Part 3: CRUD Operations

### Create (INSERT)

```python
def create_todo(db: Session, todo: schemas.TodoCreate):
    # Create model instance
    db_todo = models.Todo(
        title=todo.title,
        description=todo.description
    )
    # Add to session
    db.add(db_todo)
    # Commit to database
    db.commit()
    # Refresh instance with generated values (id, timestamps)
    db.refresh(db_todo)
    return db_todo
```

### Read (SELECT)

```python
# Get all records
def get_todos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Todo).offset(skip).limit(limit).all()

# Get single record
def get_todo(db: Session, todo_id: int):
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()

# Filter by condition
def get_todos_by_status(db: Session, completed: bool):
    return db.query(models.Todo).filter(models.Todo.completed == completed).all()

# Search with contains
def search_todos(db: Session, query: str):
    return db.query(models.Todo).filter(
        models.Todo.title.contains(query) | models.Todo.description.contains(query)
    ).all()

# Order by
def get_todos_sorted(db: Session, order_by: str = "created_at", desc: bool = False):
    if desc:
        return db.query(models.Todo).order_by(getattr(models.Todo, order_by).desc()).all()
    return db.query(models.Todo).order_by(getattr(models.Todo, order_by)).all()
```

### Update (UPDATE)

```python
def update_todo(db: Session, todo_id: int, todo_update: schemas.TodoUpdate):
    db_todo = get_todo(db, todo_id)
    if not db_todo:
        return None
    
    # Update only provided fields
    update_data = todo_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_todo, key, value)
    
    db.commit()
    db.refresh(db_todo)
    return db_todo
```

### Delete (DELETE)

```python
def delete_todo(db: Session, todo_id: int):
    db_todo = get_todo(db, todo_id)
    if not db_todo:
        return None
    
    db.delete(db_todo)
    db.commit()
    return db_todo
```

---

## 📊 Part 4: Pydantic Schemas

```python
# schemas.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class TodoResponse(TodoBase):
    id: int
    completed: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True  # For Pydantic v2
```

---

## 🔗 Part 5: Relationships

### One-to-Many Relationship

```python
# models.py
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    
    # Relationship to todos
    todos = relationship("Todo", back_populates="owner")

class Todo(Base):
    __tablename__ = "todos"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # Relationship to user
    owner = relationship("User", back_populates="todos")
```

### Many-to-Many Relationship

```python
# Association table
association_table = Table(
    "association",
    Base.metadata,
    Column("todo_id", Integer, ForeignKey("todos.id")),
    Column("tag_id", Integer, ForeignKey("tags.id"))
)

class Tag(Base):
    __tablename__ = "tags"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True)
    
    todos = relationship("Todo", secondary=association_table, back_populates="tags")

class Todo(Base):
    # ... existing fields
    tags = relationship("Tag", secondary=association_table, back_populates="todos")
```

---

## 📊 Quick Reference

### Session Methods

| Method | Description |
|--------|-------------|
| `db.add(instance)` | Add instance to session |
| `db.commit()` | Commit changes to database |
| `db.refresh(instance)` | Refresh instance from database |
| `db.delete(instance)` | Delete instance |
| `db.rollback()` | Rollback changes |

### Query Methods

| Method | Description |
|--------|-------------|
| `.query(Model)` | Start query |
| `.filter(condition)` | Filter results |
| `.first()` | Get first result (or None) |
| `.all()` | Get all results |
| `.count()` | Count results |
| `.order_by(column)` | Sort results |
| `.offset(n)` | Skip n results |
| `.limit(n)` | Limit to n results |

### Common Filters

| Operation | Syntax |
|-----------|--------|
| Equality | `Model.column == value` |
| Inequality | `Model.column != value` |
| Greater than | `Model.column > value` |
| Less than | `Model.column < value` |
| Contains | `Model.column.contains(value)` |
| Starts with | `Model.column.startswith(value)` |
| In list | `Model.column.in_([1, 2, 3])` |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| No such table | Tables not created | Call `Base.metadata.create_all()` |
| Database locked | Multiple connections | Use `check_same_thread=False` |
| Session error | Session not closed | Use `get_db()` dependency |
| IntegrityError | Duplicate data | Check unique constraints |
| Relationship error | Missing back_populates | Use `back_populates` or `backref` |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **SQLAlchemy = ORM** | Object-Relational Mapping |
| **Models define tables** | Python classes = database tables |
| **Session manages transactions** | Add, commit, refresh, delete |
| **Query builds SQL** | Python syntax generates SQL |
| **Dependency injection for DB** | `get_db()` yields session |
| **Relationships connect tables** | One-to-many, many-to-many |

