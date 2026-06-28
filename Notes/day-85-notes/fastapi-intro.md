# 📘 FastAPI Introduction & Setup

## 🎯 What is FastAPI?

FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.8+ based on standard Python type hints. It's designed to be easy to use, fast to code, and production-ready.

### Key Features

| Feature | Description |
|---------|-------------|
| **High Performance** | On par with NodeJS and Go |
| **Fast Development** | Increase speed by 200-300% |
| **Automatic Docs** | Interactive OpenAPI (Swagger) documentation |
| **Type Hints** | Leverages Python type hints for validation |
| **Async Support** | Native async/await support |
| **Data Validation** | Pydantic for automatic validation |
| **Security** | Built-in support for OAuth2, JWT, etc. |

### FastAPI vs Flask vs Django

| Aspect | FastAPI | Flask | Django |
|--------|---------|-------|--------|
| **Performance** | Very High | Moderate | Moderate |
| **Async Support** | Native | Limited | Limited |
| **Automatic Docs** | ✅ Yes | ❌ No | ❌ No |
| **Built-in Validation** | ✅ Yes (Pydantic) | ❌ No | ❌ No |
| **ORM** | None (choose your own) | None | ✅ Yes (built-in) |
| **Admin Panel** | None | None | ✅ Yes (built-in) |
| **Learning Curve** | Moderate | Low | High |
| **Best For** | Modern APIs, Microservices | Small apps | Full-stack web apps |

---

## 📦 Installation & Setup

### Installing FastAPI

```bash
# Basic installation
pip install fastapi uvicorn

# Full installation with all optional dependencies
pip install fastapi[all]
```

### Running the Server

```bash
# Basic server (auto-reload enabled)
uvicorn main:app --reload

# Custom host and port
uvicorn main:app --host 0.0.0.0 --port 8000

# Run directly from script
python main.py
```

### uvicorn Options

| Option | Purpose |
|--------|---------|
| `--reload` | Auto-restart on code changes |
| `--host` | Bind to specific host |
| `--port` | Use specific port |
| `--workers` | Number of worker processes |
| `--log-level` | Logging level (info, debug, warn, error) |

---

## 📝 FastAPI Application Structure

### Basic Application

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}
```

### FastAPI Initialization Options

```python
app = FastAPI(
    title="My API",                              # API title
    description="This is a description",         # API description
    version="1.0.0",                             # Version
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "API Support",
        "email": "support@example.com",
        "url": "http://example.com/support",
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
    docs_url="/docs",                            # Swagger UI URL
    redoc_url="/redoc",                          # ReDoc URL
    openapi_url="/openapi.json",                 # OpenAPI spec URL
)
```

### HTTP Methods

| Method | Decorator | Purpose |
|--------|-----------|---------|
| GET | `@app.get("/path")` | Retrieve data |
| POST | `@app.post("/path")` | Create data |
| PUT | `@app.put("/path")` | Update data (full) |
| PATCH | `@app.patch("/path")` | Update data (partial) |
| DELETE | `@app.delete("/path")` | Delete data |

---

## 🎯 Endpoints

### Basic GET Endpoint

```python
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items")
async def get_items():
    return {"items": ["item1", "item2"]}
```

### Path Parameters

```python
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id, "name": f"User {user_id}"}

@app.get("/items/{item_id}")
async def get_item(item_id: int):
    return {"item_id": item_id, "name": f"Item {item_id}"}
```

### Sync vs Async

```python
# Async function (recommended)
@app.get("/async")
async def async_endpoint():
    return {"message": "Async"}

# Sync function (works too)
@app.get("/sync")
def sync_endpoint():
    return {"message": "Sync"}
```

### Route Order

```python
# Static routes must come before dynamic routes
@app.get("/users/me")
async def get_current_user():
    return {"user": "current user"}

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id}

# If dynamic route comes first, /users/me would be treated as a parameter
```

---

## 📚 Automatic Documentation

### Available Documentation URLs

| URL | Description |
|-----|-------------|
| `/docs` | Swagger UI (interactive documentation) |
| `/redoc` | ReDoc (alternative documentation) |
| `/openapi.json` | Raw OpenAPI specification JSON |

### What's Included in Docs

- All endpoints with HTTP methods
- Path parameters with types
- Query parameters with types
- Request body schemas
- Response schemas
- Example requests and responses
- "Try it out" functionality

---

## 📊 Endpoint Response Types

### JSON Response

```python
@app.get("/items")
async def get_items():
    return {"items": ["item1", "item2"]}
```

### List Response

```python
@app.get("/users")
async def get_users():
    return [{"id": 1, "name": "User1"}, {"id": 2, "name": "User2"}]
```

### Single Object

```python
@app.get("/user/{user_id}")
async def get_user(user_id: int):
    return {"id": user_id, "name": f"User {user_id}"}
```

### Custom Status Code

```python
from fastapi import status

@app.get("/created", status_code=status.HTTP_201_CREATED)
async def created_example():
    return {"message": "Resource created"}
```

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `ModuleNotFoundError: No module named 'fastapi'` | FastAPI not installed | `pip install fastapi` |
| `ModuleNotFoundError: No module named 'uvicorn'` | Uvicorn not installed | `pip install uvicorn` |
| Port already in use | Another process on port 8000 | Change port with `--port 8001` |
| Route not found | Static route after dynamic route | Put static routes before dynamic |
| Type validation error | Wrong type in path | Ensure parameter matches type |
| Server not reloading | Missing `--reload` flag | Add `--reload` to command |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **FastAPI is asynchronous** | Use `async def` for endpoints |
| **Type hints drive validation** | Python type hints validate parameters |
| **Automatic docs are built-in** | `/docs` endpoint provides Swagger UI |
| **Path parameters use `{}`** | `@app.get("/users/{user_id}")` |
| **Static routes before dynamic** | `/users/me` before `/users/{id}` |
| **FastAPI is API-focused** | Not for server-side rendering |
| **Minimal boilerplate** | Less code compared to Flask |
