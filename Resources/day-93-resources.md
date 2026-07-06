# 📚 Day 93 Resources - User Model & Password Hashing

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| FastAPI: Security | https://fastapi.tiangolo.com/tutorial/security/ | Official FastAPI security documentation |
| Passlib Documentation | https://passlib.readthedocs.io/ | Complete Passlib password hashing library docs |
| Passlib: CryptContext | https://passlib.readthedocs.io/en/stable/lib/passlib.context.html | CryptContext configuration guide |
| bcrypt Documentation | https://github.com/pyca/bcrypt/ | bcrypt Python library docs |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|---------|
| Password Hashing with Passlib | https://youtu.be/6ThXsUwLWvc | 15 min |
| FastAPI User Registration | https://youtu.be/2jM5l1QxE1g | 20 min |

## 📦 Essential Packages

| Package | Command | Purpose |
|---------|---------|---------|
| passlib | `pip install passlib` | Password hashing library |
| bcrypt | `pip install bcrypt` | bcrypt hashing algorithm |
| passlib[bcrypt] | `pip install "passlib[bcrypt]"` | Passlib with bcrypt support  |

## 🔐 Password Hashing Best Practices

| Practice | Why |
|----------|-----|
| **Never store plain text passwords** | Database breaches expose all passwords |
| **Use bcrypt, Argon2, or PBKDF2** | Designed for password storage with iteration counts  |
| **Always use a salt** | Prevents rainbow table attacks; unsalted hashes can be 100% recovered  |
| **Use iteration count** | Slows down brute force attacks; bcrypt with cost 12 is recommended  |
| **Avoid MD5/SHA1 for passwords** | Too fast to compute; vulnerable to GPU/ASIC attacks  |

## 📖 Further Reading

| Article | Link |
|---------|------|
| Secure Password Storage | https://passlib.readthedocs.io/en/stable/narr/quickstart.html |
| Password Hashing Algorithms | https://passlib.readthedocs.io/en/stable/lib/passlib.hash.html |
| bcrypt Security | https://en.wikipedia.org/wiki/Bcrypt |

