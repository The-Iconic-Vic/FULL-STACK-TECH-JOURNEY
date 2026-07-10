# 📚 Day 103 Resources - Docker Setup for FastAPI

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| FastAPI Docker Guide | https://fastapi.tiangolo.com/deployment/docker/ | Official FastAPI Docker deployment guide  |
| Docker Python Guide | https://docs.docker.com/guides/python/ | Official Docker Python containerization guide  |
| Dockerfile Reference | https://docs.docker.com/engine/reference/builder/ | Complete Dockerfile instruction reference |
| Docker Compose Reference | https://docs.docker.com/compose/ | Docker Compose documentation |
| Docker Hub Python Image | https://hub.docker.com/_/python | Official Python base images |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| FastAPI Docker Tutorial | https://youtu.be/6ThXsUwLWvc | 25 min |
| Docker Compose for FastAPI | https://youtu.be/2jM5l1QxE1g | 20 min |

## 📦 Essential Docker Resources

| Resource | Purpose |
|----------|---------|
| Docker Desktop | Docker GUI and CLI  |
| Docker Hub | Container image registry  |
| KodeKloud Docker Notes | Docker and FastAPI best practices  |

## 🔧 Dockerfile Best Practices

| Practice | Why |
|----------|-----|
| Use `python:X.X-slim` base | Smaller image size, fewer vulnerabilities  |
| Copy requirements first | Leverage Docker cache for faster builds  |
| Use `.dockerignore` | Exclude unnecessary files from build context  |
| Run as non-root user | Better security in production  |
| Use multi-stage builds | Reduce final image size  |

## 📁 Multi-Stage Build Example

Multi-stage builds help optimize Docker images by separating build and runtime environments :

```dockerfile
# Stage 1: Builder
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Runtime
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY . .
RUN adduser --system appuser
USER appuser
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📖 Further Reading

| Article | Link |
|---------|------|
| FastAPI in Containers | https://fastapi.tiangolo.com/deployment/docker/ |
| Docker Python Best Practices | https://docs.docker.com/develop/develop-images/dockerfile_best-practices/ |
| Production FastAPI Docker Deployment | https://github.com/Kirankumarvel/FastAPI-Docker-Production-Deployment |
| FastAPI Docker Template | https://github.com/manueljesus/fastapi-docker-template |

