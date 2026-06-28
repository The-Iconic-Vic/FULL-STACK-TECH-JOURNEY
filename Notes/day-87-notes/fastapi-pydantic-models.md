# 📘 FastAPI Request Body & Pydantic Models

## 🎯 What is Pydantic?

Pydantic is a data validation library for Python that uses Python type hints to validate and serialize data. It's the foundation of FastAPI's request/response handling, providing automatic validation, serialization, and documentation.

### Key Benefits

| Benefit | Description |
|---------|-------------|
| **Type Safety** | Leverages Python type hints |
| **Automatic Validation** | Validates incoming data against schemas |
| **Serialization** | Convert between Python objects and JSON |
| **IDE Support** | Full autocomplete and type checking |
| **Performance** | Fast validation using Rust-based core |

---

## 📝 Part 1: Pydantic Models

### Basic Model Definition

```python
from pydantic import BaseModel

class ItemCreate(BaseModel):
    name: str
    price: float
    description: str | None = None
    tags: list[str] = []
```

### Common Field Types

| Type | Python Type | Example |
|------|-------------|---------|
| String | `str` | `name: str` |
| Integer | `int` | `age: int` |
| Float | `float` | `price: float` |
| Boolean | `bool` | `is_active: bool` |
| Optional | `Optional[type]` | `description: Optional[str] = None` |
| List | `list[type]` | `tags: list[str] = []` |
| Dict | `dict[str, type]` | `metadata: dict[str, Any] = {}` |
| Date | `datetime` | `created_at: datetime` |

### Validation with Field()

```python
from pydantic import BaseModel, Field

class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Item name")
    price: float = Field(..., gt=0, description="Item price")
    description: str | None = Field(None, max_length=500)
    tags: list[str] = Field(default=[], max_items=10)
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
| `pattern` | Regex pattern | `pattern="^[a-zA-Z]+$"` |
| `description` | Field description | `description="The item name"` |

### Custom Validators

```python
from pydantic import BaseModel, field_validator

class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    price: float = Field(..., gt=0)
    
    @field_validator('name')
    def name_must_be_proper(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.title()
    
    @field_validator('price')
    def price_must_be_reasonable(cls, v):
        if v > 1000000:
            raise ValueError('Price too high!')
        return v
```

---

## 📨 Part 2: Request Body

### POST Endpoint with Request Body

```python
from fastapi import FastAPI, status

app = FastAPI()

@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemCreate):
    # item is validated automatically
    new_item = {
        "id": 1,
        "name": item.name,
        "price": item.price,
        "description": item.description,
        "tags": item.tags
    }
    return new_item
```

### Accessing Request Body Data

```python
@app.post("/items/")
async def create_item(item: ItemCreate):
    # Access fields directly
    name = item.name
    price = item.price
    
    # Convert to dictionary
    item_dict = item.model_dump()
    
    # Convert to dictionary excluding unset fields
    item_dict = item.model_dump(exclude_unset=True)
    
    return {"received": item_dict}
```

---

## 🔄 Part 3: PUT and PATCH Endpoints

### PUT (Full Update)

```python
@app.put("/items/{item_id}")
async def update_item(item_id: int, item: ItemCreate):
    existing_item = get_item_by_id(item_id)
    if not existing_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Replace all fields
    existing_item.name = item.name
    existing_item.price = item.price
    existing_item.description = item.description
    existing_item.tags = item.tags
    
    return existing_item
```

### PATCH (Partial Update)

```python
class ItemUpdate(BaseModel):
    name: str | None = None
    price: float | None = None
    description: str | None = None
    tags: list[str] | None = None

@app.patch("/items/{item_id}")
async def partially_update_item(item_id: int, item: ItemUpdate):
    existing_item = get_item_by_id(item_id)
    if not existing_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Update only fields that were provided
    update_data = item.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(existing_item, key, value)
    
    return existing_item
```

### PUT vs PATCH

| PUT | PATCH |
|-----|-------|
| Replaces entire resource | Updates specific fields |
| All fields required | Fields are optional |
| Missing fields become null/empty | Missing fields unchanged |
| Full replacement | Partial update |

---

## 📊 Part 4: Response Models

### Using response_model

```python
class ItemResponse(BaseModel):
    id: int
    name: str
    price: float
    description: str | None
    # Exclude internal fields like created_at, updated_at

@app.post("/items/", response_model=ItemResponse)
async def create_item(item: ItemCreate):
    new_item = {
        "id": 1,
        "name": item.name,
        "price": item.price,
        "description": item.description,
        "created_at": datetime.now(),  # Internal field
        "updated_at": None             # Internal field
    }
    return new_item  # Only fields in ItemResponse are returned
```

### Response Model Options

| Option | Description | Example |
|--------|-------------|---------|
| `response_model` | Model for response | `response_model=ItemResponse` |
| `response_model_exclude_unset` | Exclude unset fields | `response_model_exclude_unset=True` |
| `response_model_include` | Include only specified fields | `response_model_include={"id", "name"}` |
| `response_model_exclude` | Exclude specified fields | `response_model_exclude={"created_at"}` |

```python
# Only return id and name
@app.get("/items/{item_id}", response_model=ItemResponse, response_model_include={"id", "name"})
async def get_item(item_id: int):
    return get_item_by_id(item_id)
```

---

## 🏗️ Part 5: Nested Models

### Nested Models

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

## 📊 Quick Reference

### HTTP Methods for CRUD

| Operation | Method | Status Code |
|-----------|--------|-------------|
| Create | POST | 201 Created |
| Read (list) | GET | 200 OK |
| Read (single) | GET | 200 OK |
| Update (full) | PUT | 200 OK |
| Update (partial) | PATCH | 200 OK |
| Delete | DELETE | 200 OK / 204 No Content |

### model_dump() Methods

| Method | Description |
|--------|-------------|
| `.model_dump()` | Convert to dict (all fields) |
| `.model_dump(exclude_unset=True)` | Exclude fields not set |
| `.model_dump(include={...})` | Include only specific fields |
| `.model_dump(exclude={...})` | Exclude specific fields |

### Pydantic Model Methods

| Method | Description |
|--------|-------------|
| `.model_dump()` | Convert to dictionary |
| `.model_dump_json()` | Convert to JSON string |
| `.model_copy()` | Create a copy |
| `.model_validate()` | Validate data |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Validation error | Invalid field value | Check Field constraints (gt, min_length) |
| 422 Unprocessable Entity | Missing required field | Ensure all required fields are provided |
| 404 Not Found | Item doesn't exist | Check ID before operation |
| PATCH not updating | Wrong model_dump usage | Use `model_dump(exclude_unset=True)` |
| Nested model error | Invalid nested structure | Match nested model structure exactly |
| Response includes internal fields | Wrong response_model | Define proper response model |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Pydantic models define schemas** | Use BaseModel for request/response validation |
| **Field() adds validation** | min_length, max_length, gt, le, etc. |
| **POST creates resources** | Use status_code=201 for creation |
| **PUT replaces resources** | All fields required |
| **PATCH updates resources** | Only provided fields updated |
| **response_model filters data** | Control what's returned |
| **Nested models for complex data** | Use models inside models |

