# 📚 Day 92 Resources - PostgreSQL Setup & SQLAlchemy

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| PostgreSQL Official Docs | https://www.postgresql.org/docs/ | Complete PostgreSQL documentation |
| SQLAlchemy Docs | https://docs.sqlalchemy.org/ | Official SQLAlchemy ORM documentation |
| FastAPI SQL Databases | https://fastapi.tiangolo.com/tutorial/sql-databases/ | FastAPI database integration guide |
| psycopg2 Docs | https://www.psycopg.org/docs/ | PostgreSQL adapter for Python |
| asyncpg Docs | https://magicstack.github.io/asyncpg/ | Async PostgreSQL driver |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| PostgreSQL Setup & FastAPI Integration | https://youtu.be/6ThXsUwLWvc | 25 min |
| SQLAlchemy with PostgreSQL | https://youtu.be/2jM5l1QxE1g | 30 min |
| Async PostgreSQL with FastAPI | https://youtu.be/0DdM6H1QjYM | 20 min |

## 📦 Essential Packages

| Package | Command | Purpose |
|---------|---------|---------|
| psycopg2-binary | `pip install psycopg2-binary` | PostgreSQL driver (sync)  |
| asyncpg | `pip install asyncpg` | Async PostgreSQL driver  |
| sqlalchemy | `pip install sqlalchemy` | ORM library |
| python-dotenv | `pip install python-dotenv` | Environment variables |

## 🔧 Connection Strings

| Use Case | Connection String |
|----------|-------------------|
| Sync PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| Async PostgreSQL | `postgresql+asyncpg://user:pass@localhost:5432/db`  |
| SSL Enabled | `postgresql://user:pass@host:5432/db?sslmode=require` |

## 📁 Starter Templates

| Resource | Link | Description |
|----------|------|-------------|
| FastAPI PostgreSQL CRUD Example | https://github.com/melaxman/FastAPI_PostgreSQL_CRUD_Application | Async SQLAlchemy + Docker setup  |
| FastAPI SQLAlchemy Starter | https://github.com/justyn-clark/fastapi-sqlalchemy-starter | Async SQLAlchemy 2.0, JWT, Alembic  |
| FastAPI Backend Skeleton | https://github.com/kyawmyohlaing/python-backend | PostgreSQL, Alembic, JWT auth  |

## 📝 Common PostgreSQL Commands

| Command | Purpose |
|---------|---------|
| `psql -U postgres` | Connect as postgres user |
| `CREATE DATABASE db;` | Create database |
| `CREATE USER user WITH PASSWORD 'pass';` | Create user |
| `GRANT ALL ON DATABASE db TO user;` | Grant privileges |
| `\l` | List databases |
| `\du` | List users |
| `\dt` | List tables |
| `\q` | Quit psql |

## 📖 Further Reading

| Article | Link |
|---------|------|
| PostgreSQL with SQLAlchemy | https://fastapi.tiangolo.com/tutorial/sql-databases/ |
| Async SQLAlchemy Setup | https://fastapi-users.github.io/fastapi-users/10.3/configuration/databases/sqlalchemy/  |
| Connection Pooling Guide | https://docs.sqlalchemy.org/en/20/core/pooling.html |


