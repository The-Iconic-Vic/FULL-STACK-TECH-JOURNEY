# 📘 FastAPI Path & Query Parameters

## 🎯 Overview

FastAPI provides powerful parameter handling for URLs. **Path parameters** capture values from the URL path, while **query parameters** are key-value pairs after the `?` in the URL.

---

## 📁 Part 1: Path Parameters

### What are Path Parameters?

Path parameters are variables in the URL path that capture values from the URL. They are defined using curly braces `{}` in the route.

```python
# URL pattern: /users/123
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id}
```

### Path Parameter Types

| Type | Example URL | Example Value |
|------|-------------|---------------|
| `str` | `/users/{name}` | `/users/victor` |
| `int` | `/items/{item_id}` | `/items/42` |
| `float` | `/price/{amount}` | `/price/19.99` |
| `bool` | `/active/{status}` | `/active/true` |
| `uuid` | `/files/{file_id}` | `/files/550e8400-...` |

### Route Order

Static routes must come before dynamic routes with the same prefix.

```python
# ✅ CORRECT - Static route first
@app.get("/users/me")
async def get_current_user():
    return {"user": "current user"}

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id}

# ❌ WRONG - Dynamic route catches /me as parameter
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id}

@app.get("/users/me")  # This will never be reached!
async def get_current_user():
    return {"user": "current user"}
```

### Validation with Path()

```python
from fastapi import FastAPI, Path

# Basic validation
@app.get("/items/{item_id}")
async def get_item(
    item_id: int = Path(..., description="The ID of the item", gt=0)
):
    return {"item_id": item_id}

# Multiple validations
@app.get("/users/{user_id}")
async def get_user(
    user_id: int = Path(..., gt=0, le=1000, description="User ID must be between 1 and 1000")
):
    return {"user_id": user_id}
```

### Path Validation Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `gt` | Greater than | `gt=0` |
| `ge` | Greater than or equal | `ge=1` |
| `lt` | Less than | `lt=100` |
| `le` | Less than or equal | `le=100` |
| `min_length` | Minimum string length | `min_length=3` |
| `max_length` | Maximum string length | `max_length=50` |
| `pattern` | Regex pattern | `pattern="^[a-zA-Z]+$"` |

---

## 📋 Part 2: Query Parameters

### What are Query Parameters?

Query parameters are key-value pairs in the URL after the `?` symbol. They are used for filtering, sorting, and pagination.

```python
# URL pattern: /items/?skip=0&limit=10
@app.get("/items/")
async def list_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}
```

### Required vs Optional

```python
# Required query parameter (no default)
@app.get("/search/")
async def search(q: str):
    return {"query": q}

# Optional query parameter (with default)
@app.get("/items/")
async def list_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

# Optional with None default
@app.get("/products/")
async def get_products(category: str | None = None):
    return {"category": category}
```

### Multiple Query Parameters

```python
@app.get("/items/")
async def list_items(
    skip: int = 0,
    limit: int = 10,
    q: str | None = None,
    sort: str = "asc",
    category: str | None = None
):
    return {
        "skip": skip,
        "limit": limit,
        "q": q,
        "sort": sort,
        "category": category
    }
```

### Query Parameter Types

```python
# Boolean
@app.get("/users/")
async def get_users(active_only: bool = False):
    return {"active_only": active_only}

# List
@app.get("/items/")
async def get_items(tags: list[str] = []):
    return {"tags": tags}

# Number with validation
@app.get("/products/")
async def get_products(price_min: float = 0, price_max: float = 1000):
    return {"price_min": price_min, "price_max": price_max}
```

### Validation with Query()

```python
from fastapi import FastAPI, Query

@app.get("/items/")
async def list_items(
    q: str | None = Query(None, min_length=3, max_length=50, description="Search query"),
    skip: int = Query(0, ge=0, description="Number of items to skip"),
    limit: int = Query(10, ge=1, le=100, description="Number of items to return")
):
    return {"q": q, "skip": skip, "limit": limit}
```

### Query Validation Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `min_length` | Minimum string length | `min_length=3` |
| `max_length` | Maximum string length | `max_length=50` |
| `pattern` | Regex pattern | `pattern="^[a-z]+$"` |
| `gt` | Greater than (numeric) | `gt=0` |
| `ge` | Greater than or equal | `ge=1` |
| `lt` | Less than | `lt=100` |
| `le` | Less than or equal | `le=100` |
| `deprecated` | Mark as deprecated | `deprecated=True` |

---

## 🔀 Part 3: Mixing Path & Query Parameters

```python
@app.get("/products/{product_id}")
async def get_product(
    product_id: int,           # Path parameter
    include_details: bool = False,  # Query parameter
    currency: str = "USD"      # Query parameter
):
    return {
        "product_id": product_id,
        "include_details": include_details,
        "currency": currency
    }

# URL: /products/123?include_details=true&currency=EUR
```

### Parameter Order

```python
# 1. Path parameters first
# 2. Query parameters after
@app.get("/users/{user_id}/posts")
async def get_posts(
    user_id: int,           # Path parameter
    skip: int = 0,          # Query parameter
    limit: int = 10         # Query parameter
):
    pass
```

---

## 📊 Quick Reference

### Path Parameters

| Feature | Syntax | Example |
|---------|--------|---------|
| Basic | `/{param}` | `@app.get("/users/{id}")` |
| Type hint | `param: type` | `user_id: int` |
| Validation | `Path(...)` | `user_id: int = Path(..., gt=0)` |

### Query Parameters

| Feature | Syntax | Example |
|---------|--------|---------|
| Required | `param: type` | `q: str` |
| Optional | `param: type | None = None` | `q: str | None = None` |
| Default | `param: type = default` | `limit: int = 10` |
| Validation | `Query(...)` | `limit: int = Query(10, ge=1)` |

### Common Query Parameters

| Use Case | Parameter | Example |
|----------|-----------|---------|
| Pagination | `skip`, `limit` | `?skip=0&limit=10` |
| Search | `q` | `?q=python` |
| Filtering | `category`, `status` | `?category=tech` |
| Sorting | `sort` | `?sort=desc` |
| Fields | `fields` | `?fields=id,name` |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Static route not working | Placed after dynamic route | Move static route before dynamic |
| Validation error | Value outside constraints | Check `gt`, `lt`, `min_length` values |
| Optional param error | Missing `None` default | Use `param: str | None = None` |
| Wrong parameter type | Path expects different type | Match URL value to parameter type |
| Query param not recognized | Missing `?` in URL | URL should be `/items/?q=test` |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Path params are in the URL path** | `/users/{user_id}` |
| **Query params are after `?`** | `?skip=0&limit=10` |
| **Static routes before dynamic** | `/users/me` before `/users/{id}` |
| **Use type hints for validation** | `user_id: int` auto-validates |
| **Path() for extra validation** | `gt=0`, `le=100`, `min_length=3` |
| **Query() for extra validation** | `ge=1`, `pattern="^[a-z]+$"` |
| **Optional params need defaults** | `param: str | None = None` |

