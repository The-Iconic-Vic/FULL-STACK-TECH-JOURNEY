# 📚 Day 88 Resources - FastAPI Response Models & Status Codes

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| FastAPI: Response Models | https://fastapi.tiangolo.com/tutorial/response-model/ | Official response model documentation |
| FastAPI: Status Codes | https://fastapi.tiangolo.com/tutorial/response-status-code/ | Official status code guide |
| FastAPI: Additional Responses | https://fastapi.tiangolo.com/tutorial/additional-responses/ | Documenting error responses |
| FastAPI: HTTPException | https://fastapi.tiangolo.com/tutorial/handling-errors/ | Error handling with HTTPException |
| FastAPI: Custom Error Handlers | https://fastapi.tiangolo.com/tutorial/handling-errors/#install-custom-exception-handlers | Custom exception handlers |
| Pydantic: Model Config | https://docs.pydantic.dev/latest/concepts/model_config/ | Pydantic configuration options |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| FastAPI Response Models | https://youtu.be/6ThXsUwLWvc | 15 min |
| HTTP Status Codes in FastAPI | https://youtu.be/2jM5l1QxE1g | 12 min |
| Error Handling Deep Dive | https://youtu.be/0DdM6H1QjYM | 20 min |
| FastAPI Error Responses | https://youtu.be/JfR7xGxBqZY | 18 min |

## 📝 Response Model Options Reference

### response_model_exclude_unset

| Parameter | Description | Example |
|-----------|-------------|---------|
| `response_model_exclude_unset` | Exclude fields not explicitly set (only default values) | `response_model_exclude_unset=True`  |
| `response_model_exclude_defaults` | Exclude fields equal to default values | `response_model_exclude_defaults=True`  |
| `response_model_exclude_none` | Exclude fields with None values | `response_model_exclude_none=True`  |

### response_model_include / response_model_exclude

```python
# Include only specified fields
response_model_include={"id", "name"}  # Uses a set 

# Exclude specified fields
response_model_exclude={"password", "email"}
```

### Field Exclusion Priority

> If a field is set to `exclude=True` in the Pydantic model definition, it takes precedence over any route-level settings like `response_model_include` .

## 📊 HTTP Status Codes Reference

### Success Codes

| Code | Constant | Use Case |
|------|----------|----------|
| 200 | `status.HTTP_200_OK` | Success (default)  |
| 201 | `status.HTTP_201_CREATED` | Resource created  |
| 204 | `status.HTTP_204_NO_CONTENT` | Success, no body  |

### Client Error Codes

| Code | Constant | Use Case |
|------|----------|----------|
| 400 | `status.HTTP_400_BAD_REQUEST` | Invalid input |
| 401 | `status.HTTP_401_UNAUTHORIZED` | Authentication required |
| 403 | `status.HTTP_403_FORBIDDEN` | Not authorized  |
| 404 | `status.HTTP_404_NOT_FOUND` | Resource not found  |
| 409 | `status.HTTP_409_CONFLICT` | Duplicate resource |
| 422 | `status.HTTP_422_UNPROCESSABLE_ENTITY` | Validation error |

### Server Error Codes

| Code | Constant | Use Case |
|------|----------|----------|
| 500 | `status.HTTP_500_INTERNAL_SERVER_ERROR` | Unhandled exception  |

## 📖 Further Reading

| Article | Link |
|---------|------|
| Response Models & Error Handling | https://subscription.packtpub.com/book/web-development/9781801076630/4  |
| FastAPI Additional Responses | https://fastapi.tiangolo.com/tutorial/additional-responses/ |
| GitHub Discussion: Response Model for Exceptions | https://github.com/fastapi/fastapi/discussions/8224  |

