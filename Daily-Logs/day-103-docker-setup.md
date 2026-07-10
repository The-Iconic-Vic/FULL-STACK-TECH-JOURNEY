# 📅 Day 103: Docker Setup

**Date:** July 10, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Docker Basics, Dockerfile, Docker Compose, PostgreSQL Container, Development vs Production

---

## 📋 Learning Objectives

- ✅ Understand what Docker is and why it's used
- ✅ Create a Dockerfile for Python/FastAPI applications
- ✅ Use Docker Compose for multi-container setup
- ✅ Run FastAPI and PostgreSQL together in containers
- ✅ Use volume mounting for development
- ✅ Apply environment variables in Docker

---

## 🎯 Part 1: What is Docker?

### Definition

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
| **Startup Time** | Seconds | Minutes |
| **Resource Usage** | Lightweight | Heavy |
| **OS** | Shares host OS | Full OS per VM |
| **Size** | MBs | GBs |
| **Performance** | Near-native | Overhead |

---

## 🔧 Part 2: Dockerfile

### What is a Dockerfile?

A Dockerfile is a text file with instructions for building a Docker image. It defines the environment and steps to run your application.

### Dockerfile for FastAPI

```dockerfile
# Use official Python slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Run database migrations
# CMD will handle this at runtime

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Multi-stage Dockerfile (Production)

```dockerfile
# Build stage
FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Production stage
FROM python:3.11-slim

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY . .

# Run as non-root user
RUN addgroup --system --gid 1001 appuser && \
    adduser --system --uid 1001 appuser
USER appuser

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 📝 Part 3: Docker Compose

### What is Docker Compose?

Docker Compose is a tool for defining and running multi-container Docker applications. It uses a YAML file to configure application services.

### docker-compose.yml

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  db:
    image: postgres:15-alpine
    container_name: fastapi_db
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-fastapi_user}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-fastapi_pass}
      POSTGRES_DB: ${POSTGRES_DB:-fastapi_db}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-fastapi_user}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - fastapi_network

  # FastAPI Application
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: fastapi_app
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://${POSTGRES_USER:-fastapi_user}:${POSTGRES_PASSWORD:-fastapi_pass}@db:5432/${POSTGRES_DB:-fastapi_db}
      SECRET_KEY: ${SECRET_KEY:-dev-secret-key}
      ALGORITHM: ${ALGORITHM:-HS256}
      ACCESS_TOKEN_EXPIRE_MINUTES: ${ACCESS_TOKEN_EXPIRE_MINUTES:-30}
      DEBUG: ${DEBUG:-True}
    volumes:
      - ./app:/app/app
      - ./tests:/app/tests
    depends_on:
      db:
        condition: service_healthy
    networks:
      - fastapi_network
    command: >
      sh -c "alembic upgrade head &&
             uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

  # Optional: Adminer for database management
  adminer:
    image: adminer:latest
    container_name: fastapi_adminer
    ports:
      - "8080:8080"
    networks:
      - fastapi_network
    depends_on:
      - db

networks:
  fastapi_network:
    driver: bridge

volumes:
  postgres_data:
```

---

## 🔧 Part 4: Docker Commands

### Building and Running

```bash
# Build and start all services
docker-compose up --build

# Run in background (detached)
docker-compose up -d

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs app

# Rebuild and restart
docker-compose up --build -d
```

### Container Management

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Enter container shell
docker-compose exec app bash

# Run command in container
docker-compose exec app alembic upgrade head

# Copy file to container
docker cp file.txt container_name:/app/file.txt

# Copy file from container
docker cp container_name:/app/file.txt file.txt
```

### Image Management

```bash
# List images
docker images

# Remove image
docker rmi image_name

# Build image only
docker build -t fastapi-app .

# Run image only
docker run -p 8000:8000 fastapi-app
```

---

## 🏗️ Part 5: Complete Docker Setup

### File: `Dockerfile`

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Set Python environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

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
    adduser --system --uid 1001 appuser && \
    chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### File: `docker-compose.yml`

```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    container_name: fastapi_db
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-fastapi_user}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-fastapi_pass}
      POSTGRES_DB: ${POSTGRES_DB:-fastapi_db}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-fastapi_user}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - fastapi_network

  app:
    build: .
    container_name: fastapi_app
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://${POSTGRES_USER:-fastapi_user}:${POSTGRES_PASSWORD:-fastapi_pass}@db:5432/${POSTGRES_DB:-fastapi_db}
      SECRET_KEY: ${SECRET_KEY:-dev-secret-key}
      ALGORITHM: ${ALGORITHM:-HS256}
      ACCESS_TOKEN_EXPIRE_MINUTES: ${ACCESS_TOKEN_EXPIRE_MINUTES:-30}
      DEBUG: ${DEBUG:-True}
    volumes:
      - ./app:/app/app
      - ./tests:/app/tests
    depends_on:
      db:
        condition: service_healthy
    networks:
      - fastapi_network
    command: >
      sh -c "alembic upgrade head &&
             uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

networks:
  fastapi_network:
    driver: bridge

volumes:
  postgres_data:
```

### File: `.dockerignore`

```
# .dockerignore
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
env/
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

### File: `.env`

```bash
# .env
POSTGRES_USER=fastapi_user
POSTGRES_PASSWORD=secure_password_here
POSTGRES_DB=fastapi_db
DATABASE_URL=postgresql://fastapi_user:secure_password_here@db:5432/fastapi_db
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=True
```

### File: `requirements.txt`

```txt
# requirements.txt
fastapi==0.110.0
uvicorn[standard]==0.29.0
sqlalchemy==2.0.28
alembic==1.13.0
python-dotenv==1.0.1
psycopg2-binary==2.9.9
passlib[bcrypt]==1.7.4
python-jose[cryptography]==3.3.0
python-multipart==0.0.9
email-validator==2.1.0
httpx==0.27.0
pytest==8.0.0
pytest-cov==4.1.0
```

---

## 📊 Quick Reference

### Docker Commands

| Command | Purpose |
|---------|---------|
| `docker build -t name .` | Build Docker image |
| `docker run -p 8000:8000 name` | Run container |
| `docker ps` | List running containers |
| `docker stop container_id` | Stop container |
| `docker rm container_id` | Remove container |

### Docker Compose Commands

| Command | Purpose |
|---------|---------|
| `docker-compose up -d` | Start services in background |
| `docker-compose down` | Stop and remove containers |
| `docker-compose logs -f` | Follow logs |
| `docker-compose exec app bash` | Shell into container |
| `docker-compose build` | Rebuild images |

### Common Dockerfile Instructions

| Instruction | Purpose |
|-------------|---------|
| `FROM` | Base image |
| `WORKDIR` | Working directory |
| `COPY` | Copy files |
| `RUN` | Run command |
| `CMD` | Default command |
| `ENV` | Environment variable |
| `EXPOSE` | Port to expose |
| `USER` | User to run as |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `ModuleNotFoundError` | Missing dependency | Add to requirements.txt |
| Port already in use | Another process | Change host port mapping |
| Database connection refused | DB not ready | Use healthcheck |
| Permission denied | Root vs non-root | Change file permissions |
| Volume mount not working | Wrong path | Use absolute paths |
| Build slow | Many layers | Optimize layer order |

---

## ✅ Day 103 Checklist

- [ ] Install Docker and Docker Compose
- [ ] Create Dockerfile
- [ ] Create docker-compose.yml
- [ ] Create .dockerignore
- [ ] Configure environment variables
- [ ] Build Docker image
- [ ] Run with Docker Compose
- [ ] Test API in container
- [ ] Run database migrations in container
- [ ] View logs
- [ ] Stop containers
- [ ] Push code to GitHub

