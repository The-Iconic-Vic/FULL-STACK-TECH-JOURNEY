# 📘 Async/Await in FastAPI

## 🎯 What is Async/Await?

Async/await is a feature in Python that allows you to write concurrent code using the `async` and `await` keywords. It enables non-blocking execution, allowing your application to handle multiple tasks simultaneously.

---

## 📝 Part 1: Async Fundamentals

### Synchronous vs Asynchronous

| Aspect | Synchronous | Asynchronous |
|--------|-------------|--------------|
| **Execution** | One task at a time | Multiple tasks concurrently |
| **Blocking** | Blocks until complete | Non-blocking |
| **Performance** | Slower for I/O | Faster for I/O |
| **Complexity** | Simpler | More complex |

### How Async Works

```python
# Synchronous (blocking)
def sync_task():
    time.sleep(2)  # Blocks everything
    return "Done"

# Asynchronous (non-blocking)
async def async_task():
    await asyncio.sleep(2)  # Yields control
    return "Done"
```

### I/O Bound vs CPU Bound

| Type | Description | Async? |
|------|-------------|--------|
| **I/O Bound** | Waiting for external resources | ✅ Yes |
| **CPU Bound** | Heavy computation | ❌ No |

### When to Use Async

```python
# ✅ GOOD - I/O Bound
async def get_user():
    user = await db.fetch_one("SELECT * FROM users")
    return user

# ✅ GOOD - External API
async def fetch_data():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.example.com/data")
        return response.json()

# ❌ BAD - CPU Bound
async def calculate_fibonacci(n):
    return fibonacci(n)  # Should be sync
```

---

## 🔧 Part 2: Async Endpoints in FastAPI

### Basic Async Endpoint

```python
import asyncio
from fastapi import FastAPI

app = FastAPI()

# Sync endpoint (blocks)
@app.get("/sync")
def sync_endpoint():
    time.sleep(2)  # ❌ Blocks everything
    return {"message": "Done"}

# Async endpoint (non-blocking)
@app.get("/async")
async def async_endpoint():
    await asyncio.sleep(2)  # ✅ Non-blocking
    return {"message": "Done"}
```

### Parallel Tasks

```python
@app.get("/parallel")
async def parallel_tasks():
    task1 = asyncio.create_task(slow_operation("Task 1"))
    task2 = asyncio.create_task(slow_operation("Task 2"))
    
    results = await asyncio.gather(task1, task2)
    return {"results": results}

async def slow_operation(name: str):
    await asyncio.sleep(2)
    return f"{name} completed"
```

---

## 🌐 Part 3: Async External API Calls

### httpx Setup

```bash
pip install httpx
```

### Basic Async Request

```python
import httpx

@app.get("/external/{username}")
async def get_user(username: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.github.com/users/{username}")
        return response.json()
```

### Parallel Requests

```python
@app.get("/external/parallel")
async def parallel_requests():
    usernames = ["octocat", "torvalds", "kennethreitz"]
    
    async with httpx.AsyncClient() as client:
        tasks = [client.get(f"https://api.github.com/users/{u}") for u in usernames]
        responses = await asyncio.gather(*tasks)
    
    return [r.json() for r in responses]
```

### Error Handling

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
```

---

## 📊 Quick Reference

### Async vs Sync

| Feature | Sync (`def`) | Async (`async def`) |
|---------|--------------|---------------------|
| Keyword | `def` | `async def` |
| Blocking | Yes | No |
| I/O Operations | Slower | Faster |
| CPU Operations | Better | Worse |

### Async Patterns

| Pattern | Code |
|---------|------|
| Single task | `result = await async_function()` |
| Multiple tasks | `results = await asyncio.gather(*tasks)` |
| Background task | `task = asyncio.create_task(func())` |
| Timeout | `await asyncio.wait_for(func(), timeout)` |

### httpx AsyncClient Methods

| Method | Purpose |
|--------|---------|
| `client.get(url)` | GET request |
| `client.post(url, json=data)` | POST request |
| `client.put(url)` | PUT request |
| `client.delete(url)` | DELETE request |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **async for I/O** | Use for database, API calls, file I/O |
| **sync for CPU** | Use for computation, data processing |
| **await yields control** | Doesn't block the event loop |
| **asyncio.gather** | Run multiple tasks in parallel |
| **httpx for async HTTP** | Async client for external APIs |
| **time.sleep blocks** | Use `await asyncio.sleep` instead |

