# 📚 Day 89 Resources - FastAPI Dependencies & Middleware

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| FastAPI: Dependencies | https://fastapi.tiangolo.com/tutorial/dependencies/ | Complete dependency injection guide |
| FastAPI: Depends() Reference | https://fastapi.tiangolo.com/reference/dependencies/ | Depends() API reference |
| FastAPI: Global Dependencies | https://fastapi.tiangolo.com/tutorial/dependencies/global-dependencies/ | Application-wide dependencies |
| FastAPI: Middleware | https://fastapi.tiangolo.com/tutorial/middleware/ | Official middleware documentation |
| FastAPI: CORS Middleware | https://fastapi.tiangolo.com/tutorial/cors/ | CORS configuration guide |
| FastAPI: Sub-dependencies | https://fastapi.tiangolo.com/tutorial/dependencies/sub-dependencies/ | Stacking dependencies |
| FastAPI: Dependencies with Yield | https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/ | Database sessions cleanup |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| FastAPI Dependencies Deep Dive | https://youtu.be/6ThXsUwLWvc | 25 min |
| FastAPI Middleware Explained | https://youtu.be/2jM5l1QxE1g | 20 min |
| Authentication with JWT in FastAPI | https://youtu.be/0DdM6H1QjYM | 30 min |
| CORS & Security Headers | https://youtu.be/JfR7xGxBqZY | 15 min |

## 📝 Dependencies Reference

### Depends() Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `dependency` | Callable to inject | `Depends(common_parameters)` |
| `use_cache` | Reuse value across request | `use_cache=False` |
| `scope` | When dependency runs | `scope="request"` |

### Dependency Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Function** | Simple callable | Pagination, query params |
| **Class** | With `__call__` | Reusable services |
| **Async** | `async def` | Database operations |
| **Yield** | With `yield` | Database sessions cleanup |

## 🔧 Middleware Execution Order

```
Middleware (outermost) → CustomRoute → Dependencies → Endpoint → Dependencies → CustomRoute → Middleware (innermost) 
```

### Middleware Order Best Practices

```
1. Error Handling (outermost) - Catches all exceptions
2. Request ID - Available for all downstream
3. Logging - Logs complete request/response
4. Security Headers - Added to all responses
5. CORS - Handles preflight requests
6. Compression (innermost) - Compresses final response 
```

## 🛠️ Essential Middleware Packages

| Package | Purpose | Command |
|---------|---------|---------|
| `fastapi-middlewares` | Request ID, timing, logging | `pip install fastapi-middlewares` |
| `fastapi-guard` | IP whitelist, rate limiting | `pip install fastapi-guard` |
| `auth-middleware` | JWT authentication | `pip install auth-middleware` |
| `fast-cache-middleware` | Route-based caching | `pip install fast-cache-middleware` |

## 📦 JWT Authentication Dependencies

```bash
pip install python-jose[cryptography] passlib[bcrypt] python-multipart 
```

## 📖 Further Reading

| Article | Link |
|---------|------|
| Authentication in FastAPI | https://fastapi.tiangolo.com/tutorial/security/ |
| JWT with FastAPI | https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/ |
| CORS in FastAPI | https://fastapi.tiangolo.com/tutorial/cors/ |
| SQLAlchemy with FastAPI | https://fastapi.tiangolo.com/tutorial/sql-databases/ |
| Background Tasks | https://fastapi.tiangolo.com/tutorial/background-tasks/ |

