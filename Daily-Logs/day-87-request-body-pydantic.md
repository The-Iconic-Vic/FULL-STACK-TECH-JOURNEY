# 📅 Day 87: Request Body & Pydantic Models

**Date:** June 24, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Pydantic Models, Request Body Validation, POST, PUT, PATCH Endpoints, Nested Models

---

## 📋 Learning Objectives

- ✅ Define Pydantic models with `BaseModel`
- ✅ Use different field types: str, int, float, bool, list, Optional
- ✅ Add validation with `Field()`
- ✅ Handle request bodies in POST endpoints
- ✅ Implement PUT and PATCH endpoints
- ✅ Use `response_model` for response validation
- ✅ Create nested models

---

## 🎯 Part 1: Pydantic Models

### What is Pydantic?

Pydantic is a data validation library for Python that uses Python type hints to validate and serialize data. It's the foundation of FastAPI's request/response handling.

### Why Pydantic?

| Benefit | Description |
|---------|-------------|
| **Type Safety** | Uses Python type hints |
| **Validation** | Automatic validation of incoming data |
| **Serialization** | Convert objects to/from JSON |
| **Editor Support** | Full IDE autocomplete |
| **Performance** | Fast validation using Rust |

### Basic Model

```python
from pydantic import BaseModel

class ItemCreate(BaseModel):
    name: str
    price: float
    description: str | None = None
    tags: list[str] = []
```

### Field Types

| Type | Python Type | Example |
|------|-------------|---------|
| String | `str` | `name: str` |
| Integer | `int` | `age: int` |
| Float | `float` | `price: float` |
| Boolean | `bool` | `is_active: bool` |
| Optional | `Optional[type]` | `description: Optional[str] = None` |
| List | `list[type]` | `tags: list[str] = []` |
| Dict | `dict[str, type]` | `metadata: dict[str, Any] = {}` |

### Validation with Field()

```python
from pydantic import BaseModel, Field

class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Item name")
    price: float = Field(..., gt=0, description="Item price")
    description: str | None = Field(None, max_length=500, description="Item description")
    tags: list[str] = Field(default=[], max_items=10, description="Item tags")
```

### Field Validation Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `...` | Required field | `Field(...)` |
| `default` | Default value | `Field(default=0)` |
| `min_length` | Minimum string length | `min_length=1` |
| `max_length` | Maximum string length | `max_length=100` |
| `gt` | Greater than | `gt=0` |
| `ge` | Greater than or equal | `ge=0` |
| `lt` | Less than | `lt=100` |
| `le` | Less than or equal | `le=100` |
| `description` | Field description | `description="The item name"` |
| `example` | Example value | `example="My Item"` |

---

## 📝 Part 2: Request Body

### POST Endpoint

```python
from fastapi import FastAPI, status
from pydantic import BaseModel

app = FastAPI()

class ItemCreate(BaseModel):
    name: str
    price: float
    description: str | None = None

# In-memory storage
items_db = []
item_id_counter = 1

@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemCreate):
    """Create a new item."""
    global item_id_counter
    
    new_item = {
        "id": item_id_counter,
        "name": item.name,
        "price": item.price,
        "description": item.description
    }
    
    items_db.append(new_item)
    item_id_counter += 1
    
    return new_item
```

### Request Body with Validation

```python
from pydantic import BaseModel, Field, field_validator

class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    price: float = Field(..., gt=0)
    description: str | None = Field(None, max_length=500)
    
    @field_validator('name')
    def name_must_be_proper(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.title()
```

### Accessing Request Body

```python
@app.post("/items/")
async def create_item(item: ItemCreate):
    # Access fields directly
    name = item.name
    price = item.price
    
    # Or convert to dictionary
    item_dict = item.model_dump()
    
    return {"received": item_dict}
```

---

## 🔄 Part 3: PUT and PATCH Endpoints

### PUT (Full Update)

```python
@app.put("/items/{item_id}")
async def update_item(item_id: int, item: ItemCreate):
    """Full update of an item."""
    # Find existing item
    existing_item = next((i for i in items_db if i["id"] == item_id), None)
    
    if not existing_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Update all fields
    existing_item["name"] = item.name
    existing_item["price"] = item.price
    existing_item["description"] = item.description
    
    return existing_item
```

### PATCH (Partial Update)

```python
from pydantic import BaseModel

class ItemUpdate(BaseModel):
    name: str | None = None
    price: float | None = None
    description: str | None = None

@app.patch("/items/{item_id}")
async def partially_update_item(item_id: int, item: ItemUpdate):
    """Partial update of an item."""
    existing_item = next((i for i in items_db if i["id"] == item_id), None)
    
    if not existing_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Update only fields that were provided
    update_data = item.model_dump(exclude_unset=True)
    existing_item.update(update_data)
    
    return existing_item
```

### PATCH vs PUT

| PUT | PATCH |
|-----|-------|
| Replace entire resource | Update specific fields |
| Required all fields | Fields are optional |
| If field missing, set to null | Missing fields are unchanged |
| Full replacement | Partial update |

---

## 📊 Part 4: Response Models

### Using response_model

```python
from pydantic import BaseModel

class ItemResponse(BaseModel):
    id: int
    name: str
    price: float
    description: str | None
    # Exclude internal fields

@app.post("/items/", response_model=ItemResponse)
async def create_item(item: ItemCreate):
    new_item = {
        "id": item_id_counter,
        "name": item.name,
        "price": item.price,
        "description": item.description,
        "created_at": datetime.now()  # Internal field not exposed
    }
    return new_item
```

### Response Model Options

| Option | Description |
|--------|-------------|
| `response_model` | Model for response validation |
| `response_model_exclude_unset` | Exclude unset fields |
| `response_model_include` | Include only specified fields |
| `response_model_exclude` | Exclude specified fields |

```python
@app.post("/items/", response_model=ItemResponse, response_model_exclude={"created_at"})
async def create_item(item: ItemCreate):
    return new_item
```

---

## 🏗️ Part 5: Nested Models

### Nested Pydantic Models

```python
class Address(BaseModel):
    street: str
    city: str
    zip_code: str

class User(BaseModel):
    name: str
    email: str
    address: Address  # Nested model

@app.post("/users/")
async def create_user(user: User):
    return {
        "name": user.name,
        "email": user.email,
        "address": {
            "street": user.address.street,
            "city": user.address.city,
            "zip_code": user.address.zip_code
        }
    }
```

### Nested Lists

```python
class Tag(BaseModel):
    name: str
    color: str

class ItemCreate(BaseModel):
    name: str
    tags: list[Tag]  # List of nested models

@app.post("/items/")
async def create_item(item: ItemCreate):
    return {
        "name": item.name,
        "tags": [{"name": tag.name, "color": tag.color} for tag in item.tags]
    }
```

---

## 🏗️ Part 6: Complete Task Management API

### File: `app/schemas.py`

```python
"""
Pydantic models for the Task API.
"""

from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime


class TaskBase(BaseModel):
    """Base Task model with common fields."""
    title: str = Field(..., min_length=1, max_length=100, description="Task title")
    description: Optional[str] = Field(None, max_length=500, description="Task description")
    priority: str = Field(default="medium", description="Task priority (low, medium, high)")
    
    @field_validator('priority')
    def validate_priority(cls, v):
        if v not in ['low', 'medium', 'high']:
            raise ValueError('Priority must be low, medium, or high')
        return v


class TaskCreate(TaskBase):
    """Model for creating a new task."""
    pass


class TaskUpdate(BaseModel):
    """Model for updating a task (all fields optional)."""
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    priority: Optional[str] = None
    completed: Optional[bool] = None
    
    @field_validator('priority')
    def validate_priority(cls, v):
        if v and v not in ['low', 'medium', 'high']:
            raise ValueError('Priority must be low, medium, or high')
        return v


class TaskResponse(TaskBase):
    """Model for task responses (includes ID and timestamps)."""
    id: int
    completed: bool = False
    created_at: datetime
    updated_at: Optional[datetime] = None


class TaskListResponse(BaseModel):
    """Model for listing tasks with pagination info."""
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
Task Management API
Demonstrates: Request Body, Pydantic Models, CRUD Operations
"""

from fastapi import FastAPI, HTTPException, status, Query
from datetime import datetime
from typing import Optional
from .schemas import (
    TaskCreate,
    TaskUpdate,
    TaskResponse,
    TaskListResponse,
    MessageResponse
)

app = FastAPI(
    title="Task Management API",
    description="A complete task management API with Pydantic models",
    version="1.0.0"
)

# In-memory database
tasks_db = []
task_id_counter = 1


# ============================================
# Health Check
# ============================================

@app.get("/health", response_model=MessageResponse)
async def health_check():
    """Health check endpoint."""
    return {
        "message": "API is healthy",
        "details": {
            "status": "active",
            "timestamp": datetime.now().isoformat()
        }
    }


# ============================================
# Create Task (POST)
# ============================================

@app.post("/tasks/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(task: TaskCreate):
    """Create a new task."""
    global task_id_counter
    
    new_task = {
        "id": task_id_counter,
        "title": task.title,
        "description": task.description,
        "priority": task.priority,
        "completed": False,
        "created_at": datetime.now(),
        "updated_at": None
    }
    
    tasks_db.append(new_task)
    task_id_counter += 1
    
    return new_task


# ============================================
# List Tasks (GET)
# ============================================

@app.get("/tasks/", response_model=TaskListResponse)
async def list_tasks(
    skip: int = Query(0, ge=0, description="Number of tasks to skip"),
    limit: int = Query(10, ge=1, le=100, description="Number of tasks to return"),
    completed: Optional[bool] = Query(None, description="Filter by completion status"),
    priority: Optional[str] = Query(None, description="Filter by priority")
):
    """List all tasks with pagination and filtering."""
    filtered_tasks = tasks_db.copy()
    
    if completed is not None:
        filtered_tasks = [t for t in filtered_tasks if t["completed"] == completed]
    
    if priority:
        filtered_tasks = [t for t in filtered_tasks if t["priority"] == priority]
    
    total = len(filtered_tasks)
    paginated = filtered_tasks[skip:skip + limit]
    
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "tasks": paginated
    }


# ============================================
# Get Single Task (GET)
# ============================================

@app.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(task_id: int):
    """Get a single task by ID."""
    task = next((t for t in tasks_db if t["id"] == task_id), None)
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found"
        )
    
    return task


# ============================================
# Update Task (PUT)
# ============================================

@app.put("/tasks/{task_id}", response_model=TaskResponse)
async def update_task(task_id: int, task_update: TaskCreate):
    """Full update of a task."""
    task = next((t for t in tasks_db if t["id"] == task_id), None)
    
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


# ============================================
# Partial Update (PATCH)
# ============================================

@app.patch("/tasks/{task_id}", response_model=TaskResponse)
async def partially_update_task(task_id: int, task_update: TaskUpdate):
    """Partial update of a task (only provided fields)."""
    task = next((t for t in tasks_db if t["id"] == task_id), None)
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found"
        )
    
    update_data = task_update.model_dump(exclude_unset=True)
    task.update(update_data)
    task["updated_at"] = datetime.now()
    
    return task


# ============================================
# Delete Task (DELETE)
# ============================================

@app.delete("/tasks/{task_id}", response_model=MessageResponse)
async def delete_task(task_id: int):
    """Delete a task by ID."""
    task = next((t for t in tasks_db if t["id"] == task_id), None)
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found"
        )
    
    tasks_db.remove(task)
    
    return {
        "message": f"Task '{task['title']}' deleted successfully",
        "details": {"id": task_id}
    }


# ============================================
# Error Handler
# ============================================

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {
        "error": True,
        "status_code": exc.status_code,
        "detail": exc.detail,
        "timestamp": datetime.now().isoformat()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
```

### Sample API Requests

```bash
# Create a task
curl -X POST http://localhost:8000/tasks/ \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn FastAPI", "description": "Complete the FastAPI tutorial", "priority": "high"}'

# List tasks
curl http://localhost:8000/tasks/

# Get a task
curl http://localhost:8000/tasks/1

# Update a task
curl -X PUT http://localhost:8000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn FastAPI Advanced", "description": "Master FastAPI", "priority": "high"}'

# Partial update
curl -X PATCH http://localhost:8000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:8000/tasks/1
```

---

## 📊 Quick Reference

### Pydantic Field Types

| Type | Python | Example |
|------|--------|---------|
| String | `str` | `name: str` |
| Integer | `int` | `age: int` |
| Float | `float` | `price: float` |
| Boolean | `bool` | `active: bool` |
| Optional | `Optional[type]` | `desc: Optional[str] = None` |
| List | `list[type]` | `tags: list[str] = []` |

### HTTP Methods for CRUD

| Operation | Method | Status Code |
|-----------|--------|-------------|
| Create | POST | 201 Created |
| Read | GET | 200 OK |
| Update (full) | PUT | 200 OK |
| Update (partial) | PATCH | 200 OK |
| Delete | DELETE | 200 OK / 204 No Content |

### model_dump() Methods

| Method | Description |
|--------|-------------|
| `.model_dump()` | Convert to dict (all fields) |
| `.model_dump(exclude_unset=True)` | Exclude unset fields |
| `.model_dump(include={...})` | Include only specific fields |
| `.model_dump(exclude={...})` | Exclude specific fields |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Validation error | Invalid field value | Check Field constraints (gt, min_length) |
| 422 Unprocessable Entity | Missing required field | Ensure all required fields are provided |
| 404 Not Found | Item doesn't exist | Check ID before operation |
| PATCH not updating | Wrong `exclude_unset` | Use `model_dump(exclude_unset=True)` |
| Nested model error | Invalid nested structure | Match nested model structure |

---

## ✅ Day 87 Checklist

- [ ] Create Pydantic models with BaseModel
- [ ] Use different field types: str, int, float, bool, Optional, list
- [ ] Add validation with Field()
- [ ] Create POST endpoint with request body
- [ ] Create PUT endpoint for full updates
- [ ] Create PATCH endpoint for partial updates
- [ ] Use response_model for responses
- [ ] Create nested models
- [ ] Add custom validators
- [ ] Test all endpoints with curl/Postman
- [ ] Visit `/docs` for interactive documentation
- [ ] Push code to GitHub

