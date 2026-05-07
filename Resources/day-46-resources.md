# 📚 Day 46 Resources - Environment Variables & Configuration

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| dotenv GitHub | https://github.com/motdotla/dotenv |
| dotenv Docs | https://dotenv.org/docs |
| Node.js process.env | https://nodejs.org/docs/latest/api/process.html#processenv |
| 12 Factor App - Config | https://12factor.net/config |
| NPM Docs - package.json | https://docs.npmjs.com/cli/v10/configuring-npm/package-json |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Environment Variables in Node.js | https://youtu.be/17UVejOw3zA |
| dotenv Tutorial | https://youtu.be/zDup0gQfhXo |
| Node.js Project Structure | https://youtu.be/3M0E4u9Kfxw |
| Error Handling Middleware | https://youtu.be/IGVvJhYVmxE |

## 📝 dotenv Cheatsheet

### Installation & Setup
```bash
npm install dotenv
```

```javascript
// server.js (must be at the very top)
require('dotenv').config();
```

### .env File
```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/todo_db

# Security
JWT_SECRET=mySuperSecretKey
```

### Accessing Variables
```javascript
const port = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI;
const isDev = process.env.NODE_ENV === 'development';
```

## ✅ .gitignore Template

```gitignore
# Environment Variables
.env
.env.local
.env.*.local
.env.development
.env.production
.env.test

# Dependencies
node_modules/

# Logs
logs/
*.log
npm-debug.log*

# OS Files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp

# Build
dist/
build/
```

## 📁 Project Structure Template

```
my-backend/
├── .env
├── .gitignore
├── package.json
├── server.js
├── config/
│   ├── index.js
│   └── database.js
├── models/
│   └── Todo.js
├── routes/
│   └── todoRoutes.js
├── controllers/
│   └── todoController.js
├── middleware/
│   └── errorHandler.js
└── utils/
    └── helpers.js
```

## 🔧 Common Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development`, `production`, `test` |
| `MONGODB_URI` | Database connection | `mongodb://localhost:27017/db` |
| `JWT_SECRET` | JWT signing key | `random-secret-key` |
| `API_KEY` | External API key | `abc123xyz` |
| `CORS_ORIGIN` | Allowed origins | `http://localhost:3000` |
| `LOG_LEVEL` | Logging level | `debug`, `info`, `error` |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `process.env.VAR` is undefined | .env not loaded | Add `require('dotenv').config()` at top |
| Variables not updating | Node caches .env | Restart server |
| Spaces in values | Spaces around `=` | Remove spaces: `KEY=value` |
| Quotes in .env | Using quotes | Remove quotes: `KEY=value` |
| .env committed to Git | Not in .gitignore | Add `.env` to .gitignore |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| NODE_ENV Explained | https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production |
| Config Management | https://www.freecodecamp.org/news/how-to-manage-environment-variables-in-node-js/ |
| Production Best Practices | https://expressjs.com/en/advanced/best-practice-performance.html |

