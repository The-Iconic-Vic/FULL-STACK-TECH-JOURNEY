# 📘 Database Migrations with Alembic

## 🎯 What is Alembic?

Alembic is a lightweight database migration tool for SQLAlchemy. It allows you to manage database schema changes in a version-controlled, repeatable way, similar to how Git manages code changes.

---

## 📝 Part 1: Why Migrations?

### Benefits

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
| Version Control | ✅ Yes | ❌ No |
| Rollback | ✅ Yes | ❌ Manual |
| History | ✅ Yes | ❌ No |
| Team Collaboration | ✅ Yes | ❌ Difficult |

---

## 🔧 Part 2: Alembic Setup

### Installation

```bash
pip install alembic
```

### Initialize Alembic

```bash
# For async (PostgreSQL + asyncpg)
alembic init -t async migrations

# For sync SQLAlchemy
alembic init migrations
```

### alembic.ini

```ini
[alembic]
script_location = migrations
file_template = %%(year)d_%%(month).2d_%%(day).2d_%%(hour).2d_%%(minute).2d_%%(second).2d_%%(slug)s
version_table = alembic_version
sqlalchemy.url = postgresql://user:pass@localhost:5432/db
```

### migrations/env.py

```python
import asyncio
from logging.config import fileConfig
from sqlalchemy import pool
from sqlalchemy.ext.asyncio import async_engine_from_config
from alembic import context
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from app.models import Base
from app.config import settings

config = context.config
config.set_main_option('sqlalchemy.url', settings.DATABASE_URL)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata

def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(url=url, target_metadata=target_metadata, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()

def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()

async def run_async_migrations() -> None:
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)
    await connectable.dispose()

def run_migrations_online() -> None:
    asyncio.run(run_async_migrations())

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
```

---

## 📝 Part 3: Models for Migrations

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

---

## 🔄 Part 4: Migrations Commands

### Generate Migration

```bash
# Auto-generate from model changes
alembic revision --autogenerate -m "description"

# Create empty migration
alembic revision -m "description"
```

### Apply Migrations

```bash
# Apply all pending migrations
alembic upgrade head

# Apply one migration
alembic upgrade +1

# Apply to specific revision
alembic upgrade abc123
```

### Rollback Migrations

```bash
# Rollback one migration
alembic downgrade -1

# Rollback to specific revision
alembic downgrade abc123

# Rollback all (empty database)
alembic downgrade base
```

### View Status

```bash
# Show current revision
alembic current

# Show migration history
alembic history

# Show pending migrations
alembic upgrade --sql head
```

---

## 📁 Part 5: Migration File Structure

```python
"""description of migration

Revision ID: abc123
Revises: def456
Create Date: 2024-01-01 12:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = 'abc123'
down_revision: Union[str, None] = 'def456'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Forward changes
    op.create_table('table', ...)
    op.add_column('table', sa.Column('new_column', sa.String()))

def downgrade() -> None:
    # Reverse changes
    op.drop_column('table', 'new_column')
    op.drop_table('table')
```

---

## 🔧 Part 6: Common Migration Operations

### Adding a Column

```python
# Models
class Task(Base):
    priority = Column(String(20), default="medium")

# Migration
def upgrade():
    op.add_column('tasks', sa.Column('priority', sa.String(20), nullable=True))
    op.execute("UPDATE tasks SET priority = 'medium'")
    op.alter_column('tasks', 'priority', nullable=False)

def downgrade():
    op.drop_column('tasks', 'priority')
```

### Adding a Foreign Key

```python
# Models
user_id = Column(Integer, ForeignKey("users.id"))

# Migration
def upgrade():
    op.add_column('tasks', sa.Column('user_id', sa.Integer()))
    op.create_foreign_key('fk_tasks_user_id', 'tasks', 'users', ['user_id'], ['id'])

def downgrade():
    op.drop_constraint('fk_tasks_user_id', 'tasks', type_='foreignkey')
    op.drop_column('tasks', 'user_id')
```

### Creating an Index

```python
# Models
__table_args__ = (
    Index('idx_user_email', 'user_id', 'email'),
)

# Migration
def upgrade():
    op.create_index('idx_user_email', 'tasks', ['user_id', 'email'])

def downgrade():
    op.drop_index('idx_user_email', table_name='tasks')
```

---

## 📊 Quick Reference

### Alembic Commands

| Command | Purpose |
|---------|---------|
| `alembic init -t async migrations` | Initialize (async) |
| `alembic revision --autogenerate -m "msg"` | Generate migration |
| `alembic upgrade head` | Apply all migrations |
| `alembic downgrade -1` | Rollback one |
| `alembic current` | Show current version |
| `alembic history` | Show migration history |

### Migration File Elements

| Element | Purpose |
|---------|---------|
| `revision` | Unique migration ID |
| `down_revision` | Previous migration ID |
| `upgrade()` | Forward changes |
| `downgrade()` | Rollback changes |

### Common Operations

| Operation | Method |
|-----------|--------|
| Create table | `op.create_table()` |
| Drop table | `op.drop_table()` |
| Add column | `op.add_column()` |
| Drop column | `op.drop_column()` |
| Add constraint | `op.create_foreign_key()` |
| Add index | `op.create_index()` |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Target database not up to date | Pending migrations | `alembic upgrade head` |
| No such table | Migration not run | Check `alembic current` |
| Invalid revision | Wrong ID | Use revision from `alembic history` |
| Autogenerate not detecting changes | Models not imported | Import models in env.py |
| Downgrade failed | Missing downgrade logic | Add downgrade operations |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Alembic manages schema changes** | Like Git for databases |
| **Migrations are versioned** | Each migration has unique ID |
| **Upgrade applies changes** | `alembic upgrade head` |
| **Downgrade rolls back** | `alembic downgrade -1` |
| **Autogenerate detects model changes** | Saves manual SQL writing |
| **Always test downgrade** | Ensure rollback works |
| **Backup before production** | Safety first |

