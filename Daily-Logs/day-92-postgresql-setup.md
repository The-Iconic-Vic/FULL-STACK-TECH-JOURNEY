# 📅 Day 92: PostgreSQL Setup & SQLAlchemy

**Date:** June 29, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** PostgreSQL Installation, Database Setup, SQLAlchemy with PostgreSQL, Connection Pooling, Environment Variables

---

## 📋 Learning Objectives

- ✅ Install PostgreSQL locally
- ✅ Create a database and user
- ✅ Understand PostgreSQL connection strings
- ✅ Configure SQLAlchemy for PostgreSQL
- ✅ Use environment variables for configuration
- ✅ Understand connection pooling

---

## 🎯 Part 1: PostgreSQL Setup

### What is PostgreSQL?

PostgreSQL is a powerful, open-source relational database system. It's known for reliability, feature robustness, and performance.

### PostgreSQL vs SQLite

| Feature | PostgreSQL | SQLite |
|---------|------------|--------|
| **Type** | Client-server | Embedded |
| **Concurrency** | High (multiple connections) | Limited (single writer) |
| **Scalability** | Excellent | Limited |
| **Features** | Full-featured | Lightweight |
| **Configuration** | Complex | Simple |
| **Use Case** | Production apps | Development/testing |

### Installing PostgreSQL

**Windows:**
1. Download installer from [postgresql.org](https://postgresql.org/download/)
2. Run installer, remember the password set for `postgres` user
3. Default port: 5432

**macOS:**
```bash
# Using Homebrew
brew install postgresql@16

# Start PostgreSQL
brew services start postgresql@16
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Creating Database and User

```bash
# Connect to PostgreSQL as postgres user
sudo -u postgres psql

# Or on Windows/macOS:
psql -U postgres

# In the psql shell:
CREATE USER fastapi_user WITH PASSWORD 'secure_password';
CREATE DATABASE fastapi_db OWNER fastapi_user;
GRANT ALL PRIVILEGES ON DATABASE fastapi_db TO fastapi_user;

# Verify
\l  # List databases
\du # List users

# Exit
\q
```

### Connection String Format

```bash
# Local PostgreSQL
postgresql://username:password@localhost:5432/database_name

# Example
postgresql://fastapi_user:secure_password@localhost:5432/fastapi_db

# With SSL
postgresql://user:pass@host:port/db?sslmode=require
```

---

## 🔧 Part 2: SQLAlchemy with PostgreSQL

### Installation

```bash
# Install PostgreSQL driver
pip install psycopg2-binary

# For async support (optional for later)
pip install asyncpg
```

### Database Configuration

```python
# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool

# PostgreSQL connection string
DATABASE_URL = "postgresql://fastapi_user:secure_password@localhost:5432/fastapi_db"

# Create engine with connection pooling
engine = create_engine(
    DATABASE_URL,
    pool_size=5,           # Number of connections in pool
    max_overflow=10,       # Additional connections when pool is full
    pool_timeout=30,       # Seconds to wait for connection
    pool_recycle=1800,     # Recycle connections after 30 minutes
    pool_pre_ping=True,    # Verify connection before using
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class
Base = declarative_base()


def get_db():
    """Dependency for database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

## 🔐 Part 3: Environment Variables

### Using .env Files

```bash
# .env (gitignored)
DATABASE_URL=postgresql://fastapi_user:secure_password@localhost:5432/fastapi_db
SECRET_KEY=your-secret-key-here
DEBUG=True
```

```bash
# .env.example (committed to git)
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
SECRET_KEY=your-secret-key-here
DEBUG=False
```

### Config Module

```python
# config.py
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file


class Settings:
    """Application settings."""
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://user:pass@localhost:5432/db"
    )
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key")
    
    # Environment
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    @property
    def is_production(self) -> bool:
        return not self.DEBUG


settings = Settings()
```

### .gitignore Entries

```gitignore
# Environment variables
.env
.env.local
.env.production

# Database files
*.db
*.sqlite3

# PostgreSQL local files
pgdata/
```

---

## 🏗️ Part 4: Complete Implementation

### File: `app/config.py`

```python
"""
Configuration management with environment variables.
"""

import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Application settings."""

    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://user:password@localhost:5432/fastapi_db"
    )

    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"

    # Database Pool Settings
    POOL_SIZE: int = int(os.getenv("POOL_SIZE", "5"))
    MAX_OVERFLOW: int = int(os.getenv("MAX_OVERFLOW", "10"))
    POOL_TIMEOUT: int = int(os.getenv("POOL_TIMEOUT", "30"))
    POOL_RECYCLE: int = int(os.getenv("POOL_RECYCLE", "1800"))


settings = Settings()
```

### File: `app/database.py`

```python
"""
PostgreSQL database connection with SQLAlchemy.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool
from .config import settings

# Create engine with connection pooling
engine = create_engine(
    settings.DATABASE_URL,
    poolclass=QueuePool,
    pool_size=settings.POOL_SIZE,
    max_overflow=settings.MAX_OVERFLOW,
    pool_timeout=settings.POOL_TIMEOUT,
    pool_recycle=settings.POOL_RECYCLE,
    pool_pre_ping=True,
    echo=settings.DEBUG,  # Log SQL queries in debug mode
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
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


class User(Base):
    """User model."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<User {self.username}>"


class Item(Base):
    """Item model."""
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    price = Column(Integer, nullable=False)
    is_available = Column(Boolean, default=True)
    user_id = Column(Integer, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Item {self.title}>"
```

### File: `app/schemas.py`

```python
"""
Pydantic schemas for validation.
"""

from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
from datetime import datetime


# ============================================
# User Schemas
# ============================================

class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr

    @field_validator('username')
    def validate_username(cls, v):
        if not v.isalnum():
            raise ValueError('Username must be alphanumeric')
        return v


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

    @field_validator('password')
    def validate_password(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain an uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain a lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain a number')
        return v


class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=8)


class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============================================
# Item Schemas
# ============================================

class ItemBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    price: float = Field(..., gt=0)


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    price: Optional[float] = Field(None, gt=0)
    is_available: Optional[bool] = None


class ItemResponse(ItemBase):
    id: int
    is_available: bool
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
```

### File: `app/main.py`

```python
"""
FastAPI application with PostgreSQL database.
"""

from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from . import models, schemas, database
from .config import settings

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="PostgreSQL FastAPI API",
    description="API with PostgreSQL database connection",
    version="1.0.0",
    debug=settings.DEBUG
)


# ============================================
# Health Check
# ============================================

@app.get("/health")
async def health_check(db: Session = Depends(database.get_db)):
    """Health check endpoint."""
    try:
        # Test database connection
        db.execute("SELECT 1")
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"

    return {
        "status": "healthy",
        "database": {
            "status": db_status,
            "type": "PostgreSQL",
            "url": settings.DATABASE_URL.replace(
                settings.DATABASE_URL.split("@")[0].split(":")[-1],
                "***"
            ) if "@" in settings.DATABASE_URL else settings.DATABASE_URL
        },
        "debug": settings.DEBUG
    }


# ============================================
# User Endpoints
# ============================================

@app.post("/users/", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    """Create a new user."""
    # Check if username exists
    existing_user = db.query(models.User).filter(models.User.username == user.username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already exists"
        )

    # Check if email exists
    existing_email = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    # Hash password (simplified for demo)
    hashed_password = f"hashed_{user.password}"

    # Create user
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


@app.get("/users/", response_model=list[schemas.UserResponse])
async def get_users(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(database.get_db)
):
    """Get all users."""
    return db.query(models.User).offset(skip).limit(limit).all()


@app.get("/users/{user_id}", response_model=schemas.UserResponse)
async def get_user(
    user_id: int,
    db: Session = Depends(database.get_db)
):
    """Get a user by ID."""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


# ============================================
# Item Endpoints
# ============================================

@app.post("/items/", response_model=schemas.ItemResponse, status_code=status.HTTP_201_CREATED)
async def create_item(
    item: schemas.ItemCreate,
    user_id: int,
    db: Session = Depends(database.get_db)
):
    """Create a new item."""
    # Check if user exists
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    db_item = models.Item(
        title=item.title,
        description=item.description,
        price=item.price,
        user_id=user_id
    )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    return db_item


@app.get("/items/", response_model=list[schemas.ItemResponse])
async def get_items(
    skip: int = 0,
    limit: int = 10,
    user_id: Optional[int] = None,
    db: Session = Depends(database.get_db)
):
    """Get all items, optionally filtered by user."""
    query = db.query(models.Item)

    if user_id:
        query = query.filter(models.Item.user_id == user_id)

    return query.offset(skip).limit(limit).all()


@app.get("/items/{item_id}", response_model=schemas.ItemResponse)
async def get_item(
    item_id: int,
    db: Session = Depends(database.get_db)
):
    """Get an item by ID."""
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    return item


# ============================================
# Root Endpoint
# ============================================

@app.get("/")
async def root():
    """Welcome endpoint."""
    return {
        "message": "Welcome to the PostgreSQL FastAPI API",
        "endpoints": {
            "/health": "Health check",
            "/users/": "User CRUD",
            "/items/": "Item CRUD",
            "/docs": "Interactive API documentation"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
```

### Requirements

```txt
# requirements.txt
fastapi==0.110.0
uvicorn==0.29.0
sqlalchemy==2.0.28
psycopg2-binary==2.9.9
python-dotenv==1.0.1
python-multipart==0.0.9
```

### .env Example

```bash
# .env.example
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
SECRET_KEY=your-secret-key-change-in-production
DEBUG=True
HOST=0.0.0.0
PORT=8000
POOL_SIZE=5
MAX_OVERFLOW=10
POOL_TIMEOUT=30
POOL_RECYCLE=1800
```

### .gitignore

```gitignore
# Environment variables
.env
.env.local
.env.production

# Python
__pycache__/
*.pyc
*.pyo
venv/
.venv/

# Database
*.db
*.sqlite3
pgdata/

# IDE
.vscode/
.idea/
*.iml

# OS
.DS_Store
Thumbs.db
```

---

## 📊 Quick Reference

### PostgreSQL Commands

| Command | Purpose |
|---------|---------|
| `psql -U postgres` | Connect as postgres user |
| `CREATE DATABASE name;` | Create new database |
| `CREATE USER user WITH PASSWORD 'pass';` | Create user |
| `GRANT ALL ON DATABASE db TO user;` | Grant privileges |
| `\l` | List databases |
| `\du` | List users |
| `\c database_name` | Connect to database |
| `\dt` | List tables |
| `\q` | Quit psql |

### Connection String Formats

| Database | Connection String |
|----------|-------------------|
| PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| PostgreSQL (SSL) | `postgresql://user:pass@localhost:5432/db?sslmode=require` |
| SQLite | `sqlite:///./database.db` |
| MySQL | `mysql+pymysql://user:pass@localhost:3306/db` |

### SQLAlchemy Engine Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `pool_size` | Number of connections in pool | 5 |
| `max_overflow` | Extra connections when pool is full | 10 |
| `pool_timeout` | Seconds to wait for connection | 30 |
| `pool_recycle` | Recycle connections after seconds | -1 |
| `pool_pre_ping` | Verify connection before using | False |
| `echo` | Log SQL queries | False |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `could not connect to server` | PostgreSQL not running | Start PostgreSQL service |
| `FATAL: database "db" does not exist` | Database not created | Create database first |
| `FATAL: password authentication failed` | Wrong password | Check credentials |
| `psycopg2.OperationalError` | Connection refused | Check host/port/credentials |
| `sqlalchemy.exc.OperationalError` | Connection pool issue | Increase timeout or pool size |
| `ModuleNotFoundError: No module named 'psycopg2'` | Driver not installed | `pip install psycopg2-binary` |

---

## ✅ Day 92 Checklist

- [ ] Install PostgreSQL locally
- [ ] Create a database and user
- [ ] Install `psycopg2-binary`
- [ ] Configure SQLAlchemy for PostgreSQL
- [ ] Use environment variables with `.env`
- [ ] Test database connection
- [ ] Create models and tables
- [ ] Run FastAPI with PostgreSQL
- [ ] Test API endpoints
- [ ] Push code to GitHub

