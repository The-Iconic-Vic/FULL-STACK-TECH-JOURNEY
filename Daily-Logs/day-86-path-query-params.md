# 📅 Day 86: Path & Query Parameters

**Date:** June 23, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Path Parameters, Query Parameters, Validation, Optional Parameters, Parameter Order

---

## 📋 Learning Objectives

- ✅ Use path parameters with type hints and validation
- ✅ Understand route order (static before dynamic)
- ✅ Handle query parameters with defaults
- ✅ Use optional and required query parameters
- ✅ Combine path and query parameters
- ✅ Validate parameters with Path() and Query()

---

## 🎯 Part 1: Path Parameters

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
| `uuid` | `/files/{file_id}` | `/files/550e8400-e29b-41d4-a716-446655440000` |

### Type Hints for Validation

```python
# String parameter
@app.get("/users/{username}")
async def get_user(username: str):
    return {"username": username}

# Integer parameter (auto-validated)
@app.get("/items/{item_id}")
async def get_item(item_id: int):
    return {"item_id": item_id}

# Float parameter
@app.get("/products/{price}")
async def get_product(price: float):
    return {"price": price}
```

### Route Order Matters

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

Query parameters are key-value pairs in the URL after the `?` symbol. They are optional and used for filtering, sorting, and pagination.

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

### Complex Example

```python
@app.get("/users/{user_id}/posts")
async def get_user_posts(
    user_id: int,              # Path parameter
    limit: int = 10,           # Query parameter
    offset: int = 0,           # Query parameter
    sort: str = "newest",      # Query parameter
    include_deleted: bool = False  # Query parameter
):
    return {
        "user_id": user_id,
        "limit": limit,
        "offset": offset,
        "sort": sort,
        "include_deleted": include_deleted
    }
```

---

## 🏗️ Part 4: Complete Search API Implementation

```python
# app/main.py
"""
Search API with Path & Query Parameters
"""

from fastapi import FastAPI, Path, Query
from typing import Optional
from datetime import datetime

app = FastAPI(
    title="Search API",
    description="API demonstrating path and query parameters",
    version="1.0.0"
)

# Mock database
mock_posts = [
    {"id": 1, "title": "First Post", "category": "tech", "author": "John"},
    {"id": 2, "title": "Second Post", "category": "science", "author": "Jane"},
    {"id": 3, "title": "Third Post", "category": "tech", "author": "John"},
    {"id": 4, "title": "Fourth Post", "category": "art", "author": "Bob"},
    {"id": 5, "title": "Fifth Post", "category": "science", "author": "Jane"},
]

# ============================================
# Root Endpoint
# ============================================

@app.get("/")
async def root():
    return {
        "message": "Search API",
        "endpoints": {
            "/users/me": "Get current user (static route)",
            "/users/{user_id}": "Get user by ID",
            "/users/{user_id}/posts": "Get user posts with pagination",
            "/items/": "List items with pagination",
            "/products/{product_id}": "Get product details",
            "/posts/{post_id}": "Get post with format option",
            "/search/": "Search with filters"
        }
    }

# ============================================
# Static Route (must come before dynamic)
# ============================================

@app.get("/users/me")
async def get_current_user():
    """Static route example - gets current user."""
    return {"user": "current_user", "name": "Current User"}

# ============================================
# Path Parameters with Validation
# ============================================

@app.get("/users/{user_id}")
async def get_user(
    user_id: int = Path(..., gt=0, le=1000, description="User ID must be between 1 and 1000")
):
    """Get user by ID with validation."""
    return {"user_id": user_id, "name": f"User {user_id}"}

@app.get("/users/{user_id}/posts")
async def get_user_posts(
    user_id: int = Path(..., gt=0, description="User ID"),
    limit: int = Query(10, ge=1, le=100, description="Number of posts to return"),
    offset: int = Query(0, ge=0, description="Number of posts to skip")
):
    """Get posts by user with pagination."""
    filtered = [p for p in mock_posts if p["id"] % 2 == 0]  # Mock filter
    paginated = filtered[offset:offset + limit]
    return {
        "user_id": user_id,
        "total": len(filtered),
        "limit": limit,
        "offset": offset,
        "posts": paginated
    }

# ============================================
# Query Parameters with Validation
# ============================================

@app.get("/items/")
async def list_items(
    skip: int = Query(0, ge=0, description="Number of items to skip"),
    limit: int = Query(10, ge=1, le=100, description="Number of items to return"),
    q: Optional[str] = Query(None, min_length=3, max_length=50, description="Search query")
):
    """List items with pagination and search."""
    items = [{"id": i, "name": f"Item {i}"} for i in range(1, 101)]
    
    if q:
        items = [item for item in items if q.lower() in item["name"].lower()]
    
    return {
        "total": len(items),
        "skip": skip,
        "limit": limit,
        "items": items[skip:skip + limit],
        "query": q
    }

# ============================================
# Mixing Path & Query Parameters
# ============================================

@app.get("/products/{product_id}")
async def get_product(
    product_id: int = Path(..., gt=0, description="Product ID"),
    include_details: bool = Query(False, description="Include product details"),
    currency: str = Query("USD", min_length=3, max_length=3, description="Currency code")
):
    """Get product details with options."""
    return {
        "product_id": product_id,
        "name": f"Product {product_id}",
        "price": 99.99,
        "currency": currency,
        "include_details": include_details,
        "details": {
            "description": "Product description",
            "stock": 50
        } if include_details else None
    }

# ============================================
# Search Endpoint with Multiple Query Params
# ============================================

@app.get("/search/")
async def search(
    q: str = Query(..., min_length=1, max_length=100, description="Search query"),
    category: Optional[str] = Query(None, min_length=2, description="Filter by category"),
    sort: str = Query("relevance", pattern="^(relevance|date|title)$", description="Sort order"),
    limit: int = Query(10, ge=1, le=50, description="Results per page")
):
    """Search with multiple filters."""
    results = [p for p in mock_posts if q.lower() in p["title"].lower()]
    
    if category:
        results = [r for r in results if r["category"] == category]
    
    if sort == "date":
        # Mock sorting
        pass
    elif sort == "title":
        results = sorted(results, key=lambda x: x["title"])
    
    return {
        "query": q,
        "category": category,
        "sort": sort,
        "limit": limit,
        "total": len(results),
        "results": results[:limit]
    }

# ============================================
# Additional - Post with Optional Format
# ============================================

@app.get("/posts/{post_id}")
async def get_post(
    post_id: int = Path(..., gt=0, description="Post ID"),
    format: Optional[str] = Query(None, pattern="^(json|html|xml)$", description="Response format")
):
    """Get a post with optional format parameter."""
    post = next((p for p in mock_posts if p["id"] == post_id), None)
    
    if not post:
        return {"error": "Post not found"}, 404
    
    if format == "html":
        return {"format": "html", "content": f"<html><body><h1>{post['title']}</h1></body></html>"}
    elif format == "xml":
        return {"format": "xml", "content": f"<post><title>{post['title']}</title></post>"}
    else:
        return {"format": "json", "post": post}

# ============================================
# Health Check
# ============================================

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
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

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Static route not working | Placed after dynamic route | Move static route before dynamic |
| Validation error | Value outside constraints | Check `gt`, `lt`, `min_length` values |
| Optional param error | Missing `None` default | Use `param: str | None = None` |
| Wrong parameter type | Path expects different type | Match URL value to parameter type |
| Query param not recognized | Missing `?` in URL | URL should be `/items/?q=test` |

---

## ✅ Day 86 Checklist

- [ ] Understand path parameters with type hints
- [ ] Use `Path()` for validation
- [ ] Understand route order (static before dynamic)
- [ ] Use query parameters with defaults
- [ ] Handle optional query parameters
- [ ] Validate query parameters with `Query()`
- [ ] Combine path and query parameters
- [ ] Build search API with multiple filters
- [ ] Test all endpoints with browser/curl
- [ ] Visit `/docs` for interactive documentation
- [ ] Push code to GitHub

