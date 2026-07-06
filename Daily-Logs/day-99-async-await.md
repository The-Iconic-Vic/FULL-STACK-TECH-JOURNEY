# 📅 Day 99: Async/Await in FastAPI

**Date:** July 6, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Async/Await, asyncio, httpx, Performance, I/O vs CPU Bound

---

## 📋 Learning Objectives

- ✅ Understand what async/await is in Python
- ✅ Differentiate between I/O bound and CPU bound tasks
- ✅ Use `async def` vs `def` in FastAPI endpoints
- ✅ Implement async database queries
- ✅ Make async external API calls with httpx
- ✅ Measure performance differences

---

## 🎯 Part 1: Async Fundamentals

### What is Async/Await?

Async/await is a feature in Python that allows you to write concurrent code using the `async` and `await` keywords. It enables non-blocking execution, allowing your application to handle multiple tasks simultaneously.

### Synchronous vs Asynchronous

| Aspect | Synchronous | Asynchronous |
|--------|-------------|--------------|
| **Execution** | One task at a time | Multiple tasks concurrently |
| **Blocking** | Blocks until complete | Non-blocking |
| **Performance** | Slower for I/O operations | Faster for I/O operations |
| **Complexity** | Simpler | More complex |
| **Use Case** | CPU-bound tasks | I/O-bound tasks |

### How Async Works

```python
# Synchronous (blocking)
def sync_task():
    time.sleep(2)  # Blocks everything
    return "Done"

# Asynchronous (non-blocking)
async def async_task():
    await asyncio.sleep(2)  # Yields control, doesn't block
    return "Done"
```

### I/O Bound vs CPU Bound

| Type | Description | Example | Async? |
|------|-------------|---------|--------|
| **I/O Bound** | Waiting for external resources | Database queries, API calls, file I/O | ✅ Yes |
| **CPU Bound** | Heavy computation | Image processing, calculations, data processing | ❌ No |

### When to Use Async

```python
# ✅ GOOD - I/O Bound (Database query)
async def get_user():
    user = await db.fetch_one("SELECT * FROM users")
    return user

# ✅ GOOD - I/O Bound (External API)
async def fetch_data():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.example.com/data")
        return response.json()

# ❌ BAD - CPU Bound (Heavy computation)
async def calculate_fibonacci(n):
    # Heavy CPU work - should be sync or use a thread pool
    return fibonacci(n)
```

---

## 🔧 Part 2: Async Endpoints in FastAPI

### Basic Async Endpoint

```python
import asyncio
from fastapi import FastAPI

app = FastAPI()

# Sync endpoint (blocks the event loop)
@app.get("/sync")
def sync_endpoint():
    import time
    time.sleep(2)  # ❌ Blocks everything
    return {"message": "Done after 2 seconds"}

# Async endpoint (non-blocking)
@app.get("/async")
async def async_endpoint():
    await asyncio.sleep(2)  # ✅ Non-blocking
    return {"message": "Done after 2 seconds"}
```

### Multiple Async Tasks (Parallel)

```python
@app.get("/async-parallel")
async def async_parallel():
    # Run multiple tasks concurrently
    task1 = asyncio.create_task(slow_operation("Task 1"))
    task2 = asyncio.create_task(slow_operation("Task 2"))
    
    results = await asyncio.gather(task1, task2)
    return {"results": results}

async def slow_operation(name: str):
    await asyncio.sleep(2)
    return f"{name} completed"
```

### Async Database Operations

```python
# Using async SQLAlchemy (with aiosqlite or asyncpg)
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.asyncio import async_sessionmaker

# Async engine
DATABASE_URL = "postgresql+asyncpg://user:pass@localhost:5432/db"
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@app.get("/users/async")
async def get_users_async(db: AsyncSession = Depends(get_db)):
    # Async query
    result = await db.execute(select(User))
    users = result.scalars().all()
    return users
```

---

## 🌐 Part 3: Async External API Calls

### Installing httpx

```bash
pip install httpx
```

### Basic Async HTTP Request

```python
import httpx

@app.get("/external/github/{username}")
async def get_github_user(username: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.github.com/users/{username}")
        if response.status_code == 200:
            return response.json()
        return {"error": "User not found"}
```

### Parallel API Calls

```python
@app.get("/external/parallel")
async def parallel_requests():
    usernames = ["octocat", "torvalds", "kennethreitz"]
    
    async with httpx.AsyncClient() as client:
        # Run all requests concurrently
        tasks = [
            client.get(f"https://api.github.com/users/{username}")
            for username in usernames
        ]
        responses = await asyncio.gather(*tasks)
    
    return [r.json() for r in responses]
```

### With Error Handling

```python
@app.get("/external/with-handling")
async def external_with_handling():
    async with httpx.AsyncClient(timeout=5.0) as client:
        try:
            response = await client.get("https://api.github.com/users/octocat")
            response.raise_for_status()
            return response.json()
        except httpx.TimeoutException:
            return {"error": "Request timed out"}
        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error: {e.response.status_code}"}
        except Exception as e:
            return {"error": str(e)}
```

---

## 🚀 Part 4: Performance Comparison

### Sync vs Async Performance Test

```python
import time
import asyncio

# Sync endpoint (sequential)
@app.get("/test/sync-multiple")
def sync_multiple():
    results = []
    for i in range(5):
        time.sleep(1)  # 1 second each
        results.append(f"Task {i+1} completed")
    return {"results": results, "total_time": "5 seconds"}

# Async endpoint (parallel)
@app.get("/test/async-multiple")
async def async_multiple():
    async def task(i):
        await asyncio.sleep(1)
        return f"Task {i+1} completed"
    
    # Run all 5 tasks in parallel
    results = await asyncio.gather(*[task(i) for i in range(5)])
    return {"results": results, "total_time": "~1 second"}

# Mixed sync/async
@app.get("/test/mixed")
async def mixed():
    # Runs sync and async operations together
    loop = asyncio.get_event_loop()
    
    # Run sync operation in thread pool
    sync_result = await loop.run_in_executor(None, sync_operation)
    
    # Run async operation
    async_result = await async_operation()
    
    return {"sync": sync_result, "async": async_result}

def sync_operation():
    import time
    time.sleep(1)
    return "Sync done"

async def async_operation():
    await asyncio.sleep(1)
    return "Async done"
```

### Benchmarking Script

```python
# benchmark.py
import time
import asyncio
import httpx
import statistics

async def benchmark_async(url: str, n_requests: int = 10):
    """Benchmark async requests."""
    async with httpx.AsyncClient() as client:
        start = time.time()
        tasks = [client.get(url) for _ in range(n_requests)]
        await asyncio.gather(*tasks)
        end = time.time()
    return end - start

def benchmark_sync(url: str, n_requests: int = 10):
    """Benchmark sync requests."""
    import requests
    start = time.time()
    for _ in range(n_requests):
        requests.get(url)
    end = time.time()
    return end - start
```

---

## 🏗️ Part 5: Complete Async Router

```python
# routers/async_demo.py
from fastapi import APIRouter, Depends, HTTPException
import asyncio
import httpx
from datetime import datetime

router = APIRouter(prefix="/async-demo", tags=["async-demo"])


@router.get("/sleep/{seconds}")
async def sleep_endpoint(seconds: int):
    """Demonstrate async sleep."""
    start = datetime.now()
    await asyncio.sleep(seconds)
    elapsed = (datetime.now() - start).total_seconds()
    return {"slept": seconds, "elapsed": elapsed}


@router.get("/parallel/{count}")
async def parallel_tasks(count: int):
    """Run multiple tasks in parallel."""
    async def task(i: int):
        await asyncio.sleep(0.5)
        return f"Task {i} completed"
    
    results = await asyncio.gather(*[task(i) for i in range(count)])
    return {"count": count, "results": results}


@router.get("/sequential/{count}")
async def sequential_tasks(count: int):
    """Run multiple tasks sequentially."""
    results = []
    for i in range(count):
        await asyncio.sleep(0.5)
        results.append(f"Task {i} completed")
    return {"count": count, "results": results}


@router.get("/external")
async def external_apis():
    """Fetch data from multiple external APIs."""
    urls = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/posts/2",
        "https://jsonplaceholder.typicode.com/posts/3",
    ]
    
    async with httpx.AsyncClient() as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)
    
    data = []
    for response in responses:
        if response.status_code == 200:
            data.append(response.json())
        else:
            data.append({"error": response.status_code})
    
    return {"results": data}


@router.get("/error-handling")
async def error_handling():
    """Demonstrate error handling in async."""
    async with httpx.AsyncClient(timeout=2.0) as client:
        try:
            response = await client.get("https://httpbin.org/delay/5")
            return response.json()
        except httpx.TimeoutException:
            raise HTTPException(504, "Request timed out")
        except httpx.HTTPError as e:
            raise HTTPException(500, f"HTTP error: {str(e)}")
```

---

## 📊 Quick Reference

### Async vs Sync Comparison

| Feature | Sync (`def`) | Async (`async def`) |
|---------|--------------|---------------------|
| **Keyword** | `def` | `async def` |
| **Blocking** | Yes (blocks event loop) | No (non-blocking) |
| **I/O Operations** | Slower | Faster |
| **CPU Operations** | Better | Worse |
| **Complexity** | Simple | More complex |
| **Use in FastAPI** | Simple endpoints | I/O heavy endpoints |

### Async Patterns

| Pattern | Code | Description |
|---------|------|-------------|
| Single task | `result = await async_function()` | Wait for one task |
| Multiple tasks | `results = await asyncio.gather(*tasks)` | Wait for all |
| Task creation | `task = asyncio.create_task(func())` | Create background task |
| Timeout | `await asyncio.wait_for(func(), timeout)` | Timeout after n seconds |

### httpx AsyncClient Methods

| Method | Purpose | Example |
|--------|---------|---------|
| `client.get(url)` | GET request | `await client.get("https://api.com")` |
| `client.post(url, json=data)` | POST request | `await client.post("https://api.com", json={"key": "value"})` |
| `client.put(url)` | PUT request | `await client.put("https://api.com")` |
| `client.delete(url)` | DELETE request | `await client.delete("https://api.com")` |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `RuntimeError: asyncio.run() cannot be called from a running event loop` | Running async in sync context | Use `asyncio.create_task()` |
| `httpx.TimeoutException` | Request takes too long | Set timeout: `httpx.AsyncClient(timeout=5.0)` |
| `Sync code blocking event loop` | Using `time.sleep()` in async endpoint | Use `await asyncio.sleep()` |
| `Async generator not iterating` | Wrong async iteration | Use `async for` |

---

## ✅ Day 99 Checklist

- [ ] Understand async/await fundamentals
- [ ] Differentiate I/O vs CPU bound tasks
- [ ] Create sync endpoints (`def`)
- [ ] Create async endpoints (`async def`)
- [ ] Install and configure httpx
- [ ] Make async external API calls
- [ ] Use `asyncio.gather()` for parallel tasks
- [ ] Implement async database queries
- [ ] Compare sync vs async performance
- [ ] Push code to GitHub
