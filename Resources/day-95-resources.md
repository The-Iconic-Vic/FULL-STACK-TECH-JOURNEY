# 📚 Day 95 Resources - Protected Routes & Current User

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| FastAPI: OAuth2 with Password | https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/ | JWT and OAuth2 with Password Flow |
| FastAPI: Dependencies | https://fastapi.tiangolo.com/tutorial/dependencies/ | Dependency injection guide |
| FastAPI: Security Utilities | https://fastapi.tiangolo.com/tutorial/security/ | Complete security documentation |
| OAuth2Bearer | https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/#use-it | OAuth2Bearer usage guide |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| FastAPI JWT Protected Routes | https://youtu.be/6ThXsUwLWvc | 25 min |
| Current User Dependency | https://youtu.be/2jM5l1QxE1g | 18 min |

## 📦 Essential Dependencies

| Package | Purpose | Command |
|---------|---------|---------|
| python-jose | JWT encoding/decoding | `pip install python-jose[cryptography]` |
| passlib | Password hashing | `pip install passlib[bcrypt]` |
| python-multipart | Form data handling | `pip install python-multipart` |

## 🔐 Common Dependency Patterns

| Use Case | Pattern | Example |
|----------|---------|---------|
| Get current user | `Depends(get_current_user)` | `current_user: User = Depends(get_current_user)` |
| Active user | `Depends(get_current_active_user)` | `current_user: User = Depends(get_current_active_user)` |
| Admin user | `Depends(get_current_admin_user)` | `current_user: User = Depends(get_current_admin_user)` |
| Verify token | `Depends(oauth2_scheme)` | `token: str = Depends(oauth2_scheme)` |
| Database session | `Depends(get_db)` | `db: Session = Depends(get_db)` |

## 📂 Full Implementation Example

### auth.py

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from . import models, schemas
from .database import get_db
from .config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        if username is None or user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user
```

### main.py

```python
from fastapi import FastAPI, Depends
from .auth import get_current_user
from .models import User

app = FastAPI()

@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
```

## 📖 Further Reading

| Article | Link |
|---------|------|
| OAuth2 with Password Flow | https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/ |
| Dependency Injection | https://fastapi.tiangolo.com/tutorial/dependencies/ |
| User Management | https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/#create-a-user-model |

