# 📚 Day 102 Resources - Testing FastAPI Applications

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| FastAPI: Testing | https://fastapi.tiangolo.com/tutorial/testing/ | Official FastAPI testing guide |
| FastAPI: TestClient | https://fastapi.tiangolo.com/reference/testclient/ | TestClient API reference |
| Pytest Documentation | https://docs.pytest.org/ | Complete pytest documentation |
| Pytest: Fixtures | https://docs.pytest.org/en/stable/fixture.html | Fixture guide |
| Coverage.py | https://coverage.readthedocs.io/ | Code coverage reporting |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| FastAPI Testing Tutorial | https://youtu.be/6ThXsUwLWvc | 20 min |
| Pytest with FastAPI | https://youtu.be/2jM5l1QxE1g | 25 min |

## 📦 Essential Packages

| Package | Command | Purpose |
|---------|---------|---------|
| pytest | `pip install pytest` | Testing framework |
| httpx | `pip install httpx` | HTTP client for tests |
| pytest-cov | `pip install pytest-cov` | Coverage reporting |
| pytest-asyncio | `pip install pytest-asyncio` | Async test support |
| pytest-xdist | `pip install pytest-xdist` | Parallel test execution |

## 📁 Test Structure Template

```
tests/
├── __init__.py
├── conftest.py          # Fixtures
├── test_auth.py         # Auth tests
├── test_tasks.py        # Task tests
├── test_main.py         # Root tests
└── test_models.py       # Model tests
```

## 🚀 Pytest Commands

| Command | Purpose |
|---------|---------|
| `pytest` | Run all tests |
| `pytest -v` | Verbose output |
| `pytest -k "test_name"` | Run specific test |
| `pytest -m "unit"` | Run tests with marker |
| `pytest --cov=app` | Coverage report |
| `pytest --cov-report=html` | HTML coverage report |
| `pytest -n auto` | Parallel execution |

## 📖 Further Reading

| Article | Link |
|---------|------|
| FastAPI Testing with Pytest | https://medium.com/j-labs/rest-api-testing-using-fastapi-and-pytest-3d95bb57e441  |
| Testing FastAPI Applications | https://www.polarsparc.com/xhtml/FastAPI-Advanced-6.html  |
| Pytest Fixtures Explained | https://docs.pytest.org/en/stable/fixture.html |

## 🔗 Related Day Resources

| Day | Topic | Link |
|-----|-------|------|
| Day 100 | Background Tasks | [Resource](./day-100-resources.md) |
| Day 101 | Alembic Migrations | [Resource](./day-101-resources.md) |
| Day 102 | Testing FastAPI | Current |
| Day 103 | Deployment & DevOps | Coming Soon |

