# 📚 Day 98 Resources - Week 14 Review & Capstone

## 📖 Week 14 Documentation Recap

| Day | Topic | Documentation Link |
|-----|-------|-------------------|
| Day 92 | PostgreSQL Setup & SQLAlchemy | [FastAPI SQL Databases](https://fastapi.tiangolo.com/tutorial/sql-databases/) |
| Day 93 | User Model & Password Hashing | [Passlib Docs](https://passlib.readthedocs.io/) |
| Day 94 | JWT Authentication | [FastAPI OAuth2 JWT](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/) |
| Day 95 | Protected Routes & Current User | [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/) |
| Day 96 | User-Task Relationship | [SQLAlchemy Relationships](https://docs.sqlalchemy.org/en/20/orm/basic_relationships.html) |
| Day 97 | Pydantic Schemas for Auth | [Pydantic Models](https://docs.pydantic.dev/latest/concepts/models/) |
| Day 98 | Review & Capstone | Current |

## 🎥 Video Review Playlist

| Topic | Link | Duration |
|-------|------|----------|
| FastAPI Authentication Full Course | https://youtu.be/6ThXsUwLWvc | 30 min |
| PostgreSQL & FastAPI Integration | https://youtu.be/2jM5l1QxE1g | 25 min |
| JWT Authentication Explained | https://youtu.be/0DdM6H1QjYM | 20 min |

## 📦 Essential Packages

| Package | Command | Purpose |
|---------|---------|---------|
| fastapi | `pip install fastapi` | Framework |
| uvicorn | `pip install uvicorn` | ASGI server |
| sqlalchemy | `pip install sqlalchemy` | ORM |
| psycopg2-binary | `pip install psycopg2-binary` | PostgreSQL driver |
| python-jose | `pip install python-jose[cryptography]` | JWT |
| passlib | `pip install passlib[bcrypt]` | Password hashing |
| python-multipart | `pip install python-multipart` | Form data |
| email-validator | `pip install email-validator` | Email validation |
| python-dotenv | `pip install python-dotenv` | Environment variables |

## 📁 Capstone Project Structure

```
auth_api/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── database.py
│   ├── config.py
│   ├── validators.py
│   └── routers/
│       ├── __init__.py
│       ├── auth.py
│       ├── users.py
│       └── tasks.py
├── .env
├── requirements.txt
└── README.md
```

## 🧪 Testing the API

### Registration
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","username":"john","password":"SecurePass123!"}'
```

### Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=john&password=SecurePass123!"
```

### Protected Route
```bash
curl -X GET http://localhost:8000/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

