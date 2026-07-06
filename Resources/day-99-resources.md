# 📚 Day 99 Resources - Async/Await in FastAPI

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| FastAPI: Concurrency and Async | https://fastapi.tiangolo.com/async/ | Official FastAPI async/await guide |
| Python: asyncio | https://docs.python.org/3/library/asyncio.html | Official Python asyncio documentation |
| Python: async/await | https://docs.python.org/3/reference/compound_stmts.html#async-def | Async function syntax |
| httpx: Async Client | https://www.python-httpx.org/async/ | Async HTTP client documentation |
| httpx: Quickstart | https://www.python-httpx.org/quickstart/ | httpx quickstart guide |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| FastAPI Async/Await Tutorial | https://youtu.be/6ThXsUwLWvc | 20 min |
| Python asyncio Crash Course | https://youtu.be/2jM5l1QxE1g | 25 min |
| httpx Async Client | https://youtu.be/0DdM6H1QjYM | 15 min |

## 📦 Essential Packages

| Package | Command | Purpose |
|---------|---------|---------|
| httpx | `pip install httpx` | Async HTTP client |
| uvicorn[standard] | `pip install uvicorn[standard]` | ASGI server with async support |
| aiofiles | `pip install aiofiles` | Async file operations |

## 🔧 Async Patterns Reference

### Basic Patterns

| Pattern | Code | Use Case |
|---------|------|----------|
| Single async | `result = await async_func()` | One I/O operation |
| Parallel | `results = await asyncio.gather(*tasks)` | Multiple I/O operations |
| Background | `task = asyncio.create_task(long_task())` | Fire-and-forget |
| Timeout | `await asyncio.wait_for(task, timeout=5)` | Time-limited operations |

### httpx Async Example

```python
import httpx
import asyncio

async def fetch_data():
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get("https://api.example.com/data")
        return response.json()

# Multiple requests
async def fetch_multiple():
    async with httpx.AsyncClient() as client:
        tasks = [
            client.get("https://api.example.com/users"),
            client.get("https://api.example.com/posts"),
        ]
        responses = await asyncio.gather(*tasks)
    return [r.json() for r in responses]
```

## 📖 Further Reading

| Article | Link |
|---------|------|
| Python Async/Await Tutorial | https://realpython.com/python-async-features/ |
| FastAPI Async Guide | https://fastapi.tiangolo.com/async/ |
| httpx Async Guide | https://www.python-httpx.org/async/ |

