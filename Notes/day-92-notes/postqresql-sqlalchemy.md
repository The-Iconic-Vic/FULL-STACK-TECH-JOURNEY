# 📘 PostgreSQL Setup & SQLAlchemy

## 🎯 Overview

PostgreSQL is a powerful, open-source relational database system. When combined with SQLAlchemy, it provides a robust foundation for production-grade FastAPI applications. This guide covers PostgreSQL setup, SQLAlchemy integration, and environment configuration.

---

## 📦 Part 1: PostgreSQL Setup

### What is PostgreSQL?

PostgreSQL is a **production-grade relational database** known for reliability, feature completeness, and performance. It's the default choice for serious applications.

### PostgreSQL vs SQLite

| Feature | PostgreSQL | SQLite |
|---------|------------|--------|
| **Architecture** | Client-server | Embedded |
| **Concurrency** | High (many connections) | Limited (single writer) |
| **Scalability** | Excellent | Limited |
| **Features** | Full-featured | Lightweight |
| **Configuration** | Complex | Simple |
| **Best For** | Production | Development/Testing |

### Installing PostgreSQL

**Windows:**
1. Download installer from [postgresql.org](https://postgresql.org/download/)
2. Run installer, remember the password for `postgres` user
3. Default port: 5432

**macOS (Homebrew):**
```bash
brew install postgresql@16
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
# Connect as postgres superuser
sudo -u postgres psql

# Create user
CREATE USER fastapi_user WITH PASSWORD 'secure_password';

# Create database
CREATE DATABASE fastapi_db OWNER fastapi_user;

# Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE fastapi_db TO fastapi_user;

# Verify
\l          # List databases
\du         # List users
\q          # Quit
```

### Connection String Format

```bash
# Standard format
postgresql://username:password@host:port/database_name

# Examples
postgresql://fastapi_user:secure_password@localhost:5432/fastapi_db

# With SSL
postgresql://user:pass@localhost:5432/db?sslmode=require

# Environment variable format
DATABASE_URL=postgresql://user:pass@localhost:5432/db
```

---

## 🔧 Part 2: SQLAlchemy with PostgreSQL

### Installation

```bash
# Required packages
pip install psycopg2-binary    # PostgreSQL driver
pip install sqlalchemy         # ORM

# For async support (optional)
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
DATABASE_URL = "postgresql://user:password@localhost:5432/fastapi_db"

# Create engine with connection pooling
engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=5,           # Base connections in pool
    max_overflow=10,       # Extra connections when pool is full
    pool_timeout=30,       # Seconds to wait for connection
    pool_recycle=1800,     # Recycle after 30 minutes
    pool_pre_ping=True,    # Verify connection before using
    echo=True,             # Log SQL queries (debug)
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### Connection Pooling Explained

Connection pooling reuses database connections, improving performance.

| Parameter | Description | Default |
|-----------|-------------|---------|
| `pool_size` | Number of connections in pool | 5 |
| `max_overflow` | Extra connections when pool is full | 10 |
| `pool_timeout` | Seconds to wait for connection | 30 |
| `pool_recycle` | Recycle connections after seconds | -1 (no recycle) |
| `pool_pre_ping` | Verify connection before using | False |

---

## 🔐 Part 3: Environment Variables

### Why Use Environment Variables?

- Keep secrets out of code
- Different configurations for dev/production
- Easier deployment

### Using python-dotenv

```bash
pip install python-dotenv
```

### .env File

```bash
# .env (gitignored)
DATABASE_URL=postgresql://fastapi_user:secure_password@localhost:5432/fastapi_db
SECRET_KEY=your-secret-key-here
DEBUG=True
POOL_SIZE=5
MAX_OVERFLOW=10
```

### Configuration Module

```python
# config.py
import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Application settings."""
    
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://user:pass@localhost:5432/db"
    )
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key")
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    POOL_SIZE: int = int(os.getenv("POOL_SIZE", "5"))
    MAX_OVERFLOW: int = int(os.getenv("MAX_OVERFLOW", "10"))


settings = Settings()
```

### .gitignore

```gitignore
# Environment variables
.env
.env.local
.env.production

# Database files
*.db
*.sqlite3
pgdata/
```

---

## 🏗️ Part 4: Models & Schema Example

### SQLAlchemy Model

```python
# models.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime
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
```

### Pydantic Schemas

```python
# schemas.py
from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
```

---

## 📊 Quick Reference

### PostgreSQL Commands

| Command | Purpose |
|---------|---------|
| `psql -U postgres` | Connect as postgres user |
| `CREATE DATABASE db;` | Create database |
| `CREATE USER user WITH PASSWORD 'pass';` | Create user |
| `GRANT ALL ON DATABASE db TO user;` | Grant privileges |
| `\l` | List databases |
| `\du` | List users |
| `\c db` | Connect to database |
| `\dt` | List tables |
| `\q` | Quit psql |

### Connection Strings

| Database | Connection String |
|----------|-------------------|
| PostgreSQL (local) | `postgresql://user:pass@localhost:5432/db` |
| PostgreSQL (with SSL) | `postgresql://user:pass@host:5432/db?sslmode=require` |
| PostgreSQL (Heroku) | `postgresql://user:pass@host:5432/db?sslmode=no-verify` |
| SQLite | `sqlite:///./database.db` |

### SQLAlchemy Engine Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `pool_size` | Base connections in pool | 5 |
| `max_overflow` | Extra connections allowed | 10 |
| `pool_timeout` | Wait time for connection (seconds) | 30 |
| `pool_recycle` | Recycle connections after seconds | -1 |
| `pool_pre_ping` | Verify connection before using | False |
| `echo` | Log SQL queries | False |

### Common PostgreSQL Ports

| Context | Port |
|---------|------|
| Default PostgreSQL | 5432 |
| AWS RDS | 5432 |
| Heroku | Varies (use provided) |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `could not connect to server` | PostgreSQL not running | `brew services start postgresql` or `sudo systemctl start postgresql` |
| `FATAL: database "db" does not exist` | Database not created | `CREATE DATABASE db;` |
| `FATAL: password authentication failed` | Wrong credentials | Check username/password |
| `psycopg2.OperationalError` | Connection refused | Verify host, port, credentials |
| `sqlalchemy.exc.OperationalError` | Connection pool issue | Increase `pool_timeout` |
| `ModuleNotFoundError: No module named 'psycopg2'` | Driver not installed | `pip install psycopg2-binary` |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **PostgreSQL is production-ready** | Used in serious applications |
| **psycopg2-binary is the driver** | Connects Python to PostgreSQL |
| **Connection pooling improves performance** | Reuses connections |
| **Use environment variables** | Keep secrets out of code |
| **SQLAlchemy abstracts database differences** | Same code works for SQLite/PostgreSQL |
| **PostgreSQL requires setup** | Need to create database and user |
| **Pool pre-ping prevents stale connections** | Verifies connection before use |

