# 📚 Day 96 Resources - User-Task Relationship

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| SQLAlchemy: Working with ORM Related Objects | https://docs.sqlalchemy.org/en/20/tutorial/orm_related_objects.html | How to define and query relationships   |
| SQLAlchemy: Configuring Relationship Joins | https://docs.sqlalchemy.org/en/14/orm/join_conditions.html | Handling multiple join paths and foreign keys  |
| FastAPI JSONAPI: Relationships | https://fastapi-jsonapi.readthedocs.io/en/2.1.0/relationships.html | Declaring relationships in schemas  |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|---------|
| SQLAlchemy Relationships Tutorial | https://youtu.be/6ThXsUwLWvc | 25 min |
| FastAPI One-to-Many Relationships | https://youtu.be/2jM5l1QxE1g | 20 min |

## 📝 Relationship Types

| Type | Description | Example |
|------|-------------|---------|
| **One-to-Many** | One record links to many records | User → Tasks  |
| **One-to-One** | One record links to one record | User → Profile  |
| **Many-to-Many** | Many records link to many records | Students → Courses  |

## 🔧 SQLAlchemy Relationship Configuration

### Basic One-to-Many Setup

```python
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    # One-to-Many relationship
    posts = relationship("Post", back_populates="owner")  # 

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))  # Foreign key

    # Many-to-One relationship
    owner = relationship("User", back_populates="posts")  # 
```

### Cascade Delete

```python
# Add cascade to relationship
class User(Base):
    # ...
    posts = relationship("Post", back_populates="owner", cascade="all, delete-orphan")  # 
```

### Many-to-Many Setup

```python
from sqlalchemy import Table, Column, Integer, ForeignKey

# Association table
followers = Table(
    "followers",
    Base.metadata,
    Column("follower_id", Integer, ForeignKey("users.id")),
    Column("followed_id", Integer, ForeignKey("users.id"))
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    
    followers = relationship(
        "User",
        secondary=followers,
        primaryjoin=id == followers.c.followed_id,
        secondaryjoin=id == followers.c.follower_id,
        backref="followed_by"
    )  # 
```

## 📖 Further Reading

| Article | Link |
|---------|------|
| SQLAlchemy Relationship Patterns | https://docs.sqlalchemy.org/en/20/orm/basic_relationships.html |
| FastAPI with SQLAlchemy Relationships | https://fastapi-jsonapi.readthedocs.io/en/2.1.0/relationships.html |

