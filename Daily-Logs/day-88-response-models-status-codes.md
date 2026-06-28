# 📅 Day 88: Response Models & Status Codes

**Date:** June 25, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Response Models, Status Codes, HTTPException, Error Handling, Response Filtering

---

## 📋 Learning Objectives

- ✅ Use `response_model` to control returned data
- ✅ Filter sensitive data from responses
- ✅ Use proper HTTP status codes
- ✅ Handle errors with `HTTPException`
- ✅ Create custom error responses
- ✅ Use `response_model_exclude_unset`, `include`, `exclude`

---

## 🎯 Part 1: Response Models

### Why Use Response Models?

Response models control what data is returned to the client, ensuring:
- Sensitive data (passwords, internal IDs) is never exposed
- API responses are consistent and predictable
- Response structure matches documentation

```python
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    password: str  # Never returned to client
    email: EmailStr

class UserResponse(BaseModel):
    username: str
    email: str
    # password is excluded
```

### Basic Response Model

```python
from pydantic import BaseModel

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
        "password_hash": "hashed_..."  # Excluded automatically
    }
    return new_user  # Only UserResponse fields returned
```

### Response Model Options

| Option | Description | Example |
|--------|-------------|---------|
| `response_model_exclude_unset` | Exclude unset fields | `response_model_exclude_unset=True` |
| `response_model_include` | Include only specified fields | `response_model_include={"id", "name"}` |
| `response_model_exclude` | Exclude specified fields | `response_model_exclude={"password"}` |

```python
@app.get("/users/{user_id}", 
         response_model=UserResponse,
         response_model_exclude={"email", "is_active"})
async def get_user_limited(user_id: int):
    return get_user_by_id(user_id)
```

### Excluding Sensitive Data

```python
class UserCreate(BaseModel):
    username: str
    password: str = Field(..., min_length=8)
    email: EmailStr

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime

class UserInternal(UserResponse):
    password_hash: str  # Internal, never exposed to API

@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate):
    # Hash password (never stored as plain text)
    password_hash = hash_password(user.password)
    
    # Internal representation includes password_hash
    user_internal = UserInternal(
        id=1,
        username=user.username,
        email=user.email,
        created_at=datetime.now(),
        password_hash=password_hash
    )
    
    # Convert to UserResponse (password_hash excluded)
    return user_internal
```

---

## 📊 Part 2: HTTP Status Codes

### Common Status Codes

| Code | Name | Description | Use Case |
|------|------|-------------|----------|
| 200 | OK | Success | GET, PUT, PATCH |
| 201 | Created | Resource created | POST |
| 204 | No Content | Success, no body | DELETE |
| 400 | Bad Request | Invalid input | Validation errors |
| 401 | Unauthorized | Authentication required | Missing/invalid token |
| 403 | Forbidden | Not authorized | Insufficient permissions |
| 404 | Not Found | Resource not found | Invalid ID |
| 409 | Conflict | Duplicate resource | Unique constraint violation |
| 422 | Unprocessable Entity | Validation error | Pydantic validation |
| 500 | Internal Server Error | Server error | Unexpected exceptions |

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

### status_code vs HTTPException

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

### Custom Error Responses

```python
from pydantic import BaseModel

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

### Validation Error Handling

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
            "errors": exc.errors(),
            "body": exc.body
        }
    )
```

---

## 🏗️ Part 4: Complete Secure Task API

### File: `app/schemas.py`

```python
"""
Pydantic models with response filtering and validation.
"""

from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
from datetime import datetime


# ============================================
# Error Models
# ============================================

class ErrorResponse(BaseModel):
    """Standard error response model."""
    error: bool = True
    status_code: int
    detail: str
    timestamp: datetime
    path: str | None = None


# ============================================
# User Models
# ============================================

class UserCreate(BaseModel):
    """Model for user registration."""
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8, description="Must be at least 8 characters")
    email: EmailStr
    full_name: Optional[str] = None
    
    @field_validator('password')
    def validate_password(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one number')
        return v


class UserResponse(BaseModel):
    """User response model (excludes password)."""
    id: int
    username: str
    email: EmailStr
    full_name: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]


class UserInternal(UserResponse):
    """Internal user model (includes sensitive data)."""
    password_hash: str  # Never exposed in API responses


# ============================================
# Task Models
# ============================================

class TaskCreate(BaseModel):
    """Model for creating a task."""
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    priority: str = Field(default="medium", description="low, medium, or high")
    
    @field_validator('priority')
    def validate_priority(cls, v):
        if v not in ['low', 'medium', 'high']:
            raise ValueError('Priority must be low, medium, or high')
        return v


class TaskUpdate(BaseModel):
    """Model for updating a task (all fields optional)."""
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    priority: Optional[str] = None
    completed: Optional[bool] = None


class TaskResponse(BaseModel):
    """Task response model."""
    id: int
    title: str
    description: Optional[str]
    priority: str
    completed: bool
    created_at: datetime
    updated_at: Optional[datetime]
    owner_id: int


class TaskListResponse(BaseModel):
    """Model for listing tasks with pagination."""
    total: int
    skip: int
    limit: int
    tasks: list[TaskResponse]


class MessageResponse(BaseModel):
    """Generic message response model."""
    message: str
    details: Optional[dict] = None
```

### File: `app/main.py`

```python
"""
Secure Task API
Demonstrates: Response models, Status codes, Error handling
"""

from fastapi import FastAPI, HTTPException, status, Query
from datetime import datetime
from typing import Optional
from .schemas import (
    UserCreate,
    UserResponse,
    TaskCreate,
    TaskUpdate,
    TaskResponse,
    TaskListResponse,
    MessageResponse,
    ErrorResponse
)
import bcrypt

app = FastAPI(
    title="Secure Task API",
    description="API with proper response models and error handling",
    version="1.0.0",
    openapi_tags=[
        {"name": "users", "description": "User operations"},
        {"name": "tasks", "description": "Task operations"},
    ]
)

# In-memory databases
users_db = {}
tasks_db = {}
task_id_counter = 1
user_id_counter = 1


# ============================================
# Error Handlers
# ============================================

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    from fastapi.responses import JSONResponse
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


# ============================================
# User Endpoints
# ============================================

@app.post("/users/", 
          response_model=UserResponse, 
          status_code=status.HTTP_201_CREATED,
          tags=["users"])
async def create_user(user: UserCreate):
    """Create a new user."""
    global user_id_counter
    
    # Check if username already exists
    if user.username in users_db:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Username '{user.username}' is already taken"
        )
    
    # Check if email already exists
    if any(u["email"] == user.email for u in users_db.values()):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Email '{user.email}' is already registered"
        )
    
    # Hash password
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(user.password.encode('utf-8'), salt).decode('utf-8')
    
    # Create user
    new_user = {
        "id": user_id_counter,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "is_active": True,
        "created_at": datetime.now(),
        "updated_at": None,
        "password_hash": password_hash
    }
    
    users_db[user.username] = new_user
    user_id_counter += 1
    
    return new_user


@app.get("/users/{username}", 
         response_model=UserResponse,
         tags=["users"])
async def get_user(username: str):
    """Get a user by username."""
    user = users_db.get(username)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User '{username}' not found"
        )
    
    return user


# ============================================
# Task Endpoints
# ============================================

@app.post("/tasks/", 
          response_model=TaskResponse, 
          status_code=status.HTTP_201_CREATED,
          tags=["tasks"])
async def create_task(task: TaskCreate, username: str = "default_user"):
    """Create a new task."""
    global task_id_counter
    
    user = users_db.get(username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User '{username}' not found"
        )
    
    new_task = {
        "id": task_id_counter,
        "title": task.title,
        "description": task.description,
        "priority": task.priority,
        "completed": False,
        "created_at": datetime.now(),
        "updated_at": None,
        "owner_id": user["id"]
    }
    
    tasks_db[task_id_counter] = new_task
    task_id_counter += 1
    
    return new_task


@app.get("/tasks/", 
         response_model=TaskListResponse,
         tags=["tasks"])
async def list_tasks(
    skip: int = Query(0, ge=0, description="Number of tasks to skip"),
    limit: int = Query(10, ge=1, le=100, description="Number of tasks to return"),
    completed: Optional[bool] = Query(None, description="Filter by completion status"),
    priority: Optional[str] = Query(None, description="Filter by priority")
):
    """List tasks with pagination and filtering."""
    tasks = list(tasks_db.values())
    
    if completed is not None:
        tasks = [t for t in tasks if t["completed"] == completed]
    
    if priority:
        tasks = [t for t in tasks if t["priority"] == priority]
    
    total = len(tasks)
    paginated = tasks[skip:skip + limit]
    
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "tasks": paginated
    }


@app.get("/tasks/{task_id}", 
         response_model=TaskResponse,
         tags=["tasks"])
async def get_task(task_id: int):
    """Get a task by ID."""
    task = tasks_db.get(task_id)
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found"
        )
    
    return task


@app.put("/tasks/{task_id}", 
         response_model=TaskResponse,
         tags=["tasks"])
async def update_task(task_id: int, task_update: TaskCreate):
    """Full update of a task."""
    task = tasks_db.get(task_id)
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found"
        )
    
    task["title"] = task_update.title
    task["description"] = task_update.description
    task["priority"] = task_update.priority
    task["updated_at"] = datetime.now()
    
    return task


@app.patch("/tasks/{task_id}", 
           response_model=TaskResponse,
           tags=["tasks"])
async def partially_update_task(task_id: int, task_update: TaskUpdate):
    """Partial update of a task."""
    task = tasks_db.get(task_id)
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found"
        )
    
    update_data = task_update.model_dump(exclude_unset=True)
    task.update(update_data)
    task["updated_at"] = datetime.now()
    
    return task


@app.delete("/tasks/{task_id}", 
            status_code=status.HTTP_204_NO_CONTENT,
            tags=["tasks"])
async def delete_task(task_id: int):
    """Delete a task by ID."""
    if task_id not in tasks_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found"
        )
    
    del tasks_db[task_id]
    return  # 204 No Content has no response body


# ============================================
# Health Check
# ============================================

@app.get("/health", 
         response_model=MessageResponse,
         tags=["health"])
async def health_check():
    """Health check endpoint."""
    return {
        "message": "API is healthy",
        "details": {
            "status": "active",
            "users": len(users_db),
            "tasks": len(tasks_db),
            "timestamp": datetime.now().isoformat()
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
```

### File: `app/errors.py`

```python
"""
Custom error handling and responses.
"""

from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from datetime import datetime


def setup_error_handlers(app: FastAPI):
    """Register custom error handlers."""
    
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request, exc):
        """Handle Pydantic validation errors."""
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
                "timestamp": datetime.now().isoformat(),
                "path": request.url.path
            }
        )
    
    @app.exception_handler(Exception)
    async def general_exception_handler(request, exc):
        """Handle all unhandled exceptions."""
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "error": True,
                "status_code": 500,
                "detail": "Internal server error",
                "timestamp": datetime.now().isoformat(),
                "path": request.url.path
            }
        )
    
    return app
```

---

## 📊 Quick Reference

### Status Codes

| Code | Name | Use Case |
|------|------|----------|
| 200 | OK | Success |
| 201 | Created | Resource created |
| 204 | No Content | DELETE success |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Not authorized |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable Entity | Validation error |
| 500 | Internal Server Error | Server error |

### Response Model Options

| Option | Description |
|--------|-------------|
| `response_model` | Model for response |
| `response_model_exclude_unset` | Exclude unset fields |
| `response_model_include` | Include only specified fields |
| `response_model_exclude` | Exclude specified fields |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Password exposed in response | Wrong response_model | Exclude password field |
| 422 instead of 404 | Wrong exception | Use `HTTPException` for business errors |
| Status code wrong | Using wrong constant | Use `status.HTTP_201_CREATED` |
| Validation error unclear | Missing error details | Add custom error handler |
| Internal fields exposed | No response_model | Define proper response model |

---

## ✅ Day 88 Checklist

- [ ] Define response models to filter sensitive data
- [ ] Use `response_model_exclude` to hide fields
- [ ] Use `response_model_include` to select fields
- [ ] Use proper status codes: 200, 201, 204, 400, 404, 409
- [ ] Raise `HTTPException` with appropriate status
- [ ] Create custom error response models
- [ ] Add validation error handler
- [ ] Test all endpoints with invalid data
- [ ] Visit `/docs` for interactive documentation
- [ ] Push code to GitHub

