# 📅 Day 101: Database Migrations with Alembic

**Date:** July 8, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Alembic Setup, Migration Generation, Upgrade/Downgrade, Schema Management

---

## 📋 Learning Objectives

- ✅ Install and configure Alembic for SQLAlchemy
- ✅ Initialize Alembic with async template
- ✅ Configure `alembic.ini` for PostgreSQL
- ✅ Generate migrations with `--autogenerate`
- ✅ Apply migrations with `upgrade head`
- ✅ Rollback migrations with `downgrade`
- ✅ Manage schema changes safely

---

## 🎯 Part 1: What is Alembic?

### Definition

Alembic is a lightweight database migration tool for SQLAlchemy. It allows you to manage database schema changes in a version-controlled, repeatable way.

### Why Migrations?

| Benefit | Description |
|---------|-------------|
| **Version Control** | Track schema changes in git |
| **Reproducibility** | Apply changes consistently across environments |
| **Rollback** | Undo changes if something goes wrong |
| **Collaboration** | Team members can apply migrations |
| **History** | Full audit trail of schema changes |

### Alembic vs Manual SQL

| Aspect | Alembic | Manual SQL |
|--------|---------|------------|
| **Version Control** | ✅ Yes | ❌ No |
| **Rollback** | ✅ Yes | ❌ Manual |
| **History** | ✅ Yes | ❌ No |
| **Team Collaboration** | ✅ Yes | ❌ Difficult |
| **Error Recovery** | ✅ Easy | ❌ Difficult |

---

## 🔧 Part 2: Alembic Setup

### Installation

```bash
pip install alembic
```

### Initialize Alembic

```bash
# Initialize with async template (for PostgreSQL + asyncpg)
alembic init -t async migrations

# Or for sync SQLAlchemy
alembic init migrations
```

### alembic.ini Configuration

```ini
# alembic.ini
[alembic]
# Path to migration scripts
script_location = migrations

# Template for migration files
file_template = %%(year)d_%%(month).2d_%%(day).2d_%%(hour).2d_%%(minute).2d_%%(second).2d_%%(slug)s

# Version table name
version_table = alembic_version

# Database URL (can be overridden in env.py)
sqlalchemy.url = postgresql://user:pass@localhost:5432/db

# Logging configuration
[loggers]
keys = root,sqlalchemy,alembic

[handlers]
keys = console

[formatters]
keys = generic

[logger_root]
level = WARN
handlers = console
qualname =

[logger_sqlalchemy]
level = WARN
handlers =
qualname = sqlalchemy.engine

[logger_alembic]
level = INFO
handlers =
qualname = alembic

[handler_console]
class = StreamHandler
args = (sys.stderr,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(levelname)-5.5s [%(name)s] %(message)s
datefmt = %H:%M:%S
```

### migrations/env.py Configuration

```python
# migrations/env.py
import asyncio
from logging.config import fileConfig
from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config
from alembic import context
import sys
from pathlib import Path

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent))

from app.models import Base
from app.config import settings

# Alembic Config object
config = context.config

# Set database URL from settings
config.set_main_option('sqlalchemy.url', settings.DATABASE_URL)

# Interpret the config file for Python logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Target metadata for autogenerate
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    """Run migrations with connection."""
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """Run migrations in 'async' mode."""
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    asyncio.run(run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
```

---

## 📝 Part 3: Creating Migrations

### Models Definition

```python
# app/models.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
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

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    completed = Column(Boolean, default=False)
    user_id = Column(Integer, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

### Generate Initial Migration

```bash
# Generate migration from model changes
alembic revision --autogenerate -m "create user and task tables"

# Output:
# Generating /project/migrations/versions/2024_01_01_1200_abc123_create_user_and_task_tables.py
```

### Migration File Example

```python
# migrations/versions/2024_01_01_1200_abc123_create_user_and_task_tables.py
"""create user and task tables

Revision ID: abc123
Revises: 
Create Date: 2024-01-01 12:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'abc123'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(length=100), nullable=False),
        sa.Column('username', sa.String(length=50), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)
    
    op.create_table('tasks',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=100), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('completed', sa.Boolean(), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_tasks_id'), 'tasks', ['id'], unique=False)
    op.create_index(op.f('ix_tasks_title'), 'tasks', ['title'], unique=False)
    op.create_index(op.f('ix_tasks_user_id'), 'tasks', ['user_id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_tasks_user_id'), table_name='tasks')
    op.drop_index(op.f('ix_tasks_title'), table_name='tasks')
    op.drop_index(op.f('ix_tasks_id'), table_name='tasks')
    op.drop_table('tasks')
    
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    # ### end Alembic commands ###
```

### Apply Migrations

```bash
# Apply all pending migrations
alembic upgrade head

# Output:
# INFO  [alembic.runtime.migration] Running upgrade  -> abc123, create user and task tables

# Check current version
alembic current

# Output:
# INFO  [alembic.runtime.migration] Current revision for postgresql://...: abc123
```

---

## 🔄 Part 4: Adding Schema Changes

### Adding a New Field

```python
# app/models.py - Add priority field to Task
class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    completed = Column(Boolean, default=False)
    priority = Column(String(20), default="medium")  # New field
    user_id = Column(Integer, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

### Generate Migration

```bash
# Generate migration for the new field
alembic revision --autogenerate -m "add priority to tasks"

# Output:
# Generating /project/migrations/versions/2024_01_01_1300_def456_add_priority_to_tasks.py
```

### Migration File

```python
# migrations/versions/2024_01_01_1300_def456_add_priority_to_tasks.py
"""add priority to tasks

Revision ID: def456
Revises: abc123
Create Date: 2024-01-01 13:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = 'def456'
down_revision: Union[str, None] = 'abc123'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('tasks', sa.Column('priority', sa.String(length=20), nullable=True))
    op.execute("UPDATE tasks SET priority = 'medium'")
    op.alter_column('tasks', 'priority', nullable=False)


def downgrade() -> None:
    op.drop_column('tasks', 'priority')
```

---

## 🔄 Part 5: Rolling Back Migrations

### Rollback Commands

```bash
# Rollback one migration (downgrade)
alembic downgrade -1

# Output:
# INFO  [alembic.runtime.migration] Running downgrade def456 -> abc123, add priority to tasks

# Rollback to a specific revision
alembic downgrade abc123

# Rollback to base (empty database)
alembic downgrade base
```

### Rollback Flow

```
Current: def456 (add priority)
─────────────────────────────
alembic downgrade -1
─────────────────────────────
Result: abc123 (create user and task tables)
Priority field removed from tasks table
```

### Migration History

```bash
# View migration history
alembic history

# Output:
# def456 -> abc123 (head), add priority to tasks
# abc123 -> (base), create user and task tables

# View current revision
alembic current
```

---

## 🏗️ Part 6: Complete Workflow

### Development Workflow

```bash
# 1. Update models
# Edit app/models.py

# 2. Generate migration
alembic revision --autogenerate -m "description of changes"

# 3. Review generated migration
# Check migrations/versions/*.py

# 4. Apply migration
alembic upgrade head

# 5. Test changes

# 6. If something is wrong, rollback
alembic downgrade -1

# 7. Fix migration and re-apply
alembic upgrade head
```

### Production Workflow

```bash
# 1. Backup database
pg_dump -U user db_name > backup.sql

# 2. Apply migrations
alembic upgrade head

# 3. Verify changes

# 4. If something goes wrong
alembic downgrade -1
# Then restore from backup
```

---

## 📊 Quick Reference

### Alembic Commands

| Command | Purpose |
|---------|---------|
| `alembic init -t async migrations` | Initialize Alembic (async) |
| `alembic revision --autogenerate -m "msg"` | Generate migration from model changes |
| `alembic upgrade head` | Apply all migrations |
| `alembic upgrade +1` | Apply one migration |
| `alembic downgrade -1` | Rollback one migration |
| `alembic downgrade base` | Rollback all migrations |
| `alembic current` | Show current version |
| `alembic history` | Show migration history |

### Migration File Structure

| Element | Purpose |
|---------|---------|
| `revision` | Unique ID |
| `down_revision` | Previous revision ID |
| `upgrade()` | Forward changes |
| `downgrade()` | Rollback changes |

### Common Operations in Migrations

| Operation | Example |
|-----------|---------|
| Create table | `op.create_table('users', ...)` |
| Drop table | `op.drop_table('users')` |
| Add column | `op.add_column('tasks', sa.Column('priority', sa.String()))` |
| Drop column | `op.drop_column('tasks', 'priority')` |
| Create index | `op.create_index('idx_name', 'table', ['column'])` |
| Drop index | `op.drop_index('idx_name', table_name='table')` |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Target database is not up to date` | Pending migrations | Run `alembic upgrade head` |
| `No such table` | Migration not run | Check `alembic current` |
| `Invalid revision` | Wrong revision ID | Use correct revision from `alembic history` |
| `Autogenerate not detecting changes` | Models not imported | Import models in env.py |
| `Downgrade failed` | Custom operations missing | Add downgrade logic |

---

## ✅ Day 101 Checklist

- [ ] Install Alembic: `pip install alembic`
- [ ] Initialize Alembic: `alembic init -t async migrations`
- [ ] Configure `alembic.ini` with database URL
- [ ] Configure `migrations/env.py` with models
- [ ] Define initial models (User, Task)
- [ ] Generate initial migration
- [ ] Apply migration: `alembic upgrade head`
- [ ] Add new field to Task (priority)
- [ ] Generate new migration
- [ ] Apply new migration
- [ ] Rollback migration: `alembic downgrade -1`
- [ ] View migration history
- [ ] Push code to GitHub

