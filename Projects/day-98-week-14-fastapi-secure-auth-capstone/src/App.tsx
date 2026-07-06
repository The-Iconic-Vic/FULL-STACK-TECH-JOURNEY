import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  Code2, 
  Layers, 
  Database, 
  Server, 
  User, 
  Key, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Play, 
  Copy, 
  Check, 
  ChevronRight, 
  FileCode, 
  Folder, 
  ExternalLink, 
  Info, 
  Lock, 
  UserPlus, 
  LogIn, 
  LogOut, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Clock, 
  Link2,
  Settings,
  Sun,
  Moon
} from "lucide-react";

// Code files data to display in the Code Viewer
const codeFiles = {
  "main.py": {
    path: "auth_api/main.py",
    language: "python",
    code: `from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .models import User
from .schemas import UserResponse
from .auth import get_current_user
from .routes import auth, tasks

# Initialize database tables (Runs on startup for easy setup)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FastAPI + PostgreSQL Authentication System",
    description="A complete secure REST API with user registration, login, JWT authentication, and task ownership management.",
    version="1.0.0"
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(tasks.router)


# ==========================================
# Root / Health Check Endpoints
# ==========================================

@app.get("/", tags=["General"])
def read_root():
    return {
        "message": "Welcome to the FastAPI User Authentication and Task Management API!",
        "documentation": "/docs"
    }


# ==========================================
# Protected User Endpoints
# ==========================================

@app.get("/users/me", response_model=UserResponse, tags=["Users"])
async def get_my_profile(current_user: User = Depends(get_current_user)):
    """
    Fetch the currently authenticated user's profile details using the JWT access token.
    """
    return current_user
`
  },
  "database.py": {
    path: "auth_api/database.py",
    language: "python",
    code: `import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/auth_db")

# For sqlite compatibility if developers want to test locally with sqlite
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
`
  },
  "models.py": {
    path: "auth_api/models.py",
    language: "python",
    code: `from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship with Task
    tasks = relationship("Task", back_populates="owner", cascade="all, delete-orphan")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    # Relationship with User
    owner = relationship("User", back_populates="tasks")
`
  },
  "schemas.py": {
    path: "auth_api/schemas.py",
    language: "python",
    code: `from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


# ==========================================
# Task Schemas
# ==========================================

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100, examples=["Complete assignment"])
    description: Optional[str] = Field(None, examples=["Finish the FastAPI authentication task"])
    is_completed: bool = Field(default=False)

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    is_completed: Optional[bool] = None

class TaskResponse(TaskBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ==========================================
# User Schemas
# ==========================================

class UserBase(BaseModel):
    email: EmailStr = Field(..., examples=["user@example.com"])
    username: str = Field(..., min_length=3, max_length=50, examples=["john_doe"])

class UserRegister(UserBase):
    password: str = Field(..., min_length=6, max_length=128, examples=["secretpassword123"])

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ==========================================
# Auth / Token Schemas
# ==========================================

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
`
  },
  "auth.py": {
    path: "auth_api/auth.py",
    language: "python",
    code: `import os
from datetime import datetime, timedelta
from typing import Optional
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from .database import get_db
from .models import User

# Load environment variables
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key-fallback")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 Password Bearer flow
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


# ==========================================
# Password Helper Functions
# ==========================================

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


# ==========================================
# JWT Token Helper Functions
# ==========================================

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# ==========================================
# Dependency: Get Current User
# ==========================================

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
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
    except JWTError:
        raise credentials_exception
        
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
        
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Inactive user"
        )
        
    return user
`
  },
  "routes/auth.py": {
    path: "auth_api/routes/auth.py",
    language: "python",
    code: `from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User
from ..schemas import UserRegister, UserResponse, Token
from ..auth import (
    get_password_hash, 
    verify_password, 
    create_access_token, 
    ACCESS_TOKEN_EXPIRE_MINUTES
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    # Check if username already exists
    db_user_username = db.query(User).filter(User.username == user_data.username).first()
    if db_user_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )

    # Check if email already exists
    db_user_email = db.query(User).filter(User.email == user_data.email).first()
    if db_user_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Hash the password
    hashed_pwd = get_password_hash(user_data.password)

    # Create new User instance
    new_user = User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Find user by username or email
    user = db.query(User).filter(
        (User.username == form_data.username) | (User.email == form_data.username)
    ).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user account"
        )

    # Generate JWT
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, 
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}
`
  },
  "routes/tasks.py": {
    path: "auth_api/routes/tasks.py",
    language: "python",
    code: `from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Task, User
from ..schemas import TaskCreate, TaskResponse, TaskUpdate
from ..auth import get_current_user

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task_data: TaskCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    new_task = Task(
        title=task_data.title,
        description=task_data.description,
        is_completed=task_data.is_completed,
        owner_id=current_user.id
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@router.get("", response_model=List[TaskResponse])
def get_tasks(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    # Filter by user ownership
    tasks = db.query(Task).filter(Task.owner_id == current_user.id).all()
    return tasks


@router.get("/{task_id}", response_model=TaskResponse)
def get_task_by_id(
    task_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id, Task.owner_id == current_user.id).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Task not found or you do not have permission to view it"
        )
    return task


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int, 
    task_data: TaskUpdate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id, Task.owner_id == current_user.id).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Task not found or you do not have permission to update it"
        )
    
    # Update fields if provided
    if task_data.title is not None:
        task.title = task_data.title
    if task_data.description is not None:
        task.description = task_data.description
    if task_data.is_completed is not None:
        task.is_completed = task_data.is_completed

    db.commit()
    db.refresh(task)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id, Task.owner_id == current_user.id).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Task not found or you do not have permission to delete it"
        )
    
    db.delete(task)
    db.commit()
    return None
`
  },
  ".env": {
    path: "auth_api/.env",
    language: "env",
    code: `DATABASE_URL=postgresql://user:pass@localhost:5432/auth_db
SECRET_KEY=9a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
`
  },
  "requirements.txt": {
    path: "auth_api/requirements.txt",
    language: "text",
    code: `fastapi>=0.110.0
uvicorn>=0.28.0
sqlalchemy>=2.0.0
psycopg2-binary>=2.9.9
pydantic[email]>=2.6.0
passlib[bcrypt]>=1.7.4
python-jose[cryptography]>=3.3.0
python-dotenv>=1.0.1
`
  }
};

type ThemeMode = "dark" | "light";
type ThemeColor = "aurora" | "amethyst" | "amber";

interface ThemeStyles {
  pageBg: string;
  cardBg: string;
  innerBg: string;
  inputBg: string;
  border: string;
  borderHover: string;
  text: string;
  titleText: string;
  mutedText: string;
  accentText: string;
  accentBorder: string;
  accentBg: string;
  btnGradient: string;
  btnActive: string;
  btnInactive: string;
  headerBg: string;
  tabActive: string;
  tabInactive: string;
  codeHighlight: {
    decorator: string;
    comment: string;
    string: string;
    keyword: string;
    text: string;
    lineHover: string;
    lineNoBorder: string;
    lineNoText: string;
  };
}

const themeConfigs: Record<ThemeColor, Record<ThemeMode, ThemeStyles>> = {
  aurora: {
    dark: {
      pageBg: "bg-[#0a0f1d] text-slate-200 selection:bg-emerald-500 selection:text-[#0a0f1d]",
      cardBg: "bg-[#111827]/85 border-[#1f2937]",
      innerBg: "bg-[#080d1a]",
      inputBg: "bg-[#070a14] border-[#1f2937] text-slate-200 focus:border-emerald-500",
      border: "border-[#1f2937]",
      borderHover: "hover:border-emerald-500/50",
      text: "text-slate-300",
      titleText: "text-white",
      mutedText: "text-slate-400",
      accentText: "text-emerald-400",
      accentBorder: "border-emerald-500",
      accentBg: "bg-emerald-950/40 text-emerald-300 border-emerald-900",
      btnGradient: "from-emerald-400 via-teal-500 to-cyan-500 text-slate-950",
      btnActive: "bg-emerald-950/30 border-emerald-500 text-emerald-300",
      btnInactive: "bg-[#070b14] border-[#1f2937] text-slate-300 hover:bg-[#111827]",
      headerBg: "bg-[#111827]/80 border-[#1f2937] backdrop-blur-md",
      tabActive: "bg-[#1f2937] text-emerald-400 border border-emerald-500/20",
      tabInactive: "text-slate-400 hover:text-slate-200",
      codeHighlight: {
        decorator: "text-pink-400",
        comment: "text-slate-500 italic",
        string: "text-emerald-300",
        keyword: "text-cyan-400",
        text: "text-slate-300",
        lineHover: "hover:bg-emerald-950/10",
        lineNoBorder: "border-emerald-950/50",
        lineNoText: "text-slate-600"
      }
    },
    light: {
      pageBg: "bg-[#f0f5fa] text-[#1e293b] selection:bg-emerald-500 selection:text-white",
      cardBg: "bg-white border-[#e2e8f0] shadow-sm",
      innerBg: "bg-[#f8fafc]",
      inputBg: "bg-[#f1f5f9] border-[#e2e8f0] text-slate-800 focus:border-emerald-600",
      border: "border-[#e2e8f0]",
      borderHover: "hover:border-emerald-600/50",
      text: "text-slate-700",
      titleText: "text-slate-900",
      mutedText: "text-slate-500",
      accentText: "text-emerald-600",
      accentBorder: "border-emerald-600",
      accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      btnGradient: "from-emerald-500 via-teal-600 to-cyan-600 text-white",
      btnActive: "bg-emerald-50 border-emerald-500 text-emerald-700",
      btnInactive: "bg-[#f8fafc] border-[#e2e8f0] text-slate-600 hover:bg-[#f1f5f9]",
      headerBg: "bg-white/80 border-[#e2e8f0] backdrop-blur-md",
      tabActive: "bg-[#f1f5f9] text-emerald-700 border border-emerald-200",
      tabInactive: "text-slate-500 hover:text-slate-900",
      codeHighlight: {
        decorator: "text-pink-600",
        comment: "text-slate-400 italic",
        string: "text-emerald-600",
        keyword: "text-cyan-600",
        text: "text-slate-700",
        lineHover: "hover:bg-emerald-50/50",
        lineNoBorder: "border-slate-200",
        lineNoText: "text-slate-400"
      }
    }
  },
  amethyst: {
    dark: {
      pageBg: "bg-[#0a0714] text-slate-200 selection:bg-fuchsia-500 selection:text-[#0a0714]",
      cardBg: "bg-[#140f25]/85 border-[#251c3d]",
      innerBg: "bg-[#0d0a19]",
      inputBg: "bg-[#090611] border-[#251c3d] text-slate-200 focus:border-fuchsia-500",
      border: "border-[#251c3d]",
      borderHover: "hover:border-fuchsia-500/50",
      text: "text-slate-300",
      titleText: "text-white",
      mutedText: "text-slate-400",
      accentText: "text-fuchsia-400",
      accentBorder: "border-fuchsia-500",
      accentBg: "bg-fuchsia-950/40 text-fuchsia-300 border-fuchsia-900",
      btnGradient: "from-fuchsia-500 via-purple-600 to-indigo-600 text-white",
      btnActive: "bg-fuchsia-950/30 border-fuchsia-500 text-fuchsia-300",
      btnInactive: "bg-[#090611] border-[#251c3d] text-slate-300 hover:bg-[#140f25]",
      headerBg: "bg-[#140f25]/80 border-[#251c3d] backdrop-blur-md",
      tabActive: "bg-[#251c3d] text-fuchsia-400 border border-fuchsia-500/20",
      tabInactive: "text-slate-400 hover:text-slate-200",
      codeHighlight: {
        decorator: "text-pink-400",
        comment: "text-slate-500 italic",
        string: "text-amber-300",
        keyword: "text-fuchsia-400",
        text: "text-slate-300",
        lineHover: "hover:bg-fuchsia-950/10",
        lineNoBorder: "border-fuchsia-950/50",
        lineNoText: "text-slate-600"
      }
    },
    light: {
      pageBg: "bg-[#f6f3f9] text-[#2e1f47] selection:bg-purple-500 selection:text-white",
      cardBg: "bg-white border-[#ebdffd] shadow-sm",
      innerBg: "bg-[#faf8fd]",
      inputBg: "bg-[#f3edfc] border-[#ebdffd] text-slate-800 focus:border-purple-600",
      border: "border-[#ebdffd]",
      borderHover: "hover:border-purple-600/50",
      text: "text-slate-700",
      titleText: "text-purple-950",
      mutedText: "text-purple-900/60",
      accentText: "text-purple-600",
      accentBorder: "border-purple-600",
      accentBg: "bg-purple-50 text-purple-700 border-purple-200",
      btnGradient: "from-purple-600 via-fuchsia-600 to-indigo-600 text-white",
      btnActive: "bg-purple-50 border-purple-500 text-purple-700",
      btnInactive: "bg-[#faf8fd] border-[#ebdffd] text-slate-600 hover:bg-[#f3edfc]",
      headerBg: "bg-white/80 border-[#ebdffd] backdrop-blur-md",
      tabActive: "bg-[#f3edfc] text-purple-700 border border-purple-200",
      tabInactive: "text-slate-500 hover:text-slate-900",
      codeHighlight: {
        decorator: "text-pink-600",
        comment: "text-slate-400 italic",
        string: "text-amber-600",
        keyword: "text-purple-600",
        text: "text-slate-700",
        lineHover: "hover:bg-purple-50/50",
        lineNoBorder: "border-[#ebdffd]",
        lineNoText: "text-slate-400"
      }
    }
  },
  amber: {
    dark: {
      pageBg: "bg-[#0e0a07] text-slate-200 selection:bg-amber-500 selection:text-[#0e0a07]",
      cardBg: "bg-[#1c140f]/85 border-[#2d2018]",
      innerBg: "bg-[#140d0a]",
      inputBg: "bg-[#0a0705] border-[#2d2018] text-slate-200 focus:border-amber-500",
      border: "border-[#2d2018]",
      borderHover: "hover:border-amber-500/50",
      text: "text-slate-300",
      titleText: "text-white",
      mutedText: "text-slate-400",
      accentText: "text-amber-400",
      accentBorder: "border-amber-500",
      accentBg: "bg-amber-950/40 text-amber-300 border-amber-955",
      btnGradient: "from-amber-400 via-orange-500 to-red-500 text-slate-950",
      btnActive: "bg-amber-950/30 border-amber-500 text-amber-300",
      btnInactive: "bg-[#0a0705] border-[#2d2018] text-slate-300 hover:bg-[#1c140f]",
      headerBg: "bg-[#1c140f]/80 border-[#2d2018] backdrop-blur-md",
      tabActive: "bg-[#2d2018] text-amber-400 border border-amber-500/20",
      tabInactive: "text-slate-400 hover:text-slate-200",
      codeHighlight: {
        decorator: "text-orange-400",
        comment: "text-slate-500 italic",
        string: "text-yellow-300",
        keyword: "text-amber-400",
        text: "text-slate-300",
        lineHover: "hover:bg-amber-950/10",
        lineNoBorder: "border-amber-950/50",
        lineNoText: "text-slate-600"
      }
    },
    light: {
      pageBg: "bg-[#fdfbf7] text-[#452a15] selection:bg-amber-500 selection:text-white",
      cardBg: "bg-white border-[#f3ebdb] shadow-sm",
      innerBg: "bg-[#faf7f0]",
      inputBg: "bg-[#f6f0e4] border-[#f3ebdb] text-slate-800 focus:border-amber-600",
      border: "border-[#f3ebdb]",
      borderHover: "hover:border-amber-600/50",
      text: "text-slate-700",
      titleText: "text-amber-955",
      mutedText: "text-amber-900/60",
      accentText: "text-amber-600",
      accentBorder: "border-amber-600",
      accentBg: "bg-amber-50 text-amber-700 border-amber-200",
      btnGradient: "from-amber-500 via-orange-500 to-red-600 text-white",
      btnActive: "bg-amber-50 border-amber-500 text-amber-700",
      btnInactive: "bg-[#faf7f0] border-[#f3ebdb] text-slate-600 hover:bg-[#f6f0e4]",
      headerBg: "bg-white/80 border-[#f3ebdb] backdrop-blur-md",
      tabActive: "bg-[#f6f0e4] text-amber-700 border border-amber-200",
      tabInactive: "text-slate-500 hover:text-slate-900",
      codeHighlight: {
        decorator: "text-orange-600",
        comment: "text-slate-400 italic",
        string: "text-amber-700",
        keyword: "text-amber-600",
        text: "text-slate-700",
        lineHover: "hover:bg-amber-50/50",
        lineNoBorder: "border-[#f3ebdb]",
        lineNoText: "text-slate-400"
      }
    }
  }
};

const getThemeClasses = (mode: ThemeMode, color: ThemeColor): ThemeStyles => {
  return themeConfigs[color]?.[mode] || themeConfigs.aurora.dark;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"explorer" | "sandbox" | "architecture" | "guide">("sandbox");
  const [selectedFile, setSelectedFile] = useState<keyof typeof codeFiles>("main.py");
  const [copied, setCopied] = useState(false);

  // Persistent Theme State
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem("theme_mode") as ThemeMode) || "dark";
  });
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    return (localStorage.getItem("theme_color") as ThemeColor) || "aurora";
  });

  useEffect(() => {
    localStorage.setItem("theme_mode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("theme_color", themeColor);
  }, [themeColor]);

  const t = getThemeClasses(themeMode, themeColor);

  // Simulated Database State
  const [dbUsers, setDbUsers] = useState<any[]>([
    {
      id: 1,
      email: "admin@example.com",
      username: "admin",
      // Simulated bcrypt hash for "admin123"
      hashed_password: "$2b$12$K89M6nB8Zf7V1A8.O3k6feM1nS6zT5p4r7m9v0K2v1B3s4A5u6a7b",
      is_active: true,
      created_at: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
    }
  ]);

  const [dbTasks, setDbTasks] = useState<any[]>([
    {
      id: 1,
      title: "Set up PostgreSQL database",
      description: "Provision the database and configure environment variables in FastAPI.",
      is_completed: true,
      owner_id: 1,
      created_at: new Date(Date.now() - 3600000 * 4).toISOString() // 4 hours ago
    },
    {
      id: 2,
      title: "Secure authorization endpoints",
      description: "Implement JWT token validation and check task owner relationships.",
      is_completed: false,
      owner_id: 1,
      created_at: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
    }
  ]);

  // Current session/API client state
  const [currentToken, setCurrentToken] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<any | null>(null);
  const [apiLogs, setApiLogs] = useState<string[]>([
    "[system] Database initialized, table structures loaded.",
    "[system] Default user 'admin' loaded with bcrypt-hashed password.",
    "[system] FastAPI server booted and listening on http://127.0.0.1:8000"
  ]);

  // Form Inputs for Sandbox
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");

  // Sandbox UI response view
  const [lastApiCall, setLastApiCall] = useState<{
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
    status: number;
    response: any;
  } | null>(null);

  // Active sandbox endpoint selection
  const [sandboxEndpoint, setSandboxEndpoint] = useState<
    "register" | "login" | "me" | "tasks_get" | "tasks_post"
  >("register");

  const [showPasswordReg, setShowPasswordReg] = useState(false);
  const [showPasswordLog, setShowPasswordLog] = useState(false);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [apiLogs]);

  // Helper to add a log
  const addLog = (text: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setApiLogs(prev => [...prev, `[${timestamp}] ${text}`]);
  };

  // Helper to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Code highlighter mock (basic regex highlighting)
  const renderHighlightedCode = (code: string) => {
    return code.split("\n").map((line, idx) => {
      // Very basic tokenizer for display
      let elements: React.ReactNode[] = [];
      let cursor = 0;

      // Match decorators, keywords, comments, strings
      const tokenRegex = /(@\w+(?:\.\w+)?|#.*|"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\b(?:def|class|import|from|return|if|else|elif|and|or|not|in|as|try|except|finally|yield|async|await|None|True|False)\b)/g;
      let match;
      let lastIndex = 0;

      while ((match = tokenRegex.exec(line)) !== null) {
        const textBefore = line.substring(lastIndex, match.index);
        if (textBefore) {
          elements.push(<span key={`text-${cursor++}`}>{textBefore}</span>);
        }

        const matchedText = match[0];
        if (matchedText.startsWith("@")) {
          elements.push(<span key={`decorator-${cursor++}`} className={`${t.codeHighlight.decorator} font-medium`}>{matchedText}</span>);
        } else if (matchedText.startsWith("#")) {
          elements.push(<span key={`comment-${cursor++}`} className={t.codeHighlight.comment}>{matchedText}</span>);
        } else if (matchedText.startsWith('"') || matchedText.startsWith("'")) {
          elements.push(<span key={`string-${cursor++}`} className={`${t.codeHighlight.string} font-normal`}>{matchedText}</span>);
        } else {
          // It's a keyword
          elements.push(<span key={`keyword-${cursor++}`} className={`${t.codeHighlight.keyword} font-medium`}>{matchedText}</span>);
        }

        lastIndex = tokenRegex.lastIndex;
      }

      const textAfter = line.substring(lastIndex);
      if (textAfter) {
        elements.push(<span key={`text-end-${cursor++}`}>{textAfter}</span>);
      }

      return (
        <div key={idx} className={`table-row group ${t.codeHighlight.lineHover}`}>
          <span className={`table-cell select-none text-right pr-4 ${t.codeHighlight.lineNoText} font-mono text-xs w-8 border-r ${t.codeHighlight.lineNoBorder}`}>
            {idx + 1}
          </span>
          <span className={`table-cell pl-4 font-mono text-sm whitespace-pre ${t.codeHighlight.text}`}>
            {elements.length > 0 ? elements : line}
          </span>
        </div>
      );
    });
  };

  // =========================================================
  // Simulating API Operations
  // =========================================================

  const handleRegisterSim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regUsername || !regEmail || !regPassword) return;

    addLog(`POST /auth/register request received for email: ${regEmail}`);
    addLog(`[validation] Pydantic validating email with EmailStr... OK.`);
    addLog(`[validation] Checking if username or email already exists in DB...`);

    // Checks
    const existsUsername = dbUsers.some(u => u.username === regUsername);
    const existsEmail = dbUsers.some(u => u.email === regEmail);

    if (existsUsername || existsEmail) {
      const errorDetail = existsUsername ? "Username already registered" : "Email already registered";
      addLog(`[database] Error: Conflict. ${errorDetail}`);
      setLastApiCall({
        method: "POST",
        url: "/auth/register",
        headers: { "Content-Type": "application/json" },
        body: { username: regUsername, email: regEmail, password: "••••••••" },
        status: 400,
        response: { detail: errorDetail }
      });
      return;
    }

    addLog(`[bcrypt] GenSalt and hashing password "${regPassword.substring(0,2)}..."`);
    const mockHash = `$2b$12$${Math.random().toString(36).substring(2,15)}hashedpasswordwithbcryptcontext`;
    addLog(`[bcrypt] Generated hash: ${mockHash.substring(0, 30)}...`);

    const newUser = {
      id: dbUsers.length + 1,
      username: regUsername,
      email: regEmail,
      hashed_password: mockHash,
      is_active: true,
      created_at: new Date().toISOString()
    };

    setDbUsers([...dbUsers, newUser]);
    addLog(`[database] INSERT INTO users (email, username, hashed_password) VALUES ('${regEmail}', '${regUsername}', ...)`);
    addLog(`[database] Transaction committed. Assigned User ID: ${newUser.id}`);

    setLastApiCall({
      method: "POST",
      url: "/auth/register",
      headers: { "Content-Type": "application/json" },
      body: { username: regUsername, email: regEmail, password: "••••••••" },
      status: 201,
      response: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        is_active: newUser.is_active,
        created_at: newUser.created_at
      }
    });

    // Reset fields
    setRegUsername("");
    setRegEmail("");
    setRegPassword("");
    addLog(`[client] User registered successfully! Status: 201 Created.`);
  };

  const handleLoginSim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) return;

    addLog(`POST /auth/login request received with form data: username=${loginUsername}`);
    addLog(`[database] SELECT * FROM users WHERE username = '${loginUsername}' OR email = '${loginUsername}'`);

    const user = dbUsers.find(u => u.username === loginUsername || u.email === loginUsername);

    if (!user) {
      addLog(`[auth] User not found. Authenticating failed.`);
      setLastApiCall({
        method: "POST",
        url: "/auth/login",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: { username: loginUsername, password: "••••••••" },
        status: 401,
        response: { detail: "Incorrect username/email or password" }
      });
      return;
    }

    addLog(`[bcrypt] Verifying candidate password against stored hash...`);
    // Simple logic: check if pass is admin123 for default, or matches registration pass
    // (for mock simplicity, we just check if password has min-length 6)
    const isPassValid = loginPassword.length >= 6; 
    
    if (!isPassValid) {
      addLog(`[bcrypt] Password validation failed. Unauthorized.`);
      setLastApiCall({
        method: "POST",
        url: "/auth/login",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: { username: loginUsername, password: "••••••••" },
        status: 401,
        response: { detail: "Incorrect username/email or password" }
      });
      return;
    }

    addLog(`[bcrypt] Password verification successful.`);
    addLog(`[jwt] Generating access token. Issuer=HS256. ExpireIn=30 Minutes.`);

    // Real-looking JWT token parts
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })).replace(/=/g, "");
    const payload = btoa(JSON.stringify({ sub: user.username, exp: Math.floor(Date.now() / 1000) + 1800 })).replace(/=/g, "");
    const signature = "signature-hash-here-db9948fa88c003bf401";
    const generatedJwt = `${header}.${payload}.${signature}`;

    addLog(`[jwt] Created JWT: ${generatedJwt.substring(0, 35)}...`);

    setCurrentToken(generatedJwt);
    setLoggedInUser(user);

    setLastApiCall({
      method: "POST",
      url: "/auth/login",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: { username: loginUsername, password: "••••••••" },
      status: 200,
      response: {
        access_token: generatedJwt,
        token_type: "bearer"
      }
    });

    setLoginUsername("");
    setLoginPassword("");
    addLog(`[client] Logged in as ${user.username}! Bearer token saved in browser state.`);
  };

  const handleGetMeSim = () => {
    addLog(`GET /users/me request received.`);
    
    if (!currentToken) {
      addLog(`[dependencies] Error: No authorization header found.`);
      setLastApiCall({
        method: "GET",
        url: "/users/me",
        headers: {},
        status: 401,
        response: { detail: "Not authenticated" }
      });
      return;
    }

    addLog(`[dependencies] Extracting Bearer Token from Request Header...`);
    addLog(`[jwt] Decoding token payload using HS256 secret key...`);
    addLog(`[jwt] Extracted username: "${loggedInUser?.username}"`);
    addLog(`[database] Querying user profile: SELECT * FROM users WHERE username = '${loggedInUser?.username}'`);

    setLastApiCall({
      method: "GET",
      url: "/users/me",
      headers: { "Authorization": `Bearer ${currentToken.substring(0, 15)}...` },
      status: 200,
      response: {
        id: loggedInUser.id,
        email: loggedInUser.email,
        username: loggedInUser.username,
        is_active: loggedInUser.is_active,
        created_at: loggedInUser.created_at
      }
    });

    addLog(`[client] Profile loaded successfully for user: ${loggedInUser?.username}`);
  };

  const handleGetTasksSim = () => {
    addLog(`GET /tasks request received.`);

    if (!currentToken) {
      addLog(`[dependencies] Error: Missing Bearer Token in authorization header.`);
      setLastApiCall({
        method: "GET",
        url: "/tasks",
        headers: {},
        status: 401,
        response: { detail: "Not authenticated" }
      });
      return;
    }

    addLog(`[dependencies] Token valid. Owner identifier: id=${loggedInUser.id} (${loggedInUser.username})`);
    addLog(`[database] SELECT * FROM tasks WHERE owner_id = ${loggedInUser.id}`);

    const userTasks = dbTasks.filter(t => t.owner_id === loggedInUser.id);
    addLog(`[database] Found ${userTasks.length} tasks matching owner.`);

    setLastApiCall({
      method: "GET",
      url: "/tasks",
      headers: { "Authorization": `Bearer ${currentToken.substring(0, 15)}...` },
      status: 200,
      response: userTasks
    });
  };

  const handleCreateTaskSim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    addLog(`POST /tasks request received. Title: "${newTaskTitle}"`);

    if (!currentToken) {
      addLog(`[dependencies] Error: Missing active auth session.`);
      setLastApiCall({
        method: "POST",
        url: "/tasks",
        headers: {},
        body: { title: newTaskTitle, description: newTaskDesc },
        status: 401,
        response: { detail: "Not authenticated" }
      });
      return;
    }

    addLog(`[validation] Pydantic validating Task schema... Title length validation passed.`);
    
    const newTask = {
      id: dbTasks.length + 1,
      title: newTaskTitle,
      description: newTaskDesc || null,
      is_completed: false,
      owner_id: loggedInUser.id,
      created_at: new Date().toISOString()
    };

    setDbTasks([...dbTasks, newTask]);
    addLog(`[database] INSERT INTO tasks (title, description, is_completed, owner_id) VALUES (...)`);
    addLog(`[database] Assigned Task ID: ${newTask.id}`);

    setLastApiCall({
      method: "POST",
      url: "/tasks",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${currentToken.substring(0, 15)}...`
      },
      body: { title: newTaskTitle, description: newTaskDesc },
      status: 201,
      response: newTask
    });

    setNewTaskTitle("");
    setNewTaskDesc("");
    addLog(`[client] Task created successfully! Status: 201 Created.`);
  };

  const toggleTaskSim = (taskId: number) => {
    addLog(`PUT /tasks/${taskId} request received to toggle completeness.`);

    if (!currentToken) {
      addLog(`[auth] Unauthorized. Toggle blocked.`);
      return;
    }

    const task = dbTasks.find(t => t.id === taskId);
    if (!task) {
      addLog(`[database] Task ID ${taskId} not found.`);
      return;
    }

    if (task.owner_id !== loggedInUser.id) {
      addLog(`[auth] Ownership security violation. User ID ${loggedInUser.id} attempted to edit Task owned by ${task.owner_id}. Access Denied.`);
      return;
    }

    const updatedTasks = dbTasks.map(t => {
      if (t.id === taskId) {
        return { ...t, is_completed: !t.is_completed };
      }
      return t;
    });

    setDbTasks(updatedTasks);
    addLog(`[database] UPDATE tasks SET is_completed = ${!task.is_completed} WHERE id = ${taskId}`);
    
    // Auto refresh last response if current view is tasks_get
    if (sandboxEndpoint === "tasks_get") {
      const userTasks = updatedTasks.filter(t => t.owner_id === loggedInUser.id);
      setLastApiCall({
        method: "GET",
        url: "/tasks",
        headers: { "Authorization": `Bearer ${currentToken.substring(0, 15)}...` },
        status: 200,
        response: userTasks
      });
    }
  };

  const deleteTaskSim = (taskId: number) => {
    addLog(`DELETE /tasks/${taskId} request received.`);

    if (!currentToken) {
      addLog(`[auth] Unauthorized. Delete blocked.`);
      return;
    }

    const task = dbTasks.find(t => t.id === taskId);
    if (!task) {
      addLog(`[database] Task ID ${taskId} not found.`);
      return;
    }

    if (task.owner_id !== loggedInUser.id) {
      addLog(`[auth] Ownership check failed. Cannot delete resource owned by another user.`);
      return;
    }

    const updatedTasks = dbTasks.filter(t => t.id !== taskId);
    setDbTasks(updatedTasks);
    addLog(`[database] DELETE FROM tasks WHERE id = ${taskId}`);

    // Update response
    setLastApiCall({
      method: "DELETE",
      url: `/tasks/${taskId}`,
      headers: { "Authorization": `Bearer ${currentToken.substring(0,15)}...` },
      status: 204,
      response: null
    });

    addLog(`[client] Task deleted. Status: 204 No Content.`);
  };

  const handleLogoutSim = () => {
    addLog(`[client] Performing logout. Clearing JWT bearer session token.`);
    setCurrentToken(null);
    setLoggedInUser(null);
    setLastApiCall(null);
    addLog(`[client] Token successfully deleted. Current session ended.`);
  };

  return (
    <div className={`min-h-screen ${t.pageBg} flex flex-col font-sans transition-colors duration-200 selection:bg-cyan-500 selection:text-slate-950`}>
      
      {/* Visual Elegant Header */}
      <header className={`border-b ${t.border} ${t.headerBg} sticky top-0 z-50 px-4 md:px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm`}>
        {/* Left part: Brand Logo & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-start gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 bg-gradient-to-br ${t.btnGradient} rounded-xl shadow-lg shadow-indigo-500/10`}>
              <Server className="w-5.5 h-5.5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className={`text-base md:text-lg font-semibold tracking-tight ${t.titleText} flex items-center gap-2 flex-wrap`}>
                FastAPI + PostgreSQL Auth
                <span className={`text-[10px] md:text-xs font-mono font-normal ${t.accentBg} px-2 py-0.5 rounded-full border border-emerald-500/20`}>
                  Python 3.11+
                </span>
              </h1>
              <p className={`text-[11px] md:text-xs ${t.mutedText} mt-0.5`}>
                Production-ready User Authentication & Task Management API
              </p>
            </div>
          </div>

          {/* Theme switcher */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Mode switch */}
            <div className={`flex p-0.5 ${t.innerBg} border ${t.border} rounded-xl shadow-inner`}>
              <button
                onClick={() => setThemeMode("light")}
                className={`p-1.5 rounded-lg transition-all ${themeMode === "light" ? `${t.tabActive} shadow-sm` : `${t.mutedText} hover:text-slate-900 dark:hover:text-white`}`}
                title="Light Mode"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setThemeMode("dark")}
                className={`p-1.5 rounded-lg transition-all ${themeMode === "dark" ? `${t.tabActive} shadow-sm` : `${t.mutedText} hover:text-slate-900 dark:hover:text-white`}`}
                title="Dark Mode"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>

            {/* Color switcher */}
            <div className={`flex p-0.5 ${t.innerBg} border ${t.border} rounded-xl gap-1.5 items-center px-2 py-1 shadow-inner`}>
              {(["aurora", "amethyst", "amber"] as ThemeColor[]).map((c) => {
                const colors = {
                  aurora: "bg-emerald-500",
                  amethyst: "bg-purple-500",
                  amber: "bg-amber-500",
                };
                return (
                  <button
                    key={c}
                    onClick={() => setThemeColor(c)}
                    className={`w-4 h-4 rounded-full transition-all border ${themeColor === c ? "border-white ring-2 ring-indigo-500/40 scale-110" : "border-transparent opacity-60 hover:opacity-100"} ${colors[c]}`}
                    title={`${c.charAt(0).toUpperCase() + c.slice(1)} Theme`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className={`flex p-1 ${t.innerBg} border ${t.border} rounded-xl overflow-x-auto whitespace-nowrap w-full lg:w-auto shadow-inner`}>
          <button
            onClick={() => setActiveTab("sandbox")}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === "sandbox" ? t.tabActive : t.tabInactive
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            Interactive Playground
          </button>
          <button
            onClick={() => setActiveTab("explorer")}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === "explorer" ? t.tabActive : t.tabInactive
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Code Explorer
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === "architecture" ? t.tabActive : t.tabInactive
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Architecture & Database
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === "guide" ? t.tabActive : t.tabInactive
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Setup Guide
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 overflow-hidden p-4 md:p-6 max-w-7xl w-full mx-auto flex flex-col gap-6">

        {/* Tab 1: Interactive Playground */}
        {activeTab === "sandbox" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left side: Operations control panel */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Endpoint selection rail */}
              <div className={`${t.cardBg} border ${t.border} rounded-xl p-4 shadow-sm flex flex-col gap-3`}>
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-semibold ${t.titleText} flex items-center gap-2`}>
                    <Terminal className={`w-4 h-4 ${t.accentText}`} />
                    Interactive REST Endpoints
                  </h3>
                  {loggedInUser ? (
                    <div className={`flex items-center gap-2 ${t.innerBg} border ${t.border} pl-3 pr-2 py-1 rounded-full text-xs`}>
                      <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className={`${t.text} font-mono`}>@{loggedInUser.username}</span>
                      <button 
                        onClick={handleLogoutSim}
                        title="Logout" 
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-rose-400 transition"
                      >
                        <LogOut className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <span className={`text-xs ${t.mutedText} font-mono ${t.innerBg} px-2 py-1 rounded-md border ${t.border}`}>
                      Unauthenticated Session
                    </span>
                  )}
                </div>

                {/* API Request Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  
                  {/* Public: Register */}
                  <button
                    onClick={() => { setSandboxEndpoint("register"); }}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left transition ${
                      sandboxEndpoint === "register" ? t.btnActive : t.btnInactive
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded">POST</span>
                      <span className="text-xs font-mono">/auth/register</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {/* Public: Login */}
                  <button
                    onClick={() => { setSandboxEndpoint("login"); }}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left transition ${
                      sandboxEndpoint === "login" ? t.btnActive : t.btnInactive
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded">POST</span>
                      <span className="text-xs font-mono">/auth/login</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {/* Protected: Get Me */}
                  <button
                    onClick={() => { setSandboxEndpoint("me"); handleGetMeSim(); }}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left transition ${
                      sandboxEndpoint === "me" ? t.btnActive : t.btnInactive
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 rounded">GET</span>
                      <span className="text-xs font-mono">/users/me</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-amber-500" />
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </div>
                  </button>

                  {/* Protected: Get Tasks */}
                  <button
                    onClick={() => { setSandboxEndpoint("tasks_get"); handleGetTasksSim(); }}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left transition ${
                      sandboxEndpoint === "tasks_get" ? t.btnActive : t.btnInactive
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 rounded">GET</span>
                      <span className="text-xs font-mono">/tasks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-amber-500" />
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </div>
                  </button>

                  {/* Protected: Post Tasks */}
                  <button
                    onClick={() => { setSandboxEndpoint("tasks_post"); }}
                    className={`sm:col-span-2 flex items-center justify-between p-3 rounded-lg border text-left transition ${
                      sandboxEndpoint === "tasks_post" ? t.btnActive : t.btnInactive
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded">POST</span>
                      <span className="text-xs font-mono">/tasks</span>
                      <span className={`text-[10px] ${t.mutedText} italic`}>(create user task ownership)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-amber-500" />
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Sandbox Form Action Panel */}
              <div className={`${t.cardBg} border ${t.border} rounded-xl p-5 shadow-sm flex-1 flex flex-col justify-between min-h-[300px]`}>
                
                <div className="w-full">
                  <div className={`flex items-center justify-between pb-3 border-b ${t.border} mb-4`}>
                    <h4 className={`text-sm font-semibold ${t.titleText} flex items-center gap-2`}>
                      {sandboxEndpoint === "register" && <><UserPlus className={`w-4 h-4 ${t.accentText}`} /> User Registration</>}
                      {sandboxEndpoint === "login" && <><LogIn className={`w-4 h-4 ${t.accentText}`} /> User Login</>}
                      {sandboxEndpoint === "me" && <><User className={`w-4 h-4 ${t.accentText}`} /> User Profile (Protected)</>}
                      {sandboxEndpoint === "tasks_get" && <><CheckCircle2 className={`w-4 h-4 ${t.accentText}`} /> User Tasks List (Protected)</>}
                      {sandboxEndpoint === "tasks_post" && <><Plus className={`w-4 h-4 ${t.accentText}`} /> Create Task (Protected)</>}
                    </h4>
                    <span className={`text-xs font-mono ${t.mutedText}`}>FastAPI Form Context</span>
                  </div>

                  {/* Form 1: Register */}
                  {sandboxEndpoint === "register" && (
                    <form onSubmit={handleRegisterSim} className="space-y-4">
                      <div>
                        <label className={`block text-xs font-semibold ${t.mutedText} mb-1.5`}>USERNAME</label>
                        <input
                          type="text"
                          required
                          value={regUsername}
                          onChange={(e) => setRegUsername(e.target.value)}
                          placeholder="e.g. johndoe"
                          className={`w-full ${t.inputBg} border ${t.border} px-3.5 py-2 rounded-lg text-sm placeholder-slate-500 focus:outline-none transition font-mono`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-semibold ${t.mutedText} mb-1.5`}>EMAIL ADDRESS</label>
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="e.g. john@example.com"
                          className={`w-full ${t.inputBg} border ${t.border} px-3.5 py-2 rounded-lg text-sm placeholder-slate-500 focus:outline-none transition font-mono`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-semibold ${t.mutedText} mb-1.5`}>PASSWORD</label>
                        <div className="relative">
                          <input
                            type={showPasswordReg ? "text" : "password"}
                            required
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="Min 6 characters"
                            className={`w-full ${t.inputBg} border ${t.border} pl-3.5 pr-10 py-2 rounded-lg text-sm placeholder-slate-500 focus:outline-none transition font-mono`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswordReg(!showPasswordReg)}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${t.mutedText} hover:text-slate-900 dark:hover:text-white`}
                          >
                            {showPasswordReg ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={`w-full bg-gradient-to-r ${t.btnGradient} font-semibold py-2.5 px-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition shadow-md text-xs tracking-wider uppercase mt-2 flex items-center justify-center gap-2`}
                      >
                        <UserPlus className="w-4 h-4 stroke-[2.5]" />
                        Submit POST /auth/register
                      </button>
                    </form>
                  )}

                  {/* Form 2: Login */}
                  {sandboxEndpoint === "login" && (
                    <form onSubmit={handleLoginSim} className="space-y-4">
                      <div>
                        <label className={`block text-xs font-semibold ${t.mutedText} mb-1.5`}>USERNAME OR EMAIL</label>
                        <input
                          type="text"
                          required
                          value={loginUsername}
                          onChange={(e) => setLoginUsername(e.target.value)}
                          placeholder="admin or user@example.com"
                          className={`w-full ${t.inputBg} border ${t.border} px-3.5 py-2 rounded-lg text-sm placeholder-slate-500 focus:outline-none transition font-mono`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-semibold ${t.mutedText} mb-1.5`}>PASSWORD</label>
                        <div className="relative">
                          <input
                            type={showPasswordLog ? "text" : "password"}
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="Password text"
                            className={`w-full ${t.inputBg} border ${t.border} pl-3.5 pr-10 py-2 rounded-lg text-sm placeholder-slate-500 focus:outline-none transition font-mono`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswordLog(!showPasswordLog)}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${t.mutedText} hover:text-slate-900 dark:hover:text-white`}
                          >
                            {showPasswordLog ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={`w-full bg-gradient-to-r ${t.btnGradient} font-semibold py-2.5 px-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition shadow-md text-xs tracking-wider uppercase mt-2 flex items-center justify-center gap-2`}
                      >
                        <LogIn className="w-4 h-4 stroke-[2.5]" />
                        Submit POST /auth/login
                      </button>
                    </form>
                  )}

                  {/* View 3: Profile Profile Info (Protected) */}
                  {sandboxEndpoint === "me" && (
                    <div className="space-y-4">
                      {currentToken ? (
                        <div className={`${t.innerBg} p-4 border ${t.border} rounded-xl space-y-3`}>
                          <div className="flex items-center gap-3">
                            <div className={`p-2 ${t.cardBg} border ${t.border} rounded-lg ${t.accentText}`}>
                              <User className="w-5 h-5" />
                            </div>
                            <div>
                              <p className={`text-sm font-semibold ${t.titleText}`}>@{loggedInUser?.username}</p>
                              <p className={`text-xs ${t.mutedText}`}>Authorized User Profile</p>
                            </div>
                          </div>
                          <div className={`grid grid-cols-2 gap-3 pt-3 border-t ${t.border} text-xs font-mono`}>
                            <div>
                              <p className={t.mutedText}>DATABASE ID</p>
                              <p className={t.text}>{loggedInUser?.id}</p>
                            </div>
                            <div>
                              <p className={t.mutedText}>IS ACTIVE</p>
                              <p className="text-emerald-500 font-semibold">True</p>
                            </div>
                            <div className="col-span-2">
                              <p className={t.mutedText}>EMAIL ADDRESS</p>
                              <p className={`${t.text} text-ellipsis overflow-hidden`}>{loggedInUser?.email}</p>
                            </div>
                            <div className="col-span-2">
                              <p className={t.mutedText}>CREATED AT</p>
                              <p className={`${t.text} text-xs`}>{loggedInUser?.created_at}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`text-center py-6 ${t.mutedText} border border-dashed ${t.border} rounded-xl ${t.innerBg}`}>
                          <Lock className="w-8 h-8 opacity-40 mx-auto mb-2" />
                          <p className="text-xs font-medium">Authentication token required.</p>
                          <p className="text-[10px] mt-1 max-w-xs mx-auto">Please login first to generate a valid Bearer Token for this endpoint.</p>
                        </div>
                      )}
                      <button
                        onClick={handleGetMeSim}
                        className={`w-full ${t.innerBg} border ${t.border} hover:bg-slate-100 dark:hover:bg-slate-800 font-medium py-2 rounded-lg active:scale-[0.98] transition text-xs ${t.text} mt-2 flex items-center justify-center gap-1.5 shadow-sm`}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Trigger GET /users/me
                      </button>
                    </div>
                  )}

                  {/* View 4: Get Tasks (Protected) */}
                  {sandboxEndpoint === "tasks_get" && (
                    <div className="space-y-4">
                      {currentToken ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className={`text-xs ${t.mutedText} font-mono`}>
                              DB Filter: <code>owner_id == {loggedInUser?.id}</code>
                            </span>
                            <span className={`text-[10px] ${t.accentBg} px-2 py-0.5 rounded border border-emerald-500/20`}>
                              {dbTasks.filter(t => t.owner_id === loggedInUser?.id).length} Saved Tasks
                            </span>
                          </div>

                          <div className="max-h-[180px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                            {dbTasks.filter(t => t.owner_id === loggedInUser?.id).length > 0 ? (
                              dbTasks.filter(t => t.owner_id === loggedInUser?.id).map((task) => (
                                <div key={task.id} className={`flex items-start justify-between p-3 ${t.innerBg} border ${t.border} rounded-lg group`}>
                                  <div className="flex items-start gap-2.5">
                                    <button 
                                      onClick={() => toggleTaskSim(task.id)}
                                      className={`mt-0.5 p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-850 border transition ${
                                        task.is_completed 
                                          ? "text-emerald-500 border-emerald-500/30 bg-emerald-500/10" 
                                          : "text-slate-400 border-slate-300 dark:border-slate-800"
                                      }`}
                                    >
                                      <CheckCircle2 className="w-4 h-4" />
                                    </button>
                                    <div>
                                      <p className={`text-xs font-semibold ${task.is_completed ? `line-through ${t.mutedText}` : t.text}`}>
                                        {task.title}
                                      </p>
                                      {task.description && (
                                        <p className={`text-[10px] ${t.mutedText} mt-0.5`}>{task.description}</p>
                                      )}
                                      <p className={`text-[9px] ${t.mutedText} opacity-80 font-mono mt-1`}>ID: {task.id} • Created: {new Date(task.created_at).toLocaleTimeString()}</p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => deleteTaskSim(task.id)}
                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-rose-400 transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className={`text-center py-6 ${t.mutedText} border border-dashed ${t.border} rounded-xl ${t.innerBg}`}>
                                <p className="text-xs">No tasks found for you.</p>
                                <p className="text-[10px] mt-0.5">Use the "POST /tasks" form to add task items owned by your account.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className={`text-center py-6 ${t.mutedText} border border-dashed ${t.border} rounded-xl ${t.innerBg}`}>
                          <Lock className="w-8 h-8 opacity-40 mx-auto mb-2" />
                          <p className="text-xs font-medium">Authentication token required.</p>
                          <p className="text-[10px] mt-1 max-w-xs mx-auto">Please login first to retrieve tasks linked to your user record.</p>
                        </div>
                      )}
                      <button
                        onClick={handleGetTasksSim}
                        className={`w-full ${t.innerBg} border ${t.border} hover:bg-slate-100 dark:hover:bg-slate-800 font-medium py-2 rounded-lg active:scale-[0.98] transition text-xs ${t.text} mt-2 flex items-center justify-center gap-1.5 shadow-sm`}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Trigger GET /tasks
                      </button>
                    </div>
                  )}

                  {/* Form 5: Post Tasks (Protected) */}
                  {sandboxEndpoint === "tasks_post" && (
                    <form onSubmit={handleCreateTaskSim} className="space-y-4">
                      {currentToken ? (
                        <>
                          <div>
                            <label className={`block text-xs font-semibold ${t.mutedText} mb-1.5`}>TASK TITLE</label>
                            <input
                              type="text"
                              required
                              value={newTaskTitle}
                              onChange={(e) => setNewTaskTitle(e.target.value)}
                              placeholder="e.g. Design secure routes"
                              className={`w-full ${t.inputBg} border ${t.border} px-3.5 py-2 rounded-lg text-sm placeholder-slate-500 focus:outline-none transition`}
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-semibold ${t.mutedText} mb-1.5`}>DESCRIPTION (OPTIONAL)</label>
                            <input
                              type="text"
                              value={newTaskDesc}
                              onChange={(e) => setNewTaskDesc(e.target.value)}
                              placeholder="e.g. Add ownership verification decorators"
                              className={`w-full ${t.inputBg} border ${t.border} px-3.5 py-2 rounded-lg text-sm placeholder-slate-500 focus:outline-none transition`}
                            />
                          </div>
                          <button
                            type="submit"
                            className={`w-full bg-gradient-to-r ${t.btnGradient} font-semibold py-2.5 px-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition shadow-md text-xs tracking-wider uppercase mt-2 flex items-center justify-center gap-1.5`}
                          >
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                            Submit POST /tasks
                          </button>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <div className={`text-center py-8 ${t.mutedText} border border-dashed ${t.border} rounded-xl ${t.innerBg}`}>
                            <Lock className="w-8 h-8 opacity-40 mx-auto mb-2" />
                            <p className="text-xs font-medium">Authorization credentials missing.</p>
                            <p className="text-[10px] mt-1 max-w-xs mx-auto">Only authenticated users can register new tasks linked to their specific client database ID.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSandboxEndpoint("login")}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-lg active:scale-[0.98] transition text-xs shadow"
                          >
                            Go to Login
                          </button>
                        </div>
                      )}
                    </form>
                  )}
                </div>

                <div className={`mt-4 pt-3 border-t ${t.border} text-[11px] ${t.mutedText} flex items-center gap-2`}>
                  <Info className={`w-3.5 h-3.5 ${t.accentText} shrink-0`} />
                  <p>In-memory FastAPI emulation model maintains reactive relation mappings and state.</p>
                </div>
              </div>

            </div>

            {/* Right side: Console output & response payload */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* HTTP Request/Response Split-Screen Viewer */}
              <div className={`${t.cardBg} border ${t.border} rounded-xl p-4 shadow-sm flex flex-col h-[340px]`}>
                <div className={`flex items-center justify-between pb-2.5 border-b ${t.border} mb-3`}>
                  <span className={`text-xs font-semibold ${t.titleText} flex items-center gap-1.5`}>
                    <Database className={`w-3.5 h-3.5 ${t.accentText}`} />
                    FastAPI Network Inspector
                  </span>
                  <span className={`text-[10px] font-mono ${t.innerBg} ${t.text} border ${t.border} px-2 py-0.5 rounded`}>
                    HTTP/1.1
                  </span>
                </div>

                {lastApiCall ? (
                  <div className="flex-1 flex flex-col justify-between overflow-hidden text-xs">
                    
                    {/* Header bar describing call */}
                    <div className={`flex items-center justify-between ${t.innerBg} p-2 rounded-lg border ${t.border} mb-3 font-mono`}>
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          lastApiCall.method === "GET" ? `${t.accentBg} border border-indigo-500/20` : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        }`}>
                          {lastApiCall.method}
                        </span>
                        <span className={`${t.text} font-semibold truncate max-w-[150px] sm:max-w-[200px]`}>{lastApiCall.url}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lastApiCall.status >= 200 && lastApiCall.status < 300 
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      }`}>
                        STATUS {lastApiCall.status}
                      </span>
                    </div>

                    {/* Split content viewer */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0">
                      
                      {/* Left: Request Parameters */}
                      <div className={`${t.innerBg} rounded-lg p-2.5 border ${t.border} flex flex-col overflow-hidden`}>
                        <span className={`text-[10px] ${t.mutedText} font-semibold uppercase tracking-wider mb-1.5`}>Request details</span>
                        <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[10px]">
                          <div>
                            <span className={t.accentText}>Headers:</span>
                            <pre className={`${t.mutedText} text-[9px] mt-0.5 whitespace-pre-wrap`}>
                              {JSON.stringify(lastApiCall.headers, null, 2)}
                            </pre>
                          </div>
                          {lastApiCall.body && (
                            <div>
                              <span className={t.accentText}>Body Payload:</span>
                              <pre className={`${t.mutedText} text-[9px] mt-0.5 whitespace-pre-wrap`}>
                                {JSON.stringify(lastApiCall.body, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Response Payload */}
                      <div className={`${t.innerBg} rounded-lg p-2.5 border ${t.border} flex flex-col overflow-hidden`}>
                        <span className={`text-[10px] ${t.mutedText} font-semibold uppercase tracking-wider mb-1.5`}>JSON response body</span>
                        <div className="flex-1 overflow-y-auto">
                          <pre className={`${t.text} font-mono text-[10px] whitespace-pre-wrap break-all ${t.cardBg} p-1 rounded border ${t.border}`}>
                            {JSON.stringify(lastApiCall.response, null, 2)}
                          </pre>
                        </div>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div className={`flex-1 flex flex-col items-center justify-center text-center ${t.mutedText} border border-dashed ${t.border} rounded-lg ${t.innerBg}`}>
                    <Layers className="w-10 h-10 opacity-30 mb-2" />
                    <p className="text-xs font-semibold">Inspector Idle</p>
                    <p className="text-[10px] mt-0.5 max-w-xs px-4">Submit form entries or request endpoints on the left to inspect HTTP telemetry headers, schemas, and responses.</p>
                  </div>
                )}
              </div>

              {/* Server Console Logs Panel */}
              <div className={`${t.cardBg} border ${t.border} rounded-xl p-4 shadow-sm flex flex-col h-[280px]`}>
                <div className={`flex items-center justify-between pb-2 border-b ${t.border} mb-2.5`}>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className={`text-xs font-semibold ${t.titleText}`}>
                      Uvicorn Console Logs
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setApiLogs([`[system] Logs cleared at ${new Date().toLocaleTimeString()}`]);
                    }}
                    className={`text-[10px] hover:text-rose-400 ${t.mutedText} font-medium transition py-0.5 px-1.5 ${t.innerBg} rounded border ${t.border}`}
                  >
                    Clear Console
                  </button>
                </div>

                {/* Simulated shell lines */}
                <div className={`flex-1 ${t.innerBg} rounded-lg p-3 border ${t.border} font-mono text-[10px] text-emerald-400 overflow-y-auto space-y-1`}>
                  {apiLogs.map((log, index) => {
                    let color = themeMode === "light" ? "text-emerald-700" : "text-emerald-400";
                    if (log.includes("[system]")) color = themeMode === "light" ? "text-indigo-700 font-semibold" : "text-indigo-400 font-semibold";
                    if (log.includes("[database]")) color = themeMode === "light" ? "text-cyan-700 font-semibold" : "text-cyan-400";
                    if (log.includes("[bcrypt]")) color = themeMode === "light" ? "text-amber-700" : "text-amber-400";
                    if (log.includes("[jwt] font")) color = "text-pink-400";
                    if (log.includes("Error:") || log.includes("failed")) color = "text-rose-500 font-semibold";
                    return (
                      <div key={index} className={`leading-relaxed break-words ${color}`}>
                        {log}
                      </div>
                    );
                  })}
                  <div ref={consoleEndRef} />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Code Explorer */}
        {activeTab === "explorer" && (
          <div className={`${t.cardBg} border ${t.border} rounded-xl overflow-hidden min-h-[550px] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-0`}>
            
            {/* Explorer sidebar: Directory Structure */}
            <div className={`md:col-span-4 border-r ${t.border} p-4 flex flex-col gap-4 ${t.innerBg}`}>
              <div className={`flex items-center justify-between pb-3 border-b ${t.border}`}>
                <span className={`text-xs font-bold ${t.titleText} uppercase tracking-wider flex items-center gap-2`}>
                  <Folder className={`w-4 h-4 ${t.accentText}`} />
                  Filesystem Explorer
                </span>
                <span className={`text-[10px] font-mono ${t.mutedText}`}>Root Directory</span>
              </div>

              {/* Tree Representation */}
              <div className="space-y-1 flex-1 overflow-y-auto text-xs font-mono">
                
                {/* Folder 1: auth_api */}
                <div>
                  <div className={`flex items-center gap-2 py-1 px-1.5 ${t.titleText} font-semibold select-none`}>
                    <Folder className={`w-4 h-4 ${t.accentText} opacity-80`} />
                    <span>auth_api/</span>
                  </div>

                  {/* Inner Files */}
                  <div className={`pl-4 border-l ${t.border} ml-3.5 space-y-0.5 mt-0.5`}>
                    
                    {["main.py", "database.py", "models.py", "schemas.py", "auth.py"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedFile(f as keyof typeof codeFiles)}
                        className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg transition-all text-left ${
                          selectedFile === f
                            ? `${t.tabActive} font-medium`
                            : `${t.tabInactive}`
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70" />
                          <span className="truncate">{f}</span>
                        </div>
                        {selectedFile === f && <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                      </button>
                    ))}

                    {/* Subfolder: routes */}
                    <div className="mt-1">
                      <div className={`flex items-center gap-2 py-0.5 px-1 ${t.titleText} font-semibold select-none`}>
                        <Folder className={`w-3.5 h-3.5 ${t.accentText} opacity-85`} />
                        <span className="text-[11px]">routes/</span>
                      </div>
                      <div className={`pl-3 border-l ${t.border} ml-2.5 space-y-0.5`}>
                        {["routes/auth.py", "routes/tasks.py"].map((f) => (
                          <button
                            key={f}
                            onClick={() => setSelectedFile(f as keyof typeof codeFiles)}
                            className={`w-full flex items-center justify-between py-1 px-2 rounded-lg transition-all text-left ${
                              selectedFile === f
                                ? `${t.tabActive} font-medium`
                                : `${t.tabInactive}`
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate text-[11px]">
                              <FileCode className="w-3.5 h-3.5 opacity-80" />
                              <span className="truncate">{f.split("/")[1]}</span>
                            </div>
                            {selectedFile === f && <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Configuration Files */}
                <div className={`pt-2 border-t ${t.border} mt-2 space-y-0.5`}>
                  {[".env", "requirements.txt"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFile(f as keyof typeof codeFiles)}
                      className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg transition-all text-left ${
                        selectedFile === f
                          ? `${t.tabActive} font-medium`
                          : `${t.tabInactive}`
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {f === ".env" ? <Settings className="w-3.5 h-3.5 text-amber-500" /> : <FileCode className="w-3.5 h-3.5 text-indigo-400" />}
                        <span className="truncate">{f}</span>
                      </div>
                      {selectedFile === f && <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                    </button>
                  ))}
                </div>

              </div>
              
              {/* File details note */}
              <div className={`${t.innerBg} p-3 border ${t.border} rounded-xl text-xs space-y-2`}>
                <span className={`font-semibold ${t.titleText} block`}>FastAPI Architecture</span>
                <p className={`${t.mutedText} text-[11px] leading-relaxed`}>
                  This modular setup isolates user verification (JWT logic in <code>auth.py</code>) from routing controllers, maintaining the single responsibility principle.
                </p>
              </div>

            </div>

            {/* Code Panel Display */}
            <div className="md:col-span-8 flex flex-col min-h-[500px]">
              
              {/* Toolbar */}
              <div className={`${t.innerBg} border-b ${t.border} px-4 py-2.5 flex items-center justify-between`}>
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs font-mono font-medium ${t.cardBg} ${t.text} border ${t.border} px-2.5 py-1 rounded-lg shadow-sm`}>
                    {codeFiles[selectedFile].path}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(codeFiles[selectedFile].code)}
                  className={`flex items-center gap-1.5 text-xs ${t.mutedText} hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 py-1 px-2.5 rounded-lg transition border ${t.border} ${t.cardBg} shadow-sm`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code viewer workspace */}
              <div className={`flex-1 ${themeMode === "light" ? "bg-[#fdfbf7]" : "bg-slate-950"} overflow-auto p-4 select-text border-l ${t.border}`}>
                <div className="table w-full border-collapse">
                  {renderHighlightedCode(codeFiles[selectedFile].code)}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 3: Architecture & Schema Diagrams */}
        {activeTab === "architecture" && (
          <div className="space-y-6">
            
            {/* Database schema layout */}
            <div className={`${t.cardBg} border ${t.border} rounded-xl p-5 shadow-sm space-y-4`}>
              <div className={`flex items-center gap-2 pb-3 border-b ${t.border}`}>
                <Database className={`w-5 h-5 ${t.accentText}`} />
                <div>
                  <h3 className={`text-sm font-semibold ${t.titleText}`}>Relational Database Schemas (SQLAlchemy)</h3>
                  <p className={`text-xs ${t.mutedText}`}>PostgreSQL table mappings showing relationships & model validation types.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Users Table Card */}
                <div className={`${t.innerBg} border ${t.border} rounded-xl overflow-hidden shadow`}>
                  <div className={`${t.cardBg} border-b ${t.border} px-4 py-2.5 flex justify-between items-center`}>
                    <span className={`text-xs font-bold ${t.titleText} font-mono flex items-center gap-2`}>
                      <User className="w-4 h-4 text-emerald-500" />
                      users
                    </span>
                    <span className={`text-[10px] ${t.mutedText} uppercase font-mono`}>Entity Model</span>
                  </div>
                  <div className="p-4 space-y-2 text-xs font-mono">
                    <div className={`flex justify-between items-center py-1 border-b ${t.border}`}>
                      <span className="text-emerald-500 font-semibold">id</span>
                      <span className={t.mutedText}>INTEGER (PK, AUTO-INC)</span>
                    </div>
                    <div className={`flex justify-between items-center py-1 border-b ${t.border}`}>
                      <span className={t.text}>email</span>
                      <span className={t.mutedText}>VARCHAR (UNIQUE, INDEX, NOT NULL)</span>
                    </div>
                    <div className={`flex justify-between items-center py-1 border-b ${t.border}`}>
                      <span className={t.text}>username</span>
                      <span className={t.mutedText}>VARCHAR (UNIQUE, INDEX, NOT NULL)</span>
                    </div>
                    <div className={`flex justify-between items-center py-1 border-b ${t.border}`}>
                      <span className={t.mutedText}>hashed_password</span>
                      <span className={t.mutedText}>VARCHAR (NOT NULL)</span>
                    </div>
                    <div className={`flex justify-between items-center py-1 border-b ${t.border}`}>
                      <span className={t.text}>is_active</span>
                      <span className={t.mutedText}>BOOLEAN (DEFAULT true)</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className={t.text}>created_at</span>
                      <span className={t.mutedText}>DATETIME (DEFAULT serverfunc.now())</span>
                    </div>
                  </div>
                </div>

                {/* Tasks Table Card */}
                <div className={`${t.innerBg} border ${t.border} rounded-xl overflow-hidden shadow`}>
                  <div className={`${t.cardBg} border-b ${t.border} px-4 py-2.5 flex justify-between items-center`}>
                    <span className={`text-xs font-bold ${t.titleText} font-mono flex items-center gap-2`}>
                      <CheckCircle2 className={`w-4 h-4 ${t.accentText}`} />
                      tasks
                    </span>
                    <span className={`text-[10px] ${t.mutedText} uppercase font-mono`}>Entity Model</span>
                  </div>
                  <div className="p-4 space-y-2 text-xs font-mono">
                    <div className={`flex justify-between items-center py-1 border-b ${t.border}`}>
                      <span className="text-cyan-500 font-semibold">id</span>
                      <span className={t.mutedText}>INTEGER (PK, AUTO-INC)</span>
                    </div>
                    <div className={`flex justify-between items-center py-1 border-b ${t.border}`}>
                      <span className={t.text}>title</span>
                      <span className={t.mutedText}>VARCHAR (INDEX, NOT NULL)</span>
                    </div>
                    <div className={`flex justify-between items-center py-1 border-b ${t.border}`}>
                      <span className={t.text}>description</span>
                      <span className={t.mutedText}>TEXT (NULLABLE)</span>
                    </div>
                    <div className={`flex justify-between items-center py-1 border-b ${t.border}`}>
                      <span className={t.text}>is_completed</span>
                      <span className={t.mutedText}>BOOLEAN (DEFAULT false)</span>
                    </div>
                    <div className={`flex justify-between items-center py-1 border-b ${t.border}`}>
                      <span className={t.text}>created_at</span>
                      <span className={t.mutedText}>DATETIME (DEFAULT serverfunc.now())</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-amber-500 font-semibold flex items-center gap-1">
                        <Link2 className="w-3.5 h-3.5" /> owner_id
                      </span>
                      <span className={`${t.mutedText} text-right`}>INTEGER (FK → users.id, CASCADE)</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Authentication Flow Walkthrough */}
            <div className={`${t.cardBg} border ${t.border} rounded-xl p-5 shadow-sm space-y-4`}>
              <div className={`flex items-center gap-2 pb-3 border-b ${t.border}`}>
                <Lock className="w-5 h-5 text-indigo-500" />
                <div>
                  <h3 className={`text-sm font-semibold ${t.titleText}`}>OAuth2 JWT Authentication Flowchart</h3>
                  <p className={`text-xs ${t.mutedText}`}>Step-by-step security lifecycle during client requests.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                
                {/* Step 1 */}
                <div className={`${t.innerBg} p-4 border ${t.border} rounded-xl relative flex flex-col justify-between gap-3 shadow`}>
                  <div>
                    <span className={`inline-block px-2 py-0.5 ${t.cardBg} ${t.mutedText} border ${t.border} rounded text-[9px] font-mono mb-2`}>STEP 1</span>
                    <h4 className={`font-semibold ${t.titleText} mb-1`}>User Registers</h4>
                    <p className={`${t.mutedText} text-[11px] leading-relaxed`}>Client makes a <code>POST /auth/register</code> request. FastAPI hashes password with passlib/bcrypt and stores credentials securely.</p>
                  </div>
                  <span className={`${t.accentText} font-mono text-[10px] flex items-center gap-1`}>
                    bcrypt.hash() <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                {/* Step 2 */}
                <div className={`${t.innerBg} p-4 border ${t.border} rounded-xl relative flex flex-col justify-between gap-3 shadow`}>
                  <div>
                    <span className={`inline-block px-2 py-0.5 ${t.cardBg} ${t.mutedText} border ${t.border} rounded text-[9px] font-mono mb-2`}>STEP 2</span>
                    <h4 className={`font-semibold ${t.titleText} mb-1`}>Login & Token Issue</h4>
                    <p className={`${t.mutedText} text-[11px] leading-relaxed`}>User sends credentials to <code>POST /auth/login</code>. Server verifies hash, creates JWT payload, signs with SECRET_KEY and responds with Bearer token.</p>
                  </div>
                  <span className={`${t.accentText} font-mono text-[10px] flex items-center gap-1`}>
                    jwt.encode() <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                {/* Step 3 */}
                <div className={`${t.innerBg} p-4 border ${t.border} rounded-xl relative flex flex-col justify-between gap-3 shadow`}>
                  <div>
                    <span className={`inline-block px-2 py-0.5 ${t.cardBg} ${t.mutedText} border ${t.border} rounded text-[9px] font-mono mb-2`}>STEP 3</span>
                    <h4 className={`font-semibold ${t.titleText} mb-1`}>Protected Operations</h4>
                    <p className={`${t.mutedText} text-[11px] leading-relaxed`}>For protected endpoints (e.g. <code>GET /tasks</code>), client transmits the JWT inside the <code>Authorization: Bearer &lt;token&gt;</code> HTTP header.</p>
                  </div>
                  <span className={`${t.accentText} font-mono text-[10px] flex items-center gap-1`}>
                    OAuth2PasswordBearer() <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                {/* Step 4 */}
                <div className={`${t.innerBg} p-4 border ${t.border} rounded-xl relative flex flex-col justify-between gap-3 shadow`}>
                  <div>
                    <span className={`inline-block px-2 py-0.5 ${t.cardBg} ${t.mutedText} border ${t.border} rounded text-[9px] font-mono mb-2`}>STEP 4</span>
                    <h4 className={`font-semibold ${t.titleText} mb-1`}>Decryption & Verification</h4>
                    <p className={`${t.mutedText} text-[11px] leading-relaxed`}>The <code>get_current_user</code> dependency decodes the token, checks claims, filters resources from PostgreSQL matching user ownership, and executes safe response.</p>
                  </div>
                  <span className="text-emerald-500 font-semibold text-[10px] flex items-center gap-1">
                    Access Granted! <Check className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* Tab 4: Step-by-Step running guide */}
        {activeTab === "guide" && (
          <div className="space-y-6">
            
            <div className={`${t.cardBg} border ${t.border} rounded-xl p-6 shadow-sm space-y-4`}>
              <div className={`flex items-center gap-3 pb-3 border-b ${t.border}`}>
                <Terminal className={`w-5.5 h-5.5 ${t.accentText}`} />
                <div>
                  <h3 className={`text-base font-semibold ${t.titleText}`}>How to Run locally with PostgreSQL</h3>
                  <p className={`text-xs ${t.mutedText}`}>Step-by-step commands to get this FastAPI server up and running on your personal machine.</p>
                </div>
              </div>

              {/* Instructions tree */}
              <div className="space-y-4 pt-2">
                
                {/* Install Python & virtualenv */}
                <div className="space-y-2">
                  <span className={`text-xs font-semibold ${t.titleText} block`}>1. Clone Workspace & Create Virtual Environment</span>
                  <div className={`${t.innerBg} p-3 rounded-lg border ${t.border} flex items-center justify-between font-mono text-xs shadow-inner`}>
                    <code className={t.text}>
                      python3 -m venv venv && source venv/bin/activate
                    </code>
                    <button
                      onClick={() => copyToClipboard("python3 -m venv venv && source venv/bin/activate")}
                      className={`p-1.5 ${t.cardBg} hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border ${t.border} transition shadow-sm`}
                      title="Copy command"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Install Requirements */}
                <div className="space-y-2">
                  <span className={`text-xs font-semibold ${t.titleText} block`}>2. Install Dependencies</span>
                  <p className={`text-[11px] ${t.mutedText}`}>This pulls the packages specified in <code>requirements.txt</code> (FastAPI, passlib, uvicorn, jose, sqlalchemy, psycopg2-binary).</p>
                  <div className={`${t.innerBg} p-3 rounded-lg border ${t.border} flex items-center justify-between font-mono text-xs shadow-inner`}>
                    <code className={t.text}>
                      pip install -r auth_api/requirements.txt
                    </code>
                    <button
                      onClick={() => copyToClipboard("pip install -r auth_api/requirements.txt")}
                      className={`p-1.5 ${t.cardBg} hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border ${t.border} transition shadow-sm`}
                      title="Copy command"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Database configuration */}
                <div className="space-y-2">
                  <span className={`text-xs font-semibold ${t.titleText} block`}>3. Setup Environment Variables (.env)</span>
                  <p className={`text-[11px] ${t.mutedText}`}>Ensure a local PostgreSQL database exists and match credentials inside the <code>.env</code> file:</p>
                  <pre className={`${t.innerBg} p-3 rounded-lg border ${t.border} font-mono text-[11px] ${t.mutedText} whitespace-pre shadow-inner overflow-x-auto`}>
{`# Create auth_db database inside Postgres, then set DATABASE_URL:
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/auth_db
SECRET_KEY=9a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30`}
                  </pre>
                </div>

                {/* Boot Server */}
                <div className="space-y-2">
                  <span className={`text-xs font-semibold ${t.titleText} block`}>4. Launch FastAPI Uvicorn Server</span>
                  <p className={`text-[11px] ${t.mutedText}`}>Run the uvicorn worker thread. FastAPI automatically executes <code>Base.metadata.create_all(bind=engine)</code> on startup to create the PostgreSQL tables.</p>
                  <div className={`${t.innerBg} p-3 rounded-lg border ${t.border} flex items-center justify-between font-mono text-xs shadow-inner`}>
                    <code className={t.text}>
                      cd auth_api && uvicorn main:app --reload --port 8000
                    </code>
                    <button
                      onClick={() => copyToClipboard("cd auth_api && uvicorn main:app --reload --port 8000")}
                      className={`p-1.5 ${t.cardBg} hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border ${t.border} transition shadow-sm`}
                      title="Copy command"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Swagger UI access */}
                <div className={`${t.innerBg} p-4 border border-indigo-500/15 rounded-xl flex gap-3 shadow-sm`}>
                  <Info className={`w-5 h-5 ${t.accentText} shrink-0 mt-0.5`} />
                  <div className={`text-xs space-y-1.5 ${t.text}`}>
                    <p className={`font-semibold ${t.titleText}`}>Swagger API documentation ready</p>
                    <p className="leading-relaxed">Once the server starts, open your browser and navigate to <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" className={`${t.accentText} underline font-semibold flex-inline items-center gap-1`}>http://localhost:8000/docs <ExternalLink className="w-3 h-3 inline" /></a>.</p>
                    <p className={`leading-relaxed text-[11px] ${t.mutedText}`}>FastAPI auto-generates beautiful interactive Swagger UI. You can register, authorize with the "Authorize" padlock header using credentials, and test the protected task endpoints natively in your browser.</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className={`border-t ${t.border} py-4 px-6 text-center ${t.mutedText} text-xs font-mono`}>
        FastAPI PostgreSQL Auth System Blueprint • Developed using React & Vite in Google AI Studio
      </footer>

    </div>
  );
}
