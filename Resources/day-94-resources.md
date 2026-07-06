# 📚 Day 94 Resources - JWT Authentication

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| FastAPI Security: First Steps | https://fastapi.tiangolo.com/tutorial/security/first-steps/ | Getting started with security in FastAPI |
| Simple OAuth2 with Password and Bearer | https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/ | Complete JWT authentication tutorial |
| FastAPI OAuth2 JWT Guide | https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/ | Full JWT implementation  |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| FastAPI JWT Authentication | https://youtu.be/6ThXsUwLWvc | 25 min |
| OAuth2 & JWT in FastAPI | https://youtu.be/2jM5l1QxE1g | 30 min |

## 📦 Essential Packages

| Package | Command | Purpose |
|---------|---------|---------|
| python-jose[cryptography] | `pip install python-jose[cryptography]` | JWT encoding/decoding  |
| passlib[bcrypt] | `pip install "passlib[bcrypt]"` | Password hashing  |
| python-multipart | `pip install python-multipart` | OAuth2 form handling |

## 🔐 Complete JWT Implementation

### Token Utilities

```python
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Optional

SECRET_KEY = "your-secret-key"  # Use environment variable in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
```

### Login Endpoint

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
```

### Protected Routes with Dependencies

```python
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
```

## 📊 Access/Refresh Token Pattern

| Token Type | Lifespan | Purpose |
|------------|----------|---------|
| **Access Token** | 15-30 minutes | Authenticating API requests  |
| **Refresh Token** | 7-30 days | Obtaining new access tokens  |

### Refresh Token Flow

```bash
# Login response
{
    "access_token": "<short-lived-token>",
    "refresh_token": "<long-lived-token>",
    "token_type": "bearer"
}

# Refresh endpoint
POST /refresh
{
    "refresh_token": "<refresh_token>"
}
# Returns new access token and optional new refresh token
```

## 🎯 Common JWT Claims

| Claim | Purpose | Example |
|-------|---------|---------|
| `sub` | Subject (user identifier) | `"user123"` |
| `exp` | Expiration time (Unix timestamp) | `1234567890` |
| `iat` | Issued at time | `1234567890` |
| `jti` | Unique token ID (anti-replay) | `"uuid-1234"` |
| `role` | User role (custom) | `"admin"` |

## 🛡️ Advanced Features

| Feature | Description |
|---------|-------------|
| **Token Denylist** | JTI-based revocation for logout  |
| **CSRF Protection** | For cookie-based token storage  |
| **WebSocket Support** | Authenticate WebSocket connections  |
| **Asymmetric Algorithms** | RS256, ES256 support  |

## 📖 Further Reading

| Article | Link |
|---------|------|
| OAuth2 JWT Tutorial | https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/ |
| FastAPI JWT Harmony Library | https://github.com/GaijinEntertainment/fastapi-jwt-harmony |
| JWT Authentication Workflow | https://github.com/babakjahan/fastapi_jwt |

