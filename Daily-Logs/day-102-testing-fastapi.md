# 📅 Day 102: Testing FastAPI Applications

**Date:** July 9, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Pytest, TestClient, Test Database, Fixtures, Authentication Testing, Error Testing

---

## 📋 Learning Objectives

- ✅ Install and configure pytest for FastAPI
- ✅ Use TestClient for API testing
- ✅ Set up test database with overrides
- ✅ Write tests for GET endpoints
- ✅ Write tests for POST with request bodies
- ✅ Test authentication flows
- ✅ Test error handling and status codes

---

## 🎯 Part 1: Testing Setup

### Why Testing?

| Benefit | Description |
|---------|-------------|
| **Confidence** | Ensure code works as expected |
| **Prevent Regressions** | Catch bugs before deployment |
| **Documentation** | Tests document expected behavior |
| **Refactoring** | Safe to change code with tests |

### Installation

```bash
# Core testing packages
pip install pytest httpx

# Development dependencies
pip install pytest-cov  # Coverage reporting
```

### Test Configuration

```python
# pytest.ini
[pytest]
# Test discovery patterns
python_files = test_*.py
python_classes = Test*
python_functions = test_*

# Add project root to path
pythonpath = .

# Test directories
testpaths = tests

# Markers
markers =
    unit: Unit tests
    integration: Integration tests
    slow: Slow running tests
```

### Test Database Setup

```python
# tests/conftest.py
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, get_db
from app.config import settings

# Test database URL (SQLite for fast tests)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# Create test engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine
)

# Override database dependency
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="session")
def client():
    """Create test client."""
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield TestClient(app)
    # Cleanup
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db_session():
    """Create database session for tests."""
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    yield session

    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture
def auth_headers(client):
    """Create authenticated user and return headers."""
    # Register user
    client.post("/auth/register", json={
        "email": "test@example.com",
        "username": "testuser",
        "password": "securepassword123"
    })

    # Login
    response = client.post("/auth/login", data={
        "username": "testuser",
        "password": "securepassword123"
    })

    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
```

---

## 📝 Part 2: Writing Tests

### Testing Root Endpoint

```python
# tests/test_main.py
from fastapi.testclient import TestClient


def test_root(client: TestClient):
    """Test root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()


def test_health_check(client: TestClient):
    """Test health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
```

### Testing Authentication

```python
# tests/test_auth.py
from fastapi.testclient import TestClient


def test_register_success(client: TestClient):
    """Test successful user registration."""
    response = client.post("/auth/register", json={
        "email": "newuser@example.com",
        "username": "newuser",
        "password": "SecurePass123!"
    })
    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "newuser"
    assert data["email"] == "newuser@example.com"
    assert "hashed_password" not in data
    assert "id" in data


def test_register_duplicate_email(client: TestClient):
    """Test registration with duplicate email."""
    # First registration
    client.post("/auth/register", json={
        "email": "duplicate@example.com",
        "username": "user1",
        "password": "password123"
    })

    # Second registration with same email
    response = client.post("/auth/register", json={
        "email": "duplicate@example.com",
        "username": "user2",
        "password": "password123"
    })
    assert response.status_code == 409
    assert "already registered" in response.json()["detail"]


def test_register_duplicate_username(client: TestClient):
    """Test registration with duplicate username."""
    # First registration
    client.post("/auth/register", json={
        "email": "user1@example.com",
        "username": "duplicateuser",
        "password": "password123"
    })

    # Second registration with same username
    response = client.post("/auth/register", json={
        "email": "user2@example.com",
        "username": "duplicateuser",
        "password": "password123"
    })
    assert response.status_code == 409
    assert "already taken" in response.json()["detail"]


def test_register_weak_password(client: TestClient):
    """Test registration with weak password."""
    response = client.post("/auth/register", json={
        "email": "weak@example.com",
        "username": "weakuser",
        "password": "123"
    })
    assert response.status_code == 400
    assert "Password must be at least 8 characters" in response.json()["detail"]


def test_login_success(client: TestClient):
    """Test successful login."""
    # Create user
    client.post("/auth/register", json={
        "email": "login@example.com",
        "username": "loginuser",
        "password": "SecurePass123!"
    })

    # Login
    response = client.post("/auth/login", data={
        "username": "loginuser",
        "password": "SecurePass123!"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert "expires_in" in data


def test_login_invalid_credentials(client: TestClient):
    """Test login with invalid credentials."""
    response = client.post("/auth/login", data={
        "username": "nonexistent",
        "password": "wrongpassword"
    })
    assert response.status_code == 401
    assert "Invalid credentials" in response.json()["detail"]
```

### Testing Protected Routes

```python
# tests/test_tasks.py
from fastapi.testclient import TestClient


def test_create_task_success(client: TestClient, auth_headers: dict):
    """Test creating a task with authentication."""
    response = client.post(
        "/tasks/",
        json={
            "title": "Test Task",
            "description": "This is a test task"
        },
        headers=auth_headers
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["completed"] == False
    assert "id" in data
    assert "user_id" in data


def test_get_tasks(client: TestClient, auth_headers: dict):
    """Test getting tasks for authenticated user."""
    # Create a task first
    client.post("/tasks/", json={"title": "Task 1"}, headers=auth_headers)
    client.post("/tasks/", json={"title": "Task 2"}, headers=auth_headers)

    # Get tasks
    response = client.get("/tasks/", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 2
    assert data[0]["title"] == "Task 1"


def test_get_task_by_id(client: TestClient, auth_headers: dict):
    """Test getting a specific task by ID."""
    # Create a task
    create_response = client.post(
        "/tasks/",
        json={"title": "Specific Task"},
        headers=auth_headers
    )
    task_id = create_response.json()["id"]

    # Get the task
    response = client.get(f"/tasks/{task_id}", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == task_id
    assert data["title"] == "Specific Task"


def test_get_task_not_found(client: TestClient, auth_headers: dict):
    """Test getting a non-existent task."""
    response = client.get("/tasks/999", headers=auth_headers)
    assert response.status_code == 404
    assert "not found" in response.json()["detail"]


def test_update_task(client: TestClient, auth_headers: dict):
    """Test updating a task."""
    # Create a task
    create_response = client.post(
        "/tasks/",
        json={"title": "Old Title", "description": "Old description"},
        headers=auth_headers
    )
    task_id = create_response.json()["id"]

    # Update the task
    response = client.put(
        f"/tasks/{task_id}",
        json={
            "title": "New Title",
            "description": "New description"
        },
        headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "New Title"
    assert data["description"] == "New description"


def test_update_task_not_owned(client: TestClient, auth_headers: dict):
    """Test updating a task not owned by the user."""
    # Create task with first user
    create_response = client.post(
        "/tasks/",
        json={"title": "Other User's Task"},
        headers=auth_headers
    )
    task_id = create_response.json()["id"]

    # Create second user and login
    client.post("/auth/register", json={
        "email": "other@example.com",
        "username": "otheruser",
        "password": "SecurePass123!"
    })
    login_response = client.post("/auth/login", data={
        "username": "otheruser",
        "password": "SecurePass123!"
    })
    other_headers = {"Authorization": f"Bearer {login_response.json()['access_token']}"}

    # Try to update other user's task
    response = client.put(
        f"/tasks/{task_id}",
        json={"title": "Hacked!"},
        headers=other_headers
    )
    assert response.status_code == 404
    assert "not found" in response.json()["detail"]


def test_delete_task(client: TestClient, auth_headers: dict):
    """Test deleting a task."""
    # Create a task
    create_response = client.post(
        "/tasks/",
        json={"title": "Task to Delete"},
        headers=auth_headers
    )
    task_id = create_response.json()["id"]

    # Delete the task
    response = client.delete(f"/tasks/{task_id}", headers=auth_headers)
    assert response.status_code == 204

    # Verify task is gone
    get_response = client.get(f"/tasks/{task_id}", headers=auth_headers)
    assert get_response.status_code == 404


def test_protected_route_without_token(client: TestClient):
    """Test accessing protected route without token."""
    response = client.get("/users/me")
    assert response.status_code == 401
    assert "Unauthorized" in response.json()["detail"]


def test_protected_route_with_invalid_token(client: TestClient):
    """Test accessing protected route with invalid token."""
    headers = {"Authorization": "Bearer invalid_token"}
    response = client.get("/users/me", headers=headers)
    assert response.status_code == 401
    assert "Could not validate credentials" in response.json()["detail"]
```

---

## 🔧 Part 3: Testing Patterns

### Parameterized Tests

```python
import pytest

@pytest.mark.parametrize("username,email,password,expected_status", [
    ("valid", "valid@example.com", "ValidPass123!", 201),
    ("", "empty@example.com", "ValidPass123!", 422),  # Empty username
    ("valid", "invalid-email", "ValidPass123!", 422),  # Invalid email
    ("valid", "valid@example.com", "123", 400),  # Short password
])
def test_register_validation(client, username, email, password, expected_status):
    response = client.post("/auth/register", json={
        "username": username,
        "email": email,
        "password": password
    })
    assert response.status_code == expected_status
```

### Fixtures for Common Data

```python
# tests/conftest.py
@pytest.fixture
def test_user(client):
    """Create a test user and return user data."""
    user_data = {
        "email": "fixture@example.com",
        "username": "fixtureuser",
        "password": "FixturePass123!"
    }
    client.post("/auth/register", json=user_data)
    return user_data


@pytest.fixture
def test_token(client, test_user):
    """Get token for test user."""
    response = client.post("/auth/login", data={
        "username": test_user["username"],
        "password": test_user["password"]
    })
    return response.json()["access_token"]


@pytest.fixture
def test_task(client, test_token):
    """Create a test task and return task data."""
    response = client.post(
        "/tasks/",
        json={"title": "Fixture Task"},
        headers={"Authorization": f"Bearer {test_token}"}
    )
    return response.json()
```

---

## 📊 Quick Reference

### Pytest Commands

| Command | Purpose |
|---------|---------|
| `pytest` | Run all tests |
| `pytest -v` | Verbose output |
| `pytest -k "test_name"` | Run specific test |
| `pytest -m "unit"` | Run tests with marker |
| `pytest --cov=app` | Coverage report |
| `pytest --cov-report=html` | HTML coverage report |

### Assertion Patterns

| Pattern | Purpose |
|---------|---------|
| `assert response.status_code == 200` | Check status code |
| `assert response.json()["key"] == value` | Check JSON field |
| `assert "key" in response.json()` | Check if key exists |
| `assert isinstance(data, list)` | Check data type |
| `assert len(data) > 0` | Check list length |

### Test Client Methods

| Method | Purpose |
|--------|---------|
| `client.get(url)` | GET request |
| `client.post(url, json=data)` | POST with JSON |
| `client.put(url, json=data)` | PUT with JSON |
| `client.delete(url)` | DELETE request |
| `client.post(url, data=form_data)` | POST with form data |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Database not reset | Shared test database | Use transaction rollback |
| 401 on protected routes | Missing auth headers | Use auth_headers fixture |
| 422 Validation errors | Invalid test data | Check schema validation |
| Tests order matters | State leakage | Isolate tests with fixtures |
| Slow tests | Real database | Use SQLite for tests |

---

## ✅ Day 102 Checklist

- [ ] Install pytest and httpx
- [ ] Configure test database
- [ ] Create conftest.py with fixtures
- [ ] Write tests for registration
- [ ] Write tests for login
- [ ] Write tests for task CRUD
- [ ] Test error cases
- [ ] Test protected routes
- [ ] Run all tests: `pytest`
- [ ] Check test coverage: `pytest --cov=app`
- [ ] Push code to GitHub

