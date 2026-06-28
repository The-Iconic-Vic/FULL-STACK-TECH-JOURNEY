# 📘 Week 13 Review: FastAPI Fundamentals

## 🎯 Week 13 Overview

This week covered building REST APIs with FastAPI, including routing, validation, database integration, and production-ready patterns. FastAPI is a modern, high-performance web framework for building APIs with Python.

---

## 📁 Day 85: FastAPI Introduction

### Core Concepts

| Concept | Description |
|---------|-------------|
| **FastAPI** | Modern web framework for APIs |
| **ASGI Server** | Uvicorn runs the application |
| **Type Hints** | Drive validation and documentation |
| **Automatic Docs** | Swagger UI at `/docs` |

### Quick Reference

```python
from fastapi import FastAPI

app = FastAPI(title="My API", version="1.0.0")

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Run: uvicorn main:app --reload
# Docs: http://localhost:8000/docs
```

### Key Features

| Feature | Benefit |
|---------|---------|
| **High Performance** | On par with NodeJS and Go |
| **Fast Development** | 200-300% faster development |
| **Automatic Docs** | OpenAPI/Swagger built-in |
| **Type Hints** | Editor support and validation |
| **Async Support** | Native async/await |

---

## 📁 Day 86: Path & Query Parameters

### Path Parameters

```python
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id}

# With validation
@app.get("/items/{item_id}")
async def get_item(
    item_id: int = Path(..., gt=0, description="Item ID")
):
    return {"item_id": item_id}
```

### Query Parameters

```python
@app.get("/items/")
async def list_items(
    skip: int = 0,
    limit: int = 10,
    q: str | None = None
):
    return {"skip": skip, "limit": limit, "q": q}
```

### Route Order

```python
# ✅ Static route first
@app.get("/users/me")
async def get_current_user():
    return {"user": "current"}

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id}
```

---

## 📁 Day 87: Request Body & Pydantic Models

### Pydantic Models

```python
from pydantic import BaseModel, Field

class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    price: float = Field(..., gt=0)
    description: str | None = Field(None, max_length=500)

class ItemResponse(BaseModel):
    id: int
    name: str
    price: float
    description: str | None
```

### Endpoints

```python
@app.post("/items/", status_code=201, response_model=ItemResponse)
async def create_item(item: ItemCreate):
    return {"id": 1, "name": item.name, "price": item.price}

@app.put("/items/{item_id}", response_model=ItemResponse)
async def update_item(item_id: int, item: ItemCreate):
    return {"id": item_id, "name": item.name, "price": item.price}
```

---

## 📁 Day 88: Response Models & Status Codes

### Response Models

```python
@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    return user

# Filter fields
@app.get("/users/{user_id}", response_model=UserResponse, response_model_exclude={"password"})
async def get_user(user_id: int):
    return user
```

### Status Codes

```python
from fastapi import status

@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemCreate):
    return new_item

@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int):
    return
```

### Error Handling

```python
from fastapi import HTTPException

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

## 📁 Day 89: Dependencies & Middleware

### Dependencies

```python
from fastapi import Depends

def pagination(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

@app.get("/items/")
async def get_items(pagination: dict = Depends(pagination)):
    return pagination
```

### Authentication

```python
from fastapi.security import HTTPBearer

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    if token != "valid":
        raise HTTPException(401, "Invalid token")
    return {"user": "authenticated"}

@app.get("/protected/")
async def protected_route(user: dict = Depends(verify_token)):
    return user
```

### Middleware

```python
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = time.time() - start
    print(f"{request.method} {request.url.path} - {duration:.2f}s")
    return response

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📁 Day 90: Database Integration

### Database Setup

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### Models

```python
from sqlalchemy import Column, Integer, String, Boolean, DateTime

class Todo(Base):
    __tablename__ = "todos"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    completed = Column(Boolean, default=False)
```

### CRUD Operations

```python
def create_todo(db: Session, todo: TodoCreate):
    db_todo = Todo(title=todo.title)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_todos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Todo).offset(skip).limit(limit).all()

def get_todo(db: Session, todo_id: int):
    return db.query(Todo).filter(Todo.id == todo_id).first()
```

---

## 📊 Quick Reference

### HTTP Methods

| Operation | Method | Status Code |
|-----------|--------|-------------|
| Create | POST | 201 Created |
| List | GET | 200 OK |
| Get Single | GET | 200 OK |
| Update | PUT | 200 OK |
| Partial Update | PATCH | 200 OK |
| Delete | DELETE | 204 No Content |

### Parameter Types

| Location | Syntax | Example |
|----------|--------|---------|
| Path | `/{param}` | `/users/{id}` |
| Query | `?key=value` | `?skip=0&limit=10` |
| Body | `item: ItemCreate` | POST/PUT body |

### Common Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Success |
| 201 | Created | POST success |
| 204 | No Content | DELETE success |
| 400 | Bad Request | Invalid input |
| 404 | Not Found | Resource missing |
| 409 | Conflict | Duplicate resource |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **FastAPI uses type hints** | Drives validation and documentation |
| **Path params use `{}`** | `/users/{user_id}` |
| **Query params after `?`** | `?skip=0&limit=10` |
| **Pydantic for validation** | `BaseModel` with `Field()` |
| **response_model filters data** | Control what's returned |
| **HTTPException for errors** | Raise with status codes |
| **Depends() for dependencies** | Reusable injection |
| **Middleware runs before requests** | Logging, CORS, auth |
| **SQLAlchemy ORM** | Database interaction |
| **Session for transactions** | `db.add()`, `db.commit()` |

