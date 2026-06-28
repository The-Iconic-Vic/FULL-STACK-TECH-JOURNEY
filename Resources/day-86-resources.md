# 📚 Day 86 Resources - FastAPI Path & Query Parameters

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| FastAPI: Path Parameters | https://fastapi.tiangolo.com/tutorial/path-params/ | Official path parameters guide |
| FastAPI: Query Parameters | https://fastapi.tiangolo.com/tutorial/query-params/ | Official query parameters guide |
| FastAPI: Path() Validation | https://fastapi.tiangolo.com/tutorial/path-params-numeric-validations/ | Path validation docs |
| FastAPI: Query() Validation | https://fastapi.tiangolo.com/tutorial/query-params-str-validations/ | Query validation docs |
| FastAPI: Parameter Order | https://fastapi.tiangolo.com/tutorial/path-params/#order-matters | Route order explanation |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| Path Parameters in FastAPI | https://youtu.be/6ThXsUwLWvc | 12 min |
| Query Parameters Explained | https://youtu.be/2jM5l1QxE1g | 15 min |
| Parameter Validation with Path & Query | https://youtu.be/0DdM6H1QjYM | 18 min |
| FastAPI Parameters Deep Dive | https://youtu.be/JfR7xGxBqZY | 20 min |

## 📝 Parameter Validation Reference

### Path() Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `gt` | int | Greater than | `gt=0` |
| `ge` | int | Greater than or equal | `ge=1` |
| `lt` | int | Less than | `lt=100` |
| `le` | int | Less than or equal | `le=100` |
| `min_length` | int | Minimum string length | `min_length=3` |
| `max_length` | int | Maximum string length | `max_length=50` |
| `pattern` | str | Regex pattern | `pattern="^[a-zA-Z]+$"` |

### Query() Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `min_length` | int | Minimum string length | `min_length=3` |
| `max_length` | int | Maximum string length | `max_length=50` |
| `pattern` | str | Regex pattern | `pattern="^[a-z]+$"` |
| `gt` | float | Greater than | `gt=0` |
| `ge` | float | Greater than or equal | `ge=1` |
| `lt` | float | Less than | `lt=100` |
| `le` | float | Less than or equal | `le=100` |
| `deprecated` | bool | Mark as deprecated | `deprecated=True` |

## 📖 Further Reading

| Article | Link |
|---------|------|
| FastAPI Parameter Types | https://fastapi.tiangolo.com/tutorial/path-params/#data-validation |
| Query Parameter Validation | https://fastapi.tiangolo.com/tutorial/query-params-str-validations/ |
| Nested Parameters | https://fastapi.tiangolo.com/tutorial/body-nested-models/ |
| Optional Parameters | https://fastapi.tiangolo.com/tutorial/query-params/#optional-parameters |

