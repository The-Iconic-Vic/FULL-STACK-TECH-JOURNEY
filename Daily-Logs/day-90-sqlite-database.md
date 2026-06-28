# 📅 Day 90: Database Integration (SQLite)

**Date:** June 27, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** SQLAlchemy, Database Models, CRUD Operations, Relationships, Migrations

---

## 📋 Learning Objectives

- ✅ Set up SQLAlchemy with SQLite
- ✅ Define database models with SQLAlchemy
- ✅ Create database tables automatically
- ✅ Implement CRUD operations
- ✅ Use dependency injection for database sessions
- ✅ Query data with filtering and ordering
- ✅ Handle relationships between models

---

## 🎯 Part 1: SQLAlchemy Setup

### What is SQLAlchemy?

SQLAlchemy is a Python SQL toolkit and Object-Relational Mapping (ORM) library. It provides a full suite of well-known enterprise-level persistence patterns.

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

# Database URL
DATABASE_URL = "sqlite:///./todo.db"

# Create engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # Required for SQLite
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class for models
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### Database Models

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

### Creating Tables

```python
# main.py
from .database import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)
```

---

## 🔧 Part 2: CRUD Operations

### Create (POST)

```python
# crud.py
from sqlalchemy.orm import Session
from . import models, schemas

def create_todo(db: Session, todo: schemas.TodoCreate):
    db_todo = models.Todo(
        title=todo.title,
        description=todo.description
    )
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo
```

### Read (GET)

```python
# Get all todos
def get_todos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Todo).offset(skip).limit(limit).all()

# Get single todo
def get_todo(db: Session, todo_id: int):
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()

# Filter by completed status
def get_todos_by_status(db: Session, completed: bool):
    return db.query(models.Todo).filter(models.Todo.completed == completed).all()

# Get todos with search
def search_todos(db: Session, query: str):
    return db.query(models.Todo).filter(
        models.Todo.title.contains(query) | models.Todo.description.contains(query)
    ).all()
```

### Update (PUT/PATCH)

```python
def update_todo(db: Session, todo_id: int, todo_update: schemas.TodoUpdate):
    db_todo = get_todo(db, todo_id)
    if not db_todo:
        return None
    
    update_data = todo_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_todo, key, value)
    
    db.commit()
    db.refresh(db_todo)
    return db_todo

def toggle_complete(db: Session, todo_id: int):
    db_todo = get_todo(db, todo_id)
    if not db_todo:
        return None
    
    db_todo.completed = not db_todo.completed
    db.commit()
    db.refresh(db_todo)
    return db_todo
```

### Delete

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

## 📊 Part 3: Pydantic Schemas

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
        from_attributes = True

class TodoListResponse(BaseModel):
    total: int
    skip: int
    limit: int
    todos: list[TodoResponse]
```

---

## 🏗️ Part 4: Complete Implementation

### File: `app/database.py`

```python
"""
Database configuration and session management.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./todo.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Dependency for database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### File: `app/models.py`

```python
"""
SQLAlchemy database models.
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func
from .database import Base


class Todo(Base):
    """Todo model."""
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

### File: `app/schemas.py`

```python
"""
Pydantic models for request/response validation.
"""

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class TodoBase(BaseModel):
    """Base todo schema."""
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)


class TodoCreate(TodoBase):
    """Schema for creating a todo."""
    pass


class TodoUpdate(BaseModel):
    """Schema for updating a todo."""
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    completed: Optional[bool] = None


class TodoResponse(TodoBase):
    """Schema for todo response."""
    id: int
    completed: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TodoListResponse(BaseModel):
    """Schema for listing todos with pagination."""
    total: int
    skip: int
    limit: int
    todos: list[TodoResponse]
```

### File: `app/crud.py`

```python
"""
CRUD operations for the database.
"""

from sqlalchemy.orm import Session
from . import models, schemas


def create_todo(db: Session, todo: schemas.TodoCreate):
    """Create a new todo."""
    db_todo = models.Todo(
        title=todo.title,
        description=todo.description
    )
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def get_todos(db: Session, skip: int = 0, limit: int = 100):
    """Get all todos with pagination."""
    return db.query(models.Todo).offset(skip).limit(limit).all()


def get_todo(db: Session, todo_id: int):
    """Get a single todo by ID."""
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()


def update_todo(db: Session, todo_id: int, todo_update: schemas.TodoUpdate):
    """Update a todo."""
    db_todo = get_todo(db, todo_id)
    if not db_todo:
        return None
    
    update_data = todo_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_todo, key, value)
    
    db.commit()
    db.refresh(db_todo)
    return db_todo


def toggle_complete(db: Session, todo_id: int):
    """Toggle todo completion status."""
    db_todo = get_todo(db, todo_id)
    if not db_todo:
        return None
    
    db_todo.completed = not db_todo.completed
    db.commit()
    db.refresh(db_todo)
    return db_todo


def delete_todo(db: Session, todo_id: int):
    """Delete a todo."""
    db_todo = get_todo(db, todo_id)
    if not db_todo:
        return None
    
    db.delete(db_todo)
    db.commit()
    return db_todo


def search_todos(db: Session, query: str):
    """Search todos by title or description."""
    return db.query(models.Todo).filter(
        models.Todo.title.contains(query) |
        models.Todo.description.contains(query)
    ).all()


def get_todos_by_status(db: Session, completed: bool):
    """Get todos by completion status."""
    return db.query(models.Todo).filter(models.Todo.completed == completed).all()
```

### File: `app/routers/todos.py`

```python
"""
Todo API endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional
from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/todos", tags=["todos"])


@router.post("/", response_model=schemas.TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    """Create a new todo."""
    return crud.create_todo(db, todo)


@router.get("/", response_model=schemas.TodoListResponse)
async def list_todos(
    skip: int = Query(0, ge=0, description="Number of todos to skip"),
    limit: int = Query(10, ge=1, le=100, description="Number of todos to return"),
    completed: Optional[bool] = Query(None, description="Filter by completion status"),
    search: Optional[str] = Query(None, min_length=1, description="Search query"),
    db: Session = Depends(get_db)
):
    """List all todos with pagination, filtering, and search."""
    if search:
        todos = crud.search_todos(db, search)
    elif completed is not None:
        todos = crud.get_todos_by_status(db, completed)
    else:
        todos = crud.get_todos(db, skip=skip, limit=limit)
    
    # Apply pagination after filtering
    if search or completed is not None:
        total = len(todos)
        todos = todos[skip:skip + limit]
    else:
        total = len(crud.get_todos(db))
    
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "todos": todos
    }


@router.get("/{todo_id}", response_model=schemas.TodoResponse)
async def get_todo(todo_id: int, db: Session = Depends(get_db)):
    """Get a single todo by ID."""
    todo = crud.get_todo(db, todo_id)
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with ID {todo_id} not found"
        )
    return todo


@router.put("/{todo_id}", response_model=schemas.TodoResponse)
async def update_todo(
    todo_id: int,
    todo_update: schemas.TodoUpdate,
    db: Session = Depends(get_db)
):
    """Update a todo."""
    updated = crud.update_todo(db, todo_id, todo_update)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with ID {todo_id} not found"
        )
    return updated


@router.patch("/{todo_id}/complete", response_model=schemas.TodoResponse)
async def toggle_complete(todo_id: int, db: Session = Depends(get_db)):
    """Toggle todo completion status."""
    updated = crud.toggle_complete(db, todo_id)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with ID {todo_id} not found"
        )
    return updated


@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    """Delete a todo."""
    deleted = crud.delete_todo(db, todo_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with ID {todo_id} not found"
        )
    return
```

### File: `app/main.py`

```python
"""
Todo API with SQLite Database
"""

from fastapi import FastAPI
from .database import engine, Base
from .routers import todos

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Todo API with SQLite",
    description="A complete todo API with SQLite database",
    version="1.0.0"
)

# Include routers
app.include_router(todos.router)

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "SQLite",
        "tables": ["todos"]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
```

### Requirements

```txt
# requirements.txt
fastapi==0.110.0
uvicorn==0.29.0
sqlalchemy==2.0.28
python-multipart==0.0.9
```

---

## 📊 Quick Reference

### SQLAlchemy Common Types

| Type | SQLAlchemy | Python |
|------|------------|--------|
| Integer | `Column(Integer)` | `int` |
| String | `Column(String(length))` | `str` |
| Text | `Column(Text)` | `str` |
| Boolean | `Column(Boolean)` | `bool` |
| DateTime | `Column(DateTime)` | `datetime` |

### Common Query Methods

| Method | Description |
|--------|-------------|
| `.query(Model)` | Start query |
| `.filter(condition)` | Filter results |
| `.filter_by(**kwargs)` | Filter by column |
| `.first()` | Get first result |
| `.all()` | Get all results |
| `.count()` | Count results |
| `.order_by()` | Sort results |
| `.offset(n)` | Skip n results |
| `.limit(n)` | Limit to n results |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `sqlite3.OperationalError: no such table` | Tables not created | Call `Base.metadata.create_all(engine)` |
| `sqlite3.OperationalError: database is locked` | Multiple connections | Use `check_same_thread=False` |
| `AttributeError: 'Session' object has no attribute` | Wrong session usage | Use correct session methods |
| `IntegrityError` | Duplicate or invalid data | Check constraints |

---

## ✅ Day 90 Checklist

- [ ] Install SQLAlchemy
- [ ] Configure database engine and session
- [ ] Define SQLAlchemy models
- [ ] Create database tables
- [ ] Implement CRUD operations
- [ ] Use dependency injection for DB session
- [ ] Create Pydantic schemas
- [ ] Build todo API endpoints
- [ ] Test all endpoints
- [ ] Query with filtering and pagination
- [ ] Push code to GitHub

