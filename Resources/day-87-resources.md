# 📚 Day 87 Resources - FastAPI Request Body & Pydantic Models

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| FastAPI: Request Body | https://fastapi.tiangolo.com/tutorial/body/ | Official request body documentation |
| FastAPI: Pydantic Models | https://fastapi.tiangolo.com/tutorial/body-multiple-params/ | Pydantic model usage |
| Pydantic Docs | https://docs.pydantic.dev/latest/ | Complete Pydantic documentation |
| Pydantic: Field Types | https://docs.pydantic.dev/latest/concepts/fields/ | Field types and validation |
| FastAPI: Response Models | https://fastapi.tiangolo.com/tutorial/response-model/ | Response model guide |
| FastAPI: PUT vs PATCH | https://fastapi.tiangolo.com/tutorial/body-updates/ | Update operations |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| Pydantic Models in FastAPI | https://youtu.be/6ThXsUwLWvc | 20 min |
| Request Body & Validation | https://youtu.be/2jM5l1QxE1g | 18 min |
| PUT & PATCH in FastAPI | https://youtu.be/0DdM6H1QjYM | 15 min |
| Nested Models Deep Dive | https://youtu.be/JfR7xGxBqZY | 22 min |

## 📝 Pydantic Field Validation Reference

### Numeric Validations

| Parameter | Description | Example |
|-----------|-------------|---------|
| `gt` | Greater than | `gt=0` |
| `ge` | Greater than or equal | `ge=0` |
| `lt` | Less than | `lt=100` |
| `le` | Less than or equal | `le=100` |
| `multiple_of` | Multiple of | `multiple_of=5` |

### String Validations

| Parameter | Description | Example |
|-----------|-------------|---------|
| `min_length` | Minimum length | `min_length=1` |
| `max_length` | Maximum length | `max_length=100` |
| `pattern` | Regex pattern | `pattern="^[a-zA-Z]+$"` |
| `to_upper` | Convert to uppercase | `to_upper=True` |
| `to_lower` | Convert to lowercase | `to_lower=True` |

### List Validations

| Parameter | Description | Example |
|-----------|-------------|---------|
| `min_items` | Minimum items | `min_items=1` |
| `max_items` | Maximum items | `max_items=10` |
| `unique_items` | Unique items only | `unique_items=True` |

## 📖 Further Reading

| Article | Link |
|---------|------|
| Pydantic Documentation | https://docs.pydantic.dev/latest/ |
| FastAPI Pydantic Guide | https://fastapi.tiangolo.com/tutorial/body-nested-models/ |
| Request Body with Pydantic | https://fastapi.tiangolo.com/tutorial/body/ |
| Response Model Guide | https://fastapi.tiangolo.com/tutorial/response-model/ |
| Field Validation in Pydantic | https://docs.pydantic.dev/latest/concepts/fields/ |

