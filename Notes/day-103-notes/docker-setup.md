# 📘 Docker Setup for FastAPI

## 🎯 What is Docker?

Docker is a platform that allows you to **containerize** applications. Containers package code and dependencies together, ensuring consistent behavior across environments.

### Why Docker?

| Benefit | Description |
|---------|-------------|
| **Consistency** | Works the same on any machine |
| **Isolation** | Applications run independently |
| **Reproducibility** | Share exact environment with team |
| **Portability** | Move between environments easily |
| **Scalability** | Easy to scale horizontally |

### Docker vs Virtual Machines

| Aspect | Docker | Virtual Machine |
|--------|--------|-----------------|
| Startup Time | Seconds | Minutes |
| Resource Usage | Lightweight | Heavy |
| OS | Shares host OS | Full OS per VM |
| Size | MBs | GBs |

---

## 🔧 Part 1: Dockerfile

### What is a Dockerfile?

A Dockerfile is a text file with instructions for building a Docker image.

### Basic Dockerfile for FastAPI

```dockerfile
# Base image
FROM python:3.11-slim

# Working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN addgroup --system --gid 1001 appuser && \
    adduser --system --uid 1001 appuser
USER appuser

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Common Dockerfile Instructions

| Instruction | Purpose | Example |
|-------------|---------|---------|
| `FROM` | Base image | `FROM python:3.11-slim` |
| `WORKDIR` | Working directory | `WORKDIR /app` |
| `COPY` | Copy files | `COPY . .` |
| `RUN` | Run command | `RUN pip install -r requirements.txt` |
| `CMD` | Default command | `CMD ["uvicorn", "main:app"]` |
| `ENV` | Environment variable | `ENV DEBUG=True` |
| `EXPOSE` | Port to expose | `EXPOSE 8000` |
| `USER` | User to run as | `USER appuser` |

---

## 📝 Part 2: Docker Compose

### What is Docker Compose?

Docker Compose defines and runs multi-container Docker applications using a YAML file.

### docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: fastapi_user
      POSTGRES_PASSWORD: fastapi_pass
      POSTGRES_DB: fastapi_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U fastapi_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://fastapi_user:fastapi_pass@db/fastapi_db
    volumes:
      - ./app:/app/app
    depends_on:
      db:
        condition: service_healthy
    command: >
      sh -c "alembic upgrade head &&
             uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

volumes:
  postgres_data:
```

---

## 🔧 Part 3: Docker Commands

### Building and Running

| Command | Purpose |
|---------|---------|
| `docker-compose up --build` | Build and start |
| `docker-compose up -d` | Run in background |
| `docker-compose down` | Stop and remove |
| `docker-compose down -v` | Stop and remove volumes |
| `docker-compose logs -f` | View logs |
| `docker-compose exec app bash` | Shell into container |

### Image Management

| Command | Purpose |
|---------|---------|
| `docker build -t name .` | Build image |
| `docker images` | List images |
| `docker rmi image_name` | Remove image |

### Container Management

| Command | Purpose |
|---------|---------|
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker stop container_id` | Stop container |
| `docker rm container_id` | Remove container |

---

## 🔐 Part 4: Environment Variables

### In Docker

```yaml
environment:
  DATABASE_URL: postgresql://user:pass@db/db
  SECRET_KEY: ${SECRET_KEY:-dev-key}
```

### Using .env file

```bash
# .env
DATABASE_URL=postgresql://user:pass@db/db
SECRET_KEY=super-secret-key
```

```yaml
# docker-compose.yml
env_file:
  - .env
```

---

## 📁 Part 5: .dockerignore

```dockerignore
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
*.so
*.egg
*.egg-info/
dist/
build/
venv/
.venv/
.git/
.gitignore
.dockerignore
.env
.env.local
test.db
*.db
*.sqlite3
.pytest_cache/
.coverage
htmlcov/
.vscode/
.idea/
*.log
```

---

## 📊 Quick Reference

### Docker vs Docker Compose

| Aspect | Docker | Docker Compose |
|--------|--------|----------------|
| Purpose | Single container | Multiple containers |
| File | Dockerfile | docker-compose.yml |
| Command | `docker build/run` | `docker-compose up` |
| Use Case | Simple apps | Complex apps |

### Common Ports

| Service | Port |
|---------|------|
| FastAPI | 8000 |
| PostgreSQL | 5432 |
| Redis | 6379 |
| Adminer | 8080 |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `ModuleNotFoundError` | Missing dependency | Add to requirements.txt |
| Port already in use | Another process | Change host port |
| Database connection refused | DB not ready | Use healthcheck |
| Permission denied | Root vs non-root | Change file permissions |
| Build slow | Many layers | Optimize layer order |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Docker = Containerization** | Package app with dependencies |
| **Dockerfile defines images** | Instructions for building |
| **Docker Compose for multi-container** | Run multiple services together |
| **Volumes persist data** | Database storage survives restarts |
| **Environment variables in containers** | Configuration at runtime |
| **Healthchecks ensure readiness** | Wait for services to be ready |
