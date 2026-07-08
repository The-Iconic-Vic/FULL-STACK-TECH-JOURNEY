# 📚 Day 101 Resources - Database Migrations with Alembic

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| Alembic Official Docs | https://alembic.sqlalchemy.org/en/latest/ | Complete Alembic documentation  |
| Alembic Tutorial | https://alembic.sqlalchemy.org/en/latest/tutorial.html | Step-by-step migration guide |
| Auto Generating Migrations | https://alembic.sqlalchemy.org/en/latest/autogenerate.html | Autogenerate feature documentation |
| Operation Reference | https://alembic.sqlalchemy.org/en/latest/ops.html | Available migration operations |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| Alembic with FastAPI Setup | https://youtu.be/6ThXsUwLWvc | 20 min |
| Database Migrations with Alembic | https://youtu.be/2jM5l1QxE1g | 25 min |
| FastAPI + Alembic + PostgreSQL | https://youtu.be/0DdM6H1QjYM | 18 min |

## 📦 Essential Packages

| Package | Command | Purpose |
|---------|---------|---------|
| alembic | `pip install alembic` | Migration tool  |
| sqlalchemy | `pip install sqlalchemy` | ORM |
| psycopg2-binary | `pip install psycopg2-binary` | PostgreSQL driver |

## 🚀 Quick Command Reference

| Command | Purpose |
|---------|---------|
| `alembic init -t async migrations` | Initialize Alembic (async) |
| `alembic revision --autogenerate -m "msg"` | Generate migration from model changes  |
| `alembic upgrade head` | Apply all migrations  |
| `alembic downgrade -1` | Rollback one migration  |
| `alembic current` | Show current database revision  |
| `alembic history` | View migration history  |
| `alembic stamp head` | Mark database as up-to-date  |

## 📁 Example Project Structure

```
fastapi-project/
├── app/
│   ├── __init__.py
│   ├── models.py          # SQLAlchemy models
│   ├── database.py        # DB connection
│   └── config.py          # Settings
├── alembic/
│   ├── env.py             # Migration environment 
│   ├── script.py.mako     # Migration template
│   └── versions/
│       └── (migration files)
├── alembic.ini            # Alembic config 
└── requirements.txt
```

## 📖 Further Reading

| Article | Link |
|---------|------|
| FastAPI Alembic Guide | https://github.com/polymorphisma/fastapi-alembic  |
| Async Alembic Configuration | https://github.com/andresclaroavocado/migrations  |
| Alembic Cheat Sheet | https://dev.to/atifwattoo/cheat-sheet-of-alembic-commands-1b9i  |

