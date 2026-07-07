# 📅 Day 100: Background Tasks

**Date:** July 7, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** BackgroundTasks, Asynchronous Processing, Email Sending, File Processing, Job Scheduling

---

## 📋 Learning Objectives

- ✅ Use FastAPI's `BackgroundTasks` class
- ✅ Add tasks to run after response is sent
- ✅ Implement email sending in background
- ✅ Process uploaded files asynchronously
- ✅ Generate reports in background
- ✅ Log activity without blocking requests

---

## 🎯 Part 1: What are Background Tasks?

### Definition

Background tasks are functions that run **after** the HTTP response is sent to the client. They allow you to perform time-consuming operations without making the user wait.

### Why Use Background Tasks?

| Benefit | Description |
|---------|-------------|
| **Better UX** | Users don't wait for long operations |
| **Improved Performance** | API returns quickly |
| **Resource Management** | Offload heavy processing |
| **Non-blocking** | Doesn't block the event loop |

### Use Cases

| Use Case | Example |
|----------|---------|
| **Email Sending** | Welcome emails, notifications |
| **File Processing** | Image resizing, document conversion |
| **Report Generation** | PDF reports, analytics |
| **Data Cleanup** | Deleting temporary files |
| **Logging** | Activity logs |
| **Webhooks** | Sending notifications |

---

## 🔧 Part 2: BackgroundTasks Basics

### Simple Background Task

```python
from fastapi import FastAPI, BackgroundTasks
import time

app = FastAPI()

# Background task function
def send_notification(email: str, message: str):
    """Simulate sending a notification."""
    time.sleep(5)  # Simulate work
    print(f"📧 Notification sent to {email}: {message}")

@app.post("/notify/")
async def notify_user(
    email: str,
    message: str,
    background_tasks: BackgroundTasks
):
    # Add task to run in background
    background_tasks.add_task(send_notification, email, message)
    return {"message": "Notification queued"}
```

### Multiple Background Tasks

```python
def task1(name: str):
    time.sleep(2)
    print(f"Task 1 completed: {name}")

def task2(name: str):
    time.sleep(3)
    print(f"Task 2 completed: {name}")

@app.post("/multiple/")
async def multiple_tasks(background_tasks: BackgroundTasks):
    background_tasks.add_task(task1, "First")
    background_tasks.add_task(task2, "Second")
    return {"message": "Tasks queued"}
```

### BackgroundTasks vs asyncio

| Aspect | BackgroundTasks | asyncio.create_task |
|--------|-----------------|---------------------|
| **Purpose** | Post-response work | Concurrent work |
| **Timing** | After response | During request |
| **Response** | Sent immediately | Waits for completion |
| **Use Case** | Email, processing | Parallel operations |

---

## 📧 Part 3: Email Sending in Background

### Email Task Function

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from .config import settings

def send_email(to_email: str, subject: str, body: str):
    """Send an email (blocking operation)."""
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = settings.EMAIL_FROM
        msg['To'] = to_email
        msg['Subject'] = subject
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)
        
        print(f"✅ Email sent to {to_email}")
        return True
    except Exception as e:
        print(f"❌ Email failed: {e}")
        return False

def send_welcome_email(email: str, username: str):
    """Send welcome email to new user."""
    subject = f"Welcome to our app, {username}!"
    body = f"""
    Hello {username},
    
    Welcome to our application! We're excited to have you onboard.
    
    Get started by exploring our features and completing your profile.
    
    Best regards,
    The Team
    """
    send_email(email, subject, body)
```

### Welcome Email on Registration

```python
from fastapi import BackgroundTasks

@router.post("/register", status_code=201)
async def register(
    user_data: schemas.UserCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    # Create user in database
    hashed = auth.hash_password(user_data.password)
    db_user = models.User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Send welcome email in background
    background_tasks.add_task(
        send_welcome_email,
        db_user.email,
        db_user.username
    )
    
    return db_user
```

---

## 📁 Part 4: File Processing in Background

### Upload and Process File

```python
from fastapi import File, UploadFile
import uuid
import os

def process_uploaded_file(file_path: str, filename: str):
    """Process an uploaded file (blocking operation)."""
    try:
        # Simulate processing
        time.sleep(5)
        
        # Example: resize image, convert format, etc.
        processed_path = file_path.replace('.tmp', '_processed.tmp')
        with open(file_path, 'rb') as src:
            with open(processed_path, 'wb') as dst:
                dst.write(src.read())
        
        print(f"✅ File processed: {filename}")
        return True
    except Exception as e:
        print(f"❌ File processing failed: {e}")
        return False

def delete_temp_file(file_path: str):
    """Delete temporary file (cleanup)."""
    try:
        os.remove(file_path)
        print(f"🗑️ Temp file deleted: {file_path}")
    except Exception as e:
        print(f"❌ Failed to delete temp file: {e}")
```

```python
@router.post("/upload/")
async def upload_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
):
    # Save uploaded file
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    
    # Generate unique filename
    filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(upload_dir, filename)
    
    # Save file
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    
    # Process in background
    background_tasks.add_task(process_uploaded_file, file_path, file.filename)
    
    # Schedule cleanup
    background_tasks.add_task(delete_temp_file, file_path)
    
    return {
        "message": "File uploaded",
        "filename": filename,
        "status": "processing in background"
    }
```

---

## 📊 Part 5: Report Generation

```python
import csv
from datetime import datetime

def generate_report(data_type: str, format: str = "csv"):
    """Generate a report (blocking operation)."""
    try:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"reports/{data_type}_{timestamp}.{format}"
        
        # Create directory
        os.makedirs("reports", exist_ok=True)
        
        # Generate report
        if format == "csv":
            with open(filename, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(["ID", "Name", "Created At"])
                writer.writerow(["1", "Sample Data", timestamp])
        
        print(f"✅ Report generated: {filename}")
        return filename
    except Exception as e:
        print(f"❌ Report generation failed: {e}")
        return None

@router.post("/reports/generate")
async def generate_report_endpoint(
    data_type: str,
    background_tasks: BackgroundTasks,
    format: str = "csv"
):
    """Generate a report in background."""
    background_tasks.add_task(generate_report, data_type, format)
    return {
        "message": "Report generation started",
        "data_type": data_type,
        "format": format,
        "estimated_time": "5-10 seconds"
    }
```

---

## 📝 Part 6: Logging and Cleanup

### Activity Logger

```python
import json
from datetime import datetime

def log_activity(user_id: int, action: str, details: dict = None):
    """Log user activity to file."""
    try:
        log_dir = "logs"
        os.makedirs(log_dir, exist_ok=True)
        
        timestamp = datetime.now().isoformat()
        log_entry = {
            "timestamp": timestamp,
            "user_id": user_id,
            "action": action,
            "details": details or {}
        }
        
        log_file = f"{log_dir}/activity_{datetime.now().strftime('%Y%m%d')}.json"
        with open(log_file, 'a') as f:
            json.dump(log_entry, f)
            f.write('\n')
        
        print(f"📝 Activity logged: {action}")
    except Exception as e:
        print(f"❌ Logging failed: {e}")

@router.post("/tasks/{task_id}/complete")
async def complete_task(
    task_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
    background_tasks: BackgroundTasks = BackgroundTasks()
):
    # ... complete task logic ...
    
    # Log activity in background
    background_tasks.add_task(
        log_activity,
        current_user.id,
        "task_completed",
        {"task_id": task_id}
    )
    
    return {"message": "Task completed"}
```

### Cleanup Tasks

```python
def cleanup_old_files(days: int = 7):
    """Delete files older than specified days."""
    try:
        import os
        from datetime import datetime, timedelta
        
        cutoff = datetime.now() - timedelta(days=days)
        upload_dir = "uploads"
        
        for filename in os.listdir(upload_dir):
            file_path = os.path.join(upload_dir, filename)
            if os.path.isfile(file_path):
                modified = datetime.fromtimestamp(os.path.getmtime(file_path))
                if modified < cutoff:
                    os.remove(file_path)
                    print(f"🗑️ Removed old file: {filename}")
    except Exception as e:
        print(f"❌ Cleanup failed: {e}")

@app.post("/admin/cleanup")
async def trigger_cleanup(background_tasks: BackgroundTasks):
    """Trigger cleanup in background."""
    background_tasks.add_task(cleanup_old_files, 7)
    return {"message": "Cleanup started"}
```

---

## 🏗️ Part 7: Complete Background Tasks Router

```python
# routers/background.py
from fastapi import APIRouter, BackgroundTasks, UploadFile, File, Form
import uuid
import os
import time
from datetime import datetime

router = APIRouter(prefix="/background", tags=["background-tasks"])

# ============================================
# Task Functions
# ============================================

def send_notification(email: str, message: str):
    """Simulate sending a notification."""
    time.sleep(3)
    print(f"📧 Notification sent to {email}: {message}")

def process_file(file_path: str, filename: str):
    """Process an uploaded file."""
    time.sleep(5)
    print(f"✅ File processed: {filename}")

def generate_analytics():
    """Generate analytics report."""
    time.sleep(10)
    print(f"📊 Analytics generated at {datetime.now()}")

# ============================================
# Endpoints
# ============================================

@router.post("/notify")
async def send_notification_endpoint(
    email: str = Form(...),
    message: str = Form(...),
    background_tasks: BackgroundTasks = BackgroundTasks()
):
    """Send notification in background."""
    background_tasks.add_task(send_notification, email, message)
    return {
        "message": "Notification queued",
        "email": email,
        "status": "processing in background"
    }

@router.post("/upload")
async def upload_and_process(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
):
    """Upload and process file in background."""
    # Save file
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    
    filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(upload_dir, filename)
    
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    
    # Process in background
    background_tasks.add_task(process_file, file_path, file.filename)
    
    return {
        "message": "File uploaded",
        "filename": filename,
        "status": "processing in background"
    }

@router.post("/analytics")
async def generate_analytics_endpoint(
    background_tasks: BackgroundTasks
):
    """Generate analytics in background."""
    background_tasks.add_task(generate_analytics)
    return {
        "message": "Analytics generation started",
        "estimated_time": "10 seconds"
    }

@router.post("/multiple")
async def multiple_background_tasks(
    background_tasks: BackgroundTasks
):
    """Schedule multiple background tasks."""
    for i in range(5):
        background_tasks.add_task(
            send_notification,
            f"user{i}@example.com",
            f"Task {i+1} completed"
        )
    
    return {
        "message": "5 notifications queued",
        "count": 5
    }
```

---

## 📊 Quick Reference

### BackgroundTasks API

| Method | Purpose |
|--------|---------|
| `background_tasks.add_task(func, *args, **kwargs)` | Add task to background |

### Common Use Cases

| Use Case | Example |
|----------|---------|
| Email | `send_welcome_email(user.email)` |
| File processing | `process_image(file_path)` |
| Report generation | `generate_report(data)` |
| Logging | `log_activity(user_id, action)` |
| Cleanup | `cleanup_old_files(days)` |

### BackgroundTasks vs Celery

| Feature | BackgroundTasks | Celery |
|---------|-----------------|--------|
| **Complexity** | Simple | Complex |
| **Persistence** | No (memory) | Yes (queue) |
| **Retry** | No | Yes |
| **Monitoring** | No | Yes |
| **Use Case** | Simple tasks | Complex workflows |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Task not running | Function not added | Add with `add_task()` |
| Async function in task | Sync function required | Use sync or `run_in_executor` |
| Task fails silently | No error handling | Add try/except in task |
| Memory issues | Too many tasks | Use queue system |
| Server restart loses tasks | In-memory storage | Use Celery for persistent tasks |

---

## ✅ Day 100 Checklist

- [ ] Understand BackgroundTasks concept
- [ ] Add tasks with `add_task()`
- [ ] Implement email sending in background
- [ ] Process uploaded files asynchronously
- [ ] Generate reports in background
- [ ] Log user activity without blocking
- [ ] Schedule cleanup tasks
- [ ] Test multiple background tasks
- [ ] Handle errors in task functions
- [ ] Push code to GitHub

