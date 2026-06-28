# 📚 Day 90 Resources - FastAPI Database Integration (SQLite & SQLAlchemy)

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| FastAPI: SQL Databases | https://fastapi.tiangolo.com/tutorial/sql-databases/ | Official FastAPI SQL database tutorial  |
| FastAPI: SQLAlchemy Setup | https://fastapi.tiangolo.com/tutorial/sql-databases/#create-the-sqlalchemy-parts | Database configuration guide |
| FastAPI: Multiple Models | https://fastapi.tiangolo.com/tutorial/sql-databases/#multiple-models | Pydantic vs SQLAlchemy models |
| SQLAlchemy Documentation | https://docs.sqlalchemy.org/ | Complete SQLAlchemy reference |
| SQLAlchemy ORM Quick Start | https://docs.sqlitecloud.io/docs/quick-start-sqlalchemy-orm | SQLAlchemy with FastAPI  |
| Alembic Migrations | https://alembic.sqlalchemy.org/ | Database migration tool |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| FastAPI + SQLAlchemy Tutorial | https://youtu.be/6ThXsUwLWvc | 30 min |
| SQLAlchemy ORM Deep Dive | https://youtu.be/2jM5l1QxE1g | 25 min |
| FastAPI SQLite CRUD | https://youtu.be/0DdM6H1QjYM | 20 min |
| Alembic Migrations | https://youtu.be/JfR7xGxBqZY | 15 min |

## 📦 Essential Packages

| Package | Command | Purpose |
|---------|---------|---------|
| sqlalchemy | `pip install sqlalchemy` | ORM library |
| aiosqlite | `pip install aiosqlite` | Async SQLite driver  |
| asyncpg | `pip install asyncpg` | Async PostgreSQL driver  |
| psycopg2 | `pip install psycopg2-binary` | PostgreSQL driver (sync) |
| alembic | `pip install alembic` | Database migrations  |

## 🔧 Database Connection Strings

| Database | Connection String |
|----------|-------------------|
| SQLite | `sqlite:///./database.db` |
| SQLite (async) | `sqlite+aiosqlite:///./database.db`  |
| PostgreSQL | `postgresql://user:pass@localhost/db` |
| PostgreSQL (async) | `postgresql+asyncpg://user:pass@localhost/db`  |
| MySQL | `mysql+pymysql://user:pass@localhost/db`  |

## 📁 Example Project Structure

```
fastapi-sqlite-crud/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI app with endpoints
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic models
│   ├── database.py      # DB connection setup
│   ├── crud.py          # CRUD operations
│   └── routers/
│       └── todos.py     # API endpoints
├── venv/
├── requirements.txt
└── README.md
```

## 📝 Requirements.txt

```
fastapi==0.110.0
uvicorn==0.29.0
sqlalchemy==2.0.28
aiosqlite==0.19.0
python-multipart==0.0.9
```

## 📖 Further Reading

| Article | Link |
|---------|------|
| SQLAlchemy ORM Tutorial | https://docs.sqlalchemy.org/en/20/orm/quickstart.html |
| FastAPI + SQLAlchemy CRUD | https://github.com/mohit7soni/fastapi-sqlite-crud  |
| FastAPI Todo with SQLite | https://github.com/lymanny/FastAPI-CRUD-Todo  |
| Database Layer Architecture | https://github.com/benavlabs/FastAPI-boilerplate  |

