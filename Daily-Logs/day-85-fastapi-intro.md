# 📅 Day 85: FastAPI Introduction & Setup

**Date:** June 22, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** FastAPI Overview, Installation, First Endpoint, Path Parameters, Automatic Docs

---

## 📋 Learning Objectives

- ✅ Understand what FastAPI is and why it's used
- ✅ Differentiate FastAPI from Flask and Django
- ✅ Install FastAPI and Uvicorn
- ✅ Create a FastAPI application
- ✅ Define GET endpoints with path parameters
- ✅ Use automatic OpenAPI documentation at `/docs`

---

## 🎯 Part 1: What is FastAPI?

### FastAPI Overview

FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.8+ based on standard Python type hints.

### Key Features

| Feature | Description |
|---------|-------------|
| **Fast** | Very high performance, on par with NodeJS and Go |
| **Fast to code** | Increase development speed by 200-300% |
| **Fewer bugs** | Reduce about 40% of human (developer) induced errors |
| **Intuitive** | Great editor support with autocomplete everywhere |
| **Easy** | Designed to be easy to use and learn |
| **Short** | Minimize code duplication |
| **Robust** | Get production-ready code with automatic interactive documentation |
| **Standards-based** | Based on OpenAPI and JSON Schema |

### FastAPI vs Flask vs Django

| Feature | FastAPI | Flask | Django |
|---------|---------|-------|--------|
| **Performance** | Very High (async) | Moderate | Moderate |
| **Async Support** | Native | Limited | Limited |
| **Automatic Docs** | Yes (OpenAPI) | No (Manual) | No (Manual) |
| **Validation** | Pydantic (fast) | Manual | Manual |
| **Batteries Included** | Minimal | Minimal | Full (admin, ORM) |
| **Learning Curve** | Moderate | Low | Steep |
| **Best For** | APIs, Microservices | Small apps, APIs | Full-stack web apps |

### Who Uses FastAPI?

| Company | Use Case |
|---------|----------|
| Netflix | Internal API tooling |
| Uber | AI and data services |
| Microsoft | Azure AI services |
| NASA | Internal APIs |
| Intel | AI tooling |

---

## 🔧 Part 2: Installation & Setup

### Installation

```bash
# Install FastAPI and Uvicorn
pip install fastapi uvicorn

# Optional: Install with all dependencies
pip install fastapi[all]
```

### Project Structure

```
day-85-greeting-api/
├── app/
│   └── main.py
├── venv/
├── requirements.txt
├── .gitignore
└── README.md
```

### requirements.txt

```
fastapi==0.110.0
uvicorn==0.29.0
```

### Running the Server

```bash
# Navigate to project directory
cd day-85-greeting-api

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Run the server
uvicorn app.main:app --reload

# Visit: http://localhost:8000
# Interactive docs: http://localhost:8000/docs
# Alternative docs: http://localhost:8000/redoc
```

### Key Server Options

| Option | Purpose |
|--------|---------|
| `--reload` | Auto-reload on code changes (development) |
| `--host 0.0.0.0` | Listen on all network interfaces |
| `--port 8080` | Use a different port |

---

## 📝 Part 3: First Endpoint

### Basic GET Endpoint

```python
# app/main.py
from fastapi import FastAPI

# Create FastAPI instance
app = FastAPI(
    title="Greeting API",
    description="A simple API that greets users",
    version="1.0.0"
)

# Root endpoint
@app.get("/")
async def root():
    """
    Root endpoint returning a welcome message.
    """
    return {"message": "Hello World"}

# Path parameter endpoint
@app.get("/hello/{name}")
async def greet(name: str):
    """
    Greet a user by name.
    
    Args:
        name: The name of the user to greet
    """
    return {"message": f"Hello, {name}!"}

# Path parameter with type validation
@app.get("/age/{birth_year}")
async def calculate_age(birth_year: int):
    """
    Calculate age from birth year.
    
    Args:
        birth_year: The user's birth year
    """
    from datetime import datetime
    current_year = datetime.now().year
    age = current_year - birth_year
    return {
        "birth_year": birth_year,
        "current_year": current_year,
        "age": age,
        "message": f"You are {age} years old"
    }

# Combined endpoint
@app.get("/greet/{name}/{birth_year}")
async def greet_with_age(name: str, birth_year: int):
    """
    Greet a user by name and calculate their age.
    
    Args:
        name: The user's name
        birth_year: The user's birth year
    """
    from datetime import datetime
    current_year = datetime.now().year
    age = current_year - birth_year
    
    return {
        "name": name,
        "birth_year": birth_year,
        "age": age,
        "message": f"Hello, {name}! You are {age} years old."
    }

# Static route (must come before dynamic routes with same prefix)
@app.get("/hello/static")
async def static_hello():
    """
    Example of a static route that's not dynamic.
    """
    return {"message": "This is a static route that doesn't use a parameter"}
```

### Endpoint Summary

| Route | Method | Parameters | Example Response |
|-------|--------|------------|------------------|
| `/` | GET | None | `{"message": "Hello World"}` |
| `/hello/{name}` | GET | `name: str` | `{"message": "Hello, Victor!"}` |
| `/age/{birth_year}` | GET | `birth_year: int` | `{"birth_year": 1998, "age": 28}` |
| `/greet/{name}/{birth_year}` | GET | `name: str, birth_year: int` | `{"name": "Victor", "age": 28}` |
| `/hello/static` | GET | None | `{"message": "This is a static route..."}` |

---

## 📚 Part 4: Automatic Documentation

### Interactive API Docs

FastAPI automatically generates interactive API documentation:

| URL | Description |
|-----|-------------|
| `http://localhost:8000/docs` | Swagger UI (interactive) |
| `http://localhost:8000/redoc` | ReDoc (alternative) |
| `http://localhost:8000/openapi.json` | Raw OpenAPI spec |

### What's Included in Docs

- All endpoints with methods
- Path parameters with types
- Request/response schemas
- Example responses
- "Try it out" functionality

### Customizing Documentation

```python
app = FastAPI(
    title="My Custom API",
    description="This is a custom API description",
    version="2.0.0",
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "API Support",
        "url": "http://example.com/support",
        "email": "support@example.com",
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
    docs_url="/api/docs",      # Custom docs URL
    redoc_url="/api/redoc",    # Custom redoc URL
    openapi_url="/api/openapi.json",  # Custom OpenAPI URL
)
```

---

## 🏗️ Part 5: Mini-Project - Complete Greeting API

```python
# app/main.py (Complete Version)
"""
Greeting API
A simple FastAPI application demonstrating basic endpoints.
"""

from fastapi import FastAPI
from datetime import datetime
from typing import Optional

# Initialize FastAPI app
app = FastAPI(
    title="Greeting API",
    description="""
    A simple greeting API that demonstrates:
    - GET endpoints
    - Path parameters
    - Type validation
    - Automatic documentation
    """,
    version="1.0.0",
    contact={
        "name": "API Support",
        "email": "support@example.com",
    },
)

# ============================================
# Root Endpoints
# ============================================

@app.get("/")
async def root():
    """Welcome to the Greeting API."""
    return {
        "message": "Welcome to the Greeting API!",
        "endpoints": {
            "/": "This welcome message",
            "/hello/{name}": "Greet a user by name",
            "/age/{birth_year}": "Calculate age from birth year",
            "/greet/{name}/{birth_year}": "Greet and calculate age",
            "/hello/static": "Static greeting example",
            "/docs": "Interactive API documentation"
        }
    }

# ============================================
# Greeting Endpoints
# ============================================

@app.get("/hello/{name}")
async def greet(name: str):
    """
    Greet a user by name.
    
    Args:
        name: The name of the user to greet
    
    Returns:
        A personalized greeting message
    """
    return {
        "message": f"Hello, {name}!",
        "name": name,
        "timestamp": datetime.now().isoformat()
    }

# ============================================
# Age Calculation Endpoints
# ============================================

@app.get("/age/{birth_year}")
async def calculate_age(birth_year: int):
    """
    Calculate a person's age from their birth year.
    
    Args:
        birth_year: The person's birth year (e.g., 1998)
    
    Returns:
        Age and related information
    """
    current_year = datetime.now().year
    age = current_year - birth_year
    
    return {
        "birth_year": birth_year,
        "current_year": current_year,
        "age": age,
        "message": f"You are {age} years old",
        "age_category": get_age_category(age)
    }

def get_age_category(age: int) -> str:
    """Helper function to categorize age."""
    if age < 0:
        return "Not born yet"
    elif age < 13:
        return "Child"
    elif age < 20:
        return "Teenager"
    elif age < 60:
        return "Adult"
    else:
        return "Senior"

# ============================================
# Combined Endpoints
# ============================================

@app.get("/greet/{name}/{birth_year}")
async def greet_with_age(name: str, birth_year: int):
    """
    Greet a user by name and calculate their age.
    
    Args:
        name: The user's name
        birth_year: The user's birth year
    
    Returns:
        Combined greeting and age information
    """
    current_year = datetime.now().year
    age = current_year - birth_year
    
    return {
        "name": name,
        "birth_year": birth_year,
        "current_year": current_year,
        "age": age,
        "age_category": get_age_category(age),
        "message": f"Hello, {name}! You are {age} years old.",
        "greeting": f"Nice to meet you, {name}!"
    }

# ============================================
# Static Routes (must come before dynamic)
# ============================================

@app.get("/hello/static")
async def static_hello():
    """
    Example of a static route that doesn't use a parameter.
    """
    return {
        "message": "This is a static route that doesn't use a parameter",
        "timestamp": datetime.now().isoformat(),
        "type": "static"
    }

# ============================================
# Additional Utility Endpoints
# ============================================

@app.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring.
    """
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/info")
async def info():
    """
    Get information about the API.
    """
    return {
        "api_name": "Greeting API",
        "version": "1.0.0",
        "description": "A simple greeting API built with FastAPI",
        "endpoints_count": 7,
        "framework": "FastAPI",
        "python_version": "3.8+"
    }

# ============================================
# Optional: Custom Error Handler
# ============================================

from fastapi import HTTPException, status

@app.get("/error-example")
async def error_example(trigger_error: bool = False):
    """
    Example of error handling.
    """
    if trigger_error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This is an example error"
        )
    return {"message": "No error triggered"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
```

---

## 📊 Quick Reference

### FastAPI Common Commands

| Command | Purpose |
|---------|---------|
| `uvicorn app.main:app --reload` | Run with auto-reload |
| `uvicorn app.main:app --host 0.0.0.0 --port 8000` | Run on all interfaces |
| `curl http://localhost:8000/hello/Victor` | Test GET endpoint |
| `python main.py` | Run from script with `__main__` |

### Common Decorators

| Decorator | Purpose |
|-----------|---------|
| `@app.get("/path")` | GET endpoint |
| `@app.post("/path")` | POST endpoint |
| `@app.put("/path")` | PUT endpoint |
| `@app.delete("/path")` | DELETE endpoint |
| `@app.patch("/path")` | PATCH endpoint |

### Parameter Types

| Type | Example | Description |
|------|---------|-------------|
| `str` | `@app.get("/{name}")` | String value |
| `int` | `@app.get("/{id}")` | Integer value |
| `float` | `@app.get("/{price}")` | Float value |
| `bool` | `@app.get("/{active}")` | Boolean value |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `ModuleNotFoundError: No module named 'fastapi'` | FastAPI not installed | `pip install fastapi` |
| `ModuleNotFoundError: No module named 'uvicorn'` | Uvicorn not installed | `pip install uvicorn` |
| Port already in use | Another process using port 8000 | Change port: `--port 8001` |
| Route not found | Static route after dynamic route | Put static routes before dynamic |
| Validation error | Wrong type in path parameter | Match parameter type in URL |

---

## ✅ Day 85 Checklist

- [ ] Understand what FastAPI is and its benefits
- [ ] Install FastAPI and Uvicorn
- [ ] Create virtual environment
- [ ] Create FastAPI application with `main.py`
- [ ] Add root GET endpoint
- [ ] Add path parameter endpoint `/hello/{name}`
- [ ] Add integer validation endpoint `/age/{birth_year}`
- [ ] Run server with `uvicorn`
- [ ] Test endpoints using browser or curl
- [ ] Visit `/docs` for interactive documentation
- [ ] Complete greeting API mini-project
- [ ] Push code to GitHub

