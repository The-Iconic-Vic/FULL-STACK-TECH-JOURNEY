from fastapi import FastAPI, Depends
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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
