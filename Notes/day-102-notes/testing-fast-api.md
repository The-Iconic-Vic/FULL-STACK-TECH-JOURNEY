# 📘 Testing FastAPI Applications

## 🎯 What is Testing?

Testing ensures your code works as expected and helps prevent bugs from being introduced when you make changes. FastAPI provides excellent support for testing with `TestClient` and pytest.

---

## 📁 Part 1: Testing Setup

### Installation

```bash
pip install pytest httpx pytest-cov
```

### Test Configuration (pytest.ini)

```ini
[pytest]
python_files = test_*.py
python_classes = Test*
python_functions = test_*
pythonpath = .
testpaths = tests
```

### Test Database Fixture (conftest.py)

```python
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, get_db

# Test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="session")
def client():
    Base.metadata.create_all(bind=engine)
    yield TestClient(app)
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def auth_headers(client):
    client.post("/auth/register", json={
        "email": "test@example.com",
        "username": "testuser",
        "password": "SecurePass123!"
    })
    response = client.post("/auth/login", data={
        "username": "testuser",
        "password": "SecurePass123!"
    })
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
```

---

## 📝 Part 2: Writing Tests

### Basic Test

```python
def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["message"] == "Hello World"
```

### Testing Registration

```python
def test_register_success(client):
    response = client.post("/auth/register", json={
        "email": "test@example.com",
        "username": "testuser",
        "password": "SecurePass123!"
    })
    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "testuser"
    assert "hashed_password" not in data

def test_register_duplicate_email(client):
    client.post("/auth/register", json={
        "email": "duplicate@example.com",
        "username": "user1",
        "password": "password123"
    })
    response = client.post("/auth/register", json={
        "email": "duplicate@example.com",
        "username": "user2",
        "password": "password123"
    })
    assert response.status_code == 409
    assert "already registered" in response.json()["detail"]
```

### Testing Login

```python
def test_login_success(client):
    client.post("/auth/register", json={
        "email": "login@example.com",
        "username": "loginuser",
        "password": "SecurePass123!"
    })
    response = client.post("/auth/login", data={
        "username": "loginuser",
        "password": "SecurePass123!"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_invalid_credentials(client):
    response = client.post("/auth/login", data={
        "username": "nonexistent",
        "password": "wrong"
    })
    assert response.status_code == 401
```

### Testing Protected Routes

```python
def test_create_task(client, auth_headers):
    response = client.post("/tasks/", json={
        "title": "Test Task"
    }, headers=auth_headers)
    assert response.status_code == 201
    assert response.json()["title"] == "Test Task"

def test_get_tasks(client, auth_headers):
    client.post("/tasks/", json={"title": "Task 1"}, headers=auth_headers)
    response = client.get("/tasks/", headers=auth_headers)
    assert response.status_code == 200
    assert len(response.json()) >= 1

def test_protected_route_without_token(client):
    response = client.get("/users/me")
    assert response.status_code == 401

def test_protected_route_invalid_token(client):
    headers = {"Authorization": "Bearer invalid_token"}
    response = client.get("/users/me", headers=headers)
    assert response.status_code == 401
```

---

## 📊 Quick Reference

### Pytest Commands

| Command | Purpose |
|---------|---------|
| `pytest` | Run all tests |
| `pytest -v` | Verbose output |
| `pytest -k "test_name"` | Run specific test |
| `pytest --cov=app` | Coverage report |

### Test Client Methods

| Method | Purpose |
|--------|---------|
| `client.get(url)` | GET request |
| `client.post(url, json=data)` | POST with JSON |
| `client.post(url, data=form)` | POST with form |
| `client.put(url, json=data)` | PUT request |
| `client.delete(url)` | DELETE request |

### Assertion Patterns

| Pattern | Purpose |
|---------|---------|
| `assert response.status_code == 200` | Check status |
| `assert response.json()["key"] == value` | Check field |
| `assert "key" in response.json()` | Check key exists |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Database not reset | Shared state | Use transaction rollback |
| 401 on protected routes | Missing auth | Use auth_headers fixture |
| 422 validation errors | Invalid test data | Check schema validation |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **TestClient simulates requests** | No need to run server |
| **Use test database** | Separate from development/production |
| **Fixtures for setup** | Reusable test data |
| **Test all status codes** | Success and error cases |
| **Test authentication** | With and without tokens |
| **Run tests frequently** | Catch issues early |

