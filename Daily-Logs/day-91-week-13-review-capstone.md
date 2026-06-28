# 📅 Day 91: Week 13 Review & Capstone

**Date:** June 28, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Week 13 Review, FastAPI Concepts, Book Management API Capstone

---

## 📋 Learning Objectives

- ✅ Review all concepts from Days 85-90
- ✅ Complete 5 practice challenges
- ✅ Build a complete Book Management API
- ✅ Apply FastAPI, Pydantic, SQLAlchemy together
- ✅ Document and share the final project

---

## 🎯 Part 1: Week 13 Concepts Summary

### Day 85: FastAPI Introduction

| Concept | Key Points |
|---------|-----------|
| **FastAPI** | Modern, fast web framework for building APIs |
| **Automatic Docs** | `/docs` endpoint provides interactive Swagger UI |
| **Uvicorn** | ASGI server for running FastAPI |
| **Async Support** | Native async/await support |

```python
# Quick reference
from fastapi import FastAPI

app = FastAPI(title="My API", version="1.0.0")

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Run: uvicorn main:app --reload
# Docs: http://localhost:8000/docs
```

### Day 86: Path & Query Parameters

| Concept | Key Points |
|---------|-----------|
| **Path Parameters** | `/{param}` in URL, captured with type hints |
| **Query Parameters** | `?key=value` after URL, optional with defaults |
| **Validation** | `Path()`, `Query()` for constraints |
| **Route Order** | Static routes before dynamic routes |

```python
# Quick reference
@app.get("/users/{user_id}")
async def get_user(
    user_id: int = Path(..., gt=0, description="User ID"),
    include_details: bool = Query(False, description="Include details")
):
    return {"user_id": user_id, "details": include_details}
```

### Day 87: Request Body & Pydantic Models

| Concept | Key Points |
|---------|-----------|
| **Pydantic Models** | `BaseModel` for request/response validation |
| **Field Types** | str, int, float, bool, Optional, list |
| **Field Validation** | `Field()` with min_length, max_length, gt, le |
| **POST/PUT/PATCH** | Request body in create/update operations |

```python
# Quick reference
from pydantic import BaseModel, Field

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    priority: str = Field(default="medium")

@app.post("/tasks/", status_code=201)
async def create_task(task: TaskCreate):
    return task
```

### Day 88: Response Models & Status Codes

| Concept | Key Points |
|---------|-----------|
| **Response Models** | Control what data is returned |
| **Status Codes** | 200, 201, 204, 400, 404, 409, 422 |
| **HTTPException** | Raise errors with status codes |
| **Error Handling** | Custom error handlers for consistency |

```python
# Quick reference
from fastapi import HTTPException, status

@app.get("/items/{item_id}", response_model=ItemResponse)
async def get_item(item_id: int):
    item = db.get_item(item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    return item
```

### Day 89: Dependencies & Middleware

| Concept | Key Points |
|---------|-----------|
| **Dependencies** | `Depends()` for reusable logic |
| **Authentication** | JWT with `HTTPBearer` |
| **Middleware** | Code that runs before every request |
| **CORS** | Cross-Origin Resource Sharing |

```python
# Quick reference
def pagination(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

@app.get("/items/")
async def get_items(pagination: dict = Depends(pagination)):
    return pagination

# Middleware
app.middleware("http")(log_requests)
app.add_middleware(CORSMiddleware, allow_origins=["*"])
```

### Day 90: Database Integration

| Concept | Key Points |
|---------|-----------|
| **SQLAlchemy** | ORM for database interaction |
| **Models** | Python classes mapping to tables |
| **Session** | Transaction management |
| **CRUD** | Create, Read, Update, Delete |
| **Relationships** | One-to-many, many-to-many |

```python
# Quick reference
from sqlalchemy import Column, Integer, String

class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/todos/")
async def get_todos(db: Session = Depends(get_db)):
    return db.query(Todo).all()
```

---

## 📝 Part 2: Practice Challenges

### Challenge #1: GET with Query Parameters

**Task:** Create a GET endpoint that accepts query parameters: `name`, `age`, `city`.

```python
# Solution
@app.get("/users/")
async def get_users(
    name: Optional[str] = None,
    age: Optional[int] = None,
    city: Optional[str] = None
):
    users = [
        {"name": "Alice", "age": 30, "city": "NYC"},
        {"name": "Bob", "age": 25, "city": "LA"},
        {"name": "Charlie", "age": 35, "city": "Chicago"},
    ]
    
    if name:
        users = [u for u in users if name.lower() in u["name"].lower()]
    if age:
        users = [u for u in users if u["age"] == age]
    if city:
        users = [u for u in users if city.lower() in u["city"].lower()]
    
    return {"users": users}
```

### Challenge #2: Pydantic Product Model

**Task:** Build a Pydantic model for Product with validation (`price > 0`, `name` required).

```python
# Solution
from pydantic import BaseModel, Field, field_validator

class Product(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    price: float = Field(..., gt=0)
    description: Optional[str] = Field(None, max_length=500)
    category: str = Field(default="general")
    
    @field_validator('category')
    def validate_category(cls, v):
        allowed = ['general', 'electronics', 'clothing', 'books']
        if v not in allowed:
            raise ValueError(f'Category must be one of: {allowed}')
        return v
```

### Challenge #3: Duplicate Email Error

**Task:** Add error handling for duplicate email in user registration.

```python
# Solution
users_db = {}

@app.post("/users/")
async def create_user(user: UserCreate):
    if user.email in [u.email for u in users_db.values()]:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Email '{user.email}' already registered"
        )
    
    # Create user
    users_db[user.email] = user
    return user
```

### Challenge #4: Authentication Dependency

**Task:** Create a dependency that checks if user is authenticated.

```python
# Solution
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    valid_tokens = ["token123", "admin456"]
    
    if token not in valid_tokens:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    return {"user_id": 1, "username": "authenticated_user"}

@app.get("/protected/")
async def protected_route(current_user: dict = Depends(verify_token)):
    return {"message": "Access granted", "user": current_user}
```

### Challenge #5: SQLAlchemy Order By Date

**Task:** Write a SQLAlchemy query that returns items sorted by creation date.

```python
# Solution
def get_todos_sorted(db: Session, order: str = "asc"):
    if order == "asc":
        return db.query(Todo).order_by(Todo.created_at.asc()).all()
    else:
        return db.query(Todo).order_by(Todo.created_at.desc()).all()

# Alternative with dynamic ordering
def get_todos_sorted(db: Session, order: str = "asc", field: str = "created_at"):
    column = getattr(Todo, field)
    if order == "desc":
        column = column.desc()
    return db.query(Todo).order_by(column).all()
```

---

## 🏗️ Part 3: Capstone Project - Book Management API

### Requirements

| Feature | Implementation |
|---------|----------------|
| Book Model | id, title, author, isbn, published_year, available |
| CRUD | Create, read, update, delete books |
| Search | Search by title, author, or year |
| Pagination | Limit and offset parameters |
| Validation | Pydantic models with validation |
| Error Handling | Proper HTTP status codes |
| Documentation | Automatic OpenAPI docs |

### Project Structure

```
book_api/
├── app/
│   ├── main.py       # FastAPI app with routers
│   ├── models.py     # SQLAlchemy models
│   ├── schemas.py    # Pydantic models
│   ├── database.py   # DB connection
│   ├── crud.py       # CRUD functions
│   └── routers/
│       └── books.py  # API endpoints
├── requirements.txt
└── books.db          # SQLite database
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/books/` | Create book |
| GET | `/books/` | List all books |
| GET | `/books/{id}` | Get single book |
| PUT | `/books/{id}` | Update book |
| DELETE | `/books/{id}` | Delete book |
| GET | `/books/search/?q=` | Search books |

---

## 📊 Quick Reference

### Week 13 Summary Table

| Day | Topic | Key Concepts |
|-----|-------|--------------|
| 85 | FastAPI Intro | app, uvicorn, /docs, GET endpoints |
| 86 | Path/Query Params | `{}`, `?`, `Path()`, `Query()` |
| 87 | Request Body | Pydantic, `BaseModel`, `Field()`, POST/PUT/PATCH |
| 88 | Response Models | `response_model`, status codes, HTTPException |
| 89 | Dependencies/Middleware | `Depends()`, auth, CORS, logging |
| 90 | Database Integration | SQLAlchemy, models, CRUD, session |

---

## ✅ Self-Assessment Checklist

| Concept | Understand? | Can implement? |
|---------|-------------|----------------|
| FastAPI Setup & Routing | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Path & Query Parameters | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Pydantic Models | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Request Body Validation | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Response Models | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Status Codes | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Error Handling | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Dependencies | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Middleware | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| SQLAlchemy CRUD | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Database Relationships | ☐ Yes / ☐ No | ☐ Yes / ☐ No |

---

## 📝 Reflection Questions

Answer these after completing the capstone:

1. Which concept was most challenging? Why?
2. Which challenge took the longest?
3. What pattern will you use most often in real projects?
4. What is still unclear about FastAPI?
5. How confident are you building a production FastAPI app (1-10)?

---

## ✅ Day 91 Checklist

- [ ] Review Days 85-90 daily logs and notes
- [ ] Complete Challenge #1 (Query Parameters)
- [ ] Complete Challenge #2 (Product Model)
- [ ] Complete Challenge #3 (Duplicate Email)
- [ ] Complete Challenge #4 (Auth Dependency)
- [ ] Complete Challenge #5 (Order By Date)
- [ ] Build Book Management API capstone
- [ ] Test all endpoints
- [ ] Push code to GitHub
- [ ] Update portfolio/demo

