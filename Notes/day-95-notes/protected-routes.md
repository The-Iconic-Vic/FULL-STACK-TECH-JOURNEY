# 📘 Protected Routes & Current User

## 🎯 Overview

Protected routes require authentication before allowing access. FastAPI provides a clean way to protect routes using dependency injection with `Depends()` and OAuth2 schemes.

---

## 🔐 Part 1: OAuth2 Scheme

### What is OAuth2PasswordBearer?

`OAuth2PasswordBearer` is a FastAPI class that handles token extraction from the `Authorization` header. It expects the token in the format: `Bearer <token>`

```python
from fastapi.security import OAuth2PasswordBearer

# Token URL is the login endpoint
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
```

### How Token Extraction Works

```
Request Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

oauth2_scheme extracts: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 👤 Part 2: get_current_user Dependency

### Complete Implementation

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session
from . import models
from .config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> models.User:
    """
    Get current user from JWT token.
    
    Returns:
        User object
    
    Raises:
        HTTPException: If token is invalid or user not found
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        
        if username is None or user_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()
    
    if user is None:
        raise credentials_exception
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated"
        )
    
    return user
```

---

## 🛡️ Part 3: Protecting Routes

### Simple Protected Route

```python
from fastapi import Depends
from .auth import get_current_user
from .models import User

@router.get("/users/me")
async def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email
    }
```

### Dependency Chain

```python
# Level 1: Validate token
async def verify_token(token: str = Depends(oauth2_scheme)):
    # Decode and validate token
    return payload

# Level 2: Get user
async def get_current_user(
    payload: dict = Depends(verify_token),
    db: Session = Depends(get_db)
) -> models.User:
    # Get user from database
    return user

# Level 3: Check active
async def get_current_active_user(
    user: models.User = Depends(get_current_user)
) -> models.User:
    if not user.is_active:
        raise HTTPException(403)
    return user
```

### Route Protection by Role

```python
async def get_current_admin_user(
    current_user: User = Depends(get_current_user)
) -> User:
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return current_user

@router.get("/admin/dashboard")
async def admin_dashboard(
    current_user: User = Depends(get_current_admin_user)
):
    return {"message": "Welcome admin!"}
```

---

## 📝 Part 4: User-Specific Data

### Task CRUD with User Isolation

```python
@router.post("/tasks", response_model=TaskResponse, status_code=201)
async def create_task(
    task: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a task for the current user."""
    db_task = Task(
        title=task.title,
        description=task.description,
        user_id=current_user.id
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@router.get("/tasks", response_model=list[TaskResponse])
async def get_tasks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all tasks for the current user."""
    return db.query(Task).filter(Task.user_id == current_user.id).all()
```

---

## 📊 Quick Reference

### Protecting Routes

| Method | Syntax | Purpose |
|--------|--------|---------|
| Basic | `Depends(get_current_user)` | Any authenticated user |
| Active Only | `Depends(get_current_active_user)` | Active user only |
| Admin Only | `Depends(get_current_admin_user)` | Admin role only |

### Common Dependency Patterns

```python
# 1. Simple authentication
@router.get("/protected")
async def route(user: User = Depends(get_current_user)):
    return {"user": user.username}

# 2. Authentication + Database session
@router.get("/tasks")
async def get_tasks(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Task).filter(Task.user_id == user.id).all()

# 3. Nested dependencies
@router.get("/secure")
async def secure_route(
    token: dict = Depends(verify_token),
    user: User = Depends(get_current_user)
):
    return user
```

### Error Responses

| Status | Message | Meaning |
|--------|---------|---------|
| 401 | Could not validate credentials | Invalid/expired token |
| 403 | Account is deactivated | User account disabled |
| 403 | Admin privileges required | Insufficient permissions |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Could not validate credentials` | Invalid/expired token | Login again |
| `Account is deactivated` | User account disabled | Contact admin |
| `Missing Bearer token` | No Authorization header | Include `Bearer <token>` |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **oauth2_scheme extracts tokens** | Handles Authorization header |
| **get_current_user validates** | Decodes token and gets user |
| **Depends() protects routes** | Inject authentication dependency |
| **Always filter by user_id** | Prevent data leakage |
| **Use 401 for auth errors** | Unauthorized access |
| **Use 403 for permissions** | Authenticated but not allowed |

