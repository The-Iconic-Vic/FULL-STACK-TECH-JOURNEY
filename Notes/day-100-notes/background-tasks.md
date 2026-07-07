# 📘 FastAPI Background Tasks

## 🎯 What are Background Tasks?

Background tasks are functions that run **after** the HTTP response is sent to the client. They allow you to perform time-consuming operations without making the user wait.

---

## 📝 Part 1: Introduction

### Why Use Background Tasks?

| Benefit | Description |
|---------|-------------|
| **Better UX** | Users don't wait for long operations |
| **Improved Performance** | API returns quickly |
| **Resource Management** | Offload heavy processing |
| **Non-blocking** | Doesn't block the event loop |

### Common Use Cases

| Use Case | Example |
|----------|---------|
| Email Sending | Welcome emails, notifications |
| File Processing | Image resizing, document conversion |
| Report Generation | PDF reports, analytics |
| Data Cleanup | Deleting temporary files |
| Logging | Activity logs |
| Webhooks | Sending notifications |

---

## 🔧 Part 2: Basic Usage

### Simple Background Task

```python
from fastapi import FastAPI, BackgroundTasks
import time

app = FastAPI()

# Background task function
def send_notification(email: str, message: str):
    time.sleep(5)  # Simulate work
    print(f"📧 Notification sent to {email}: {message}")

@app.post("/notify/")
async def notify_user(
    email: str,
    message: str,
    background_tasks: BackgroundTasks
):
    background_tasks.add_task(send_notification, email, message)
    return {"message": "Notification queued"}
```

### Multiple Tasks

```python
@app.post("/multiple/")
async def multiple_tasks(background_tasks: BackgroundTasks):
    background_tasks.add_task(task1, "First")
    background_tasks.add_task(task2, "Second")
    return {"message": "Tasks queued"}
```

---

## 📧 Part 3: Email Sending

```python
def send_email(to_email: str, subject: str, body: str):
    """Send an email (blocking operation)."""
    import smtplib
    from email.mime.text import MIMEText
    
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = "noreply@example.com"
    msg['To'] = to_email
    
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login('user', 'password')
        server.send_message(msg)

@router.post("/register")
async def register(user_data: UserCreate, background_tasks: BackgroundTasks):
    # Create user...
    
    # Send welcome email in background
    background_tasks.add_task(
        send_email,
        user_data.email,
        "Welcome!",
        f"Hello {user_data.username}, welcome to our app!"
    )
    
    return {"message": "User created"}
```

---

## 📁 Part 4: File Processing

```python
def process_uploaded_file(file_path: str):
    """Process an uploaded file."""
    time.sleep(10)
    print(f"✅ File processed: {file_path}")

@router.post("/upload/")
async def upload_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
):
    # Save file
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    
    # Process in background
    background_tasks.add_task(process_uploaded_file, file_path)
    
    return {"message": "File uploaded, processing in background"}
```

---

## 📊 Part 5: Report Generation

```python
def generate_report(data_type: str):
    """Generate a report."""
    time.sleep(10)
    filename = f"reports/{data_type}_{datetime.now()}.csv"
    # Generate report...
    print(f"✅ Report generated: {filename}")

@router.post("/reports/generate")
async def generate_report_endpoint(
    data_type: str,
    background_tasks: BackgroundTasks
):
    background_tasks.add_task(generate_report, data_type)
    return {"message": "Report generation started"}
```

---

## 📊 Quick Reference

### BackgroundTasks API

| Method | Purpose |
|--------|---------|
| `background_tasks.add_task(func, *args, **kwargs)` | Add task to background |

### Use Cases Comparison

| Use Case | BackgroundTasks | Celery |
|----------|-----------------|--------|
| Email sending | ✅ Good | ✅ Better |
| File processing | ✅ Good | ✅ Better |
| Report generation | ✅ Good | ✅ Better |
| Complex workflows | ❌ No | ✅ Yes |
| Retry logic | ❌ No | ✅ Yes |
| Monitoring | ❌ No | ✅ Yes |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Task not running | Not added | Use `add_task()` |
| Task fails silently | No error handling | Add try/except |
| Server restart loses tasks | In-memory storage | Use Celery |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **BackgroundTasks runs after response** | User doesn't wait |
| **Use for I/O operations** | Email, file processing |
| **Add tasks with add_task()** | `background_tasks.add_task(func, args)` |
| **Tasks are synchronous** | Cannot use `await` inside tasks |
| **No retry or persistence** | For simple tasks only |
| **Use Celery for complex tasks** | Retry, monitoring, persistence |
