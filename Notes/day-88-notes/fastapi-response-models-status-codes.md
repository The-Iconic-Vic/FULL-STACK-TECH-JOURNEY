# 📘 FastAPI Response Models & Status Codes

## 🎯 Overview

Response models and status codes are essential for building well-designed APIs. They control what data is returned to clients, ensure sensitive information is never exposed, and provide clear feedback about operation outcomes.

---

## 📝 Part 1: Response Models

### What are Response Models?

Response models define the structure of data returned by API endpoints. They serve as a contract between the API and clients, ensuring consistency and type safety.

### Why Use Response Models?

| Benefit | Description |
|---------|-------------|
| **Data Filtering** | Exclude sensitive fields (passwords, internal IDs) |
| **Consistency** | Ensure responses always have the same shape |
| **Documentation** | Automatically appear in OpenAPI docs |
| **Validation** | Ensure response data is valid |

### Basic Response Model

```python
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str  # Never returned
    email: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool

@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate):
    # Internal data
    new_user = {
        "id": 1,
        "username": user.username,
        "email": user.email,
        "is_active": True,
        "password_hash": "hashed_..."  # Excluded
    }
    return new_user  # Only UserResponse fields returned
```

### Response Model Options

```python
# Exclude unset fields (only return fields that were set)
@app.get("/items/", response_model=ItemResponse, response_model_exclude_unset=True)
async def get_items():
    return items

# Include only specific fields
@app.get("/users/{user_id}", response_model=UserResponse, response_model_include={"id", "username"})
async def get_user_limited(user_id: int):
    return get_user_by_id(user_id)

# Exclude specific fields
@app.get("/users/{user_id}", response_model=UserResponse, response_model_exclude={"email", "is_active"})
async def get_user_limited(user_id: int):
    return get_user_by_id(user_id)
```

---

## 📊 Part 2: HTTP Status Codes

### Common Status Codes

| Code | Name | Description | Use Case |
|------|------|-------------|----------|
| **200** | OK | Success | GET, PUT, PATCH |
| **201** | Created | Resource created | POST |
| **204** | No Content | Success, no body | DELETE |
| **400** | Bad Request | Invalid input | Validation errors |
| **401** | Unauthorized | Authentication required | Missing/invalid token |
| **403** | Forbidden | Not authorized | Insufficient permissions |
| **404** | Not Found | Resource not found | Invalid ID |
| **409** | Conflict | Duplicate resource | Unique constraint |
| **422** | Unprocessable Entity | Validation error | Pydantic validation |
| **500** | Internal Server Error | Server error | Unexpected exceptions |

### Using Status Codes

```python
from fastapi import FastAPI, status

# 201 Created
@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemCreate):
    return {"id": 1, "name": item.name}

# 204 No Content
@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int):
    # No response body
    return

# 200 OK (default)
@app.get("/items/{item_id}")
async def get_item(item_id: int):
    return {"id": item_id, "name": "Item"}
```

### Status Code vs HTTPException

```python
# status_code - for successful responses
@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemCreate):
    return new_item

# HTTPException - for error responses
@app.get("/items/{item_id}")
async def get_item(item_id: int):
    item = db.get_item(item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item {item_id} not found"
        )
    return item
```

---

## 🚨 Part 3: Error Handling

### HTTPException

```python
from fastapi import FastAPI, HTTPException, status

@app.get("/items/{item_id}")
async def get_item(item_id: int):
    item = get_item_by_id(item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found"
        )
    return item

@app.post("/items/")
async def create_item(item: ItemCreate):
    if item.price <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Price must be greater than 0"
        )
    
    if item_exists(item.name):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Item '{item.name}' already exists"
        )
    
    return create_new_item(item)
```

### Custom Error Response Model

```python
from pydantic import BaseModel
from datetime import datetime

class ErrorResponse(BaseModel):
    error: bool = True
    status_code: int
    detail: str
    timestamp: datetime
    path: str | None = None

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "status_code": exc.status_code,
            "detail": exc.detail,
            "timestamp": datetime.now().isoformat(),
            "path": request.url.path
        }
    )
```

### Validation Error Handler

```python
from fastapi.exceptions import RequestValidationError

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": True,
            "status_code": 422,
            "detail": "Validation error",
            "errors": [
                {
                    "field": ".".join(str(loc) for loc in err["loc"]),
                    "message": err["msg"],
                    "type": err["type"]
                }
                for err in exc.errors()
            ],
            "timestamp": datetime.now().isoformat()
        }
    )
```

---

## 📊 Quick Reference

### Status Codes Summary

| Category | Codes | Description |
|----------|-------|-------------|
| Success | 200, 201, 204 | Request succeeded |
| Client Error | 400, 401, 403, 404, 409, 422 | Client sent invalid request |
| Server Error | 500 | Server encountered an error |

### Response Model Options

| Option | Description |
|--------|-------------|
| `response_model` | Model for response |
| `response_model_exclude_unset` | Exclude unset fields |
| `response_model_include` | Include only specified fields |
| `response_model_exclude` | Exclude specified fields |

### Common Status Code Constants

```python
from fastapi import status

status.HTTP_200_OK
status.HTTP_201_CREATED
status.HTTP_204_NO_CONTENT
status.HTTP_400_BAD_REQUEST
status.HTTP_401_UNAUTHORIZED
status.HTTP_403_FORBIDDEN
status.HTTP_404_NOT_FOUND
status.HTTP_409_CONFLICT
status.HTTP_422_UNPROCESSABLE_ENTITY
status.HTTP_500_INTERNAL_SERVER_ERROR
```

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Password exposed | Wrong response_model | Exclude password field |
| 422 instead of 404 | Wrong exception | Use `HTTPException` for business errors |
| Status code wrong | Using wrong constant | Use `status.HTTP_201_CREATED` |
| Validation error unclear | Missing error details | Add custom error handler |
| Internal fields exposed | No response_model | Define proper response model |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **response_model controls output** | Filters what data is returned |
| **Always exclude sensitive data** | Never expose passwords, internal IDs |
| **Use proper status codes** | 201 for creation, 204 for delete, 404 for not found |
| **HTTPException for errors** | Use for business logic errors |
| **Custom error handlers** | Make error responses consistent |
| **Status codes communicate results** | Tell clients what happened |

