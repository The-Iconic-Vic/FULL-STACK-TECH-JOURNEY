# 📘 Environment Variables & Configuration Reference

## What are Environment Variables?

Environment variables are dynamic values that can affect how running processes behave. They are used to store configuration data like API keys, database URLs, and other sensitive information.

---

## dotenv Package

### Installation
```bash
npm install dotenv
```

### Basic Usage
```javascript
// server.js
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI;

console.log(`Server running on port ${port}`);
```

### .env File Format
```env
# Comments start with #
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=mySuperSecretKey
API_KEY=abc123xyz
NODE_ENV=development
```

### Rules for .env files
- No spaces around `=`
- No quotes around values
- Keys are uppercase by convention
- Comments start with `#`

---

## Accessing Environment Variables

### Basic Access
```javascript
// All variables are strings
const port = process.env.PORT;           // "3000"
const isProduction = process.env.NODE_ENV === 'production';
```

### With Fallback Values
```javascript
const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_db';
const jwtSecret = process.env.JWT_SECRET || 'dev-secret-key';
```

### Type Conversion
```javascript
// Convert to number
const port = parseInt(process.env.PORT) || 3000;

// Convert to boolean
const isDebug = process.env.DEBUG === 'true';

// Convert to array
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
```

---

## Configuration File Pattern

### config/index.js
```javascript
require('dotenv').config();

module.exports = {
  // Server
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database
  mongodbUri: process.env.MONGODB_URI,
  
  // Security
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  
  // API Keys
  apiKey: process.env.API_KEY,
  
  // Flags
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN || '*'
};
```

### Using Config
```javascript
const config = require('./config');

console.log(`Server running on port ${config.port}`);
console.log(`Environment: ${config.nodeEnv}`);

if (config.isProduction) {
  // Production-specific logic
}
```

---

## Environment-Specific Files

### File Structure
```
.env.development
.env.production
.env.test
```

### Loading Based on Environment
```javascript
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}` });
```

### Example .env.development
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todo_dev
NODE_ENV=development
DEBUG=true
```

### Example .env.production
```env
PORT=8080
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/todo_prod
NODE_ENV=production
DEBUG=false
```

---

## Validation

### Required Variables Check
```javascript
// config/validate.js
const requiredEnvVariables = [
  'MONGODB_URI',
  'JWT_SECRET'
];

function validateEnv() {
  const missing = [];
  
  for (const envVar of requiredEnvVariables) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }
  
  if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    console.error('Please check your .env file');
    process.exit(1);
  }
  
  console.log('✅ All environment variables are set');
}

module.exports = validateEnv;
```

### Using Validation
```javascript
// server.js
require('dotenv').config();
const validateEnv = require('./config/validate');

validateEnv(); // Exits if missing variables

// Continue with server startup...
```

---

## .gitignore for Node.js

```gitignore
# Dependencies
node_modules/

# Environment variables
.env
.env.local
.env.*.local
.env.development
.env.production
.env.test

# Logs
logs/
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Build output
dist/
build/
out/

# Test coverage
coverage/
.nyc_output/
```

---

## Project Structure

### Complete Structure
```
my-backend/
├── .env
├── .gitignore
├── package.json
├── server.js
├── config/
│   ├── index.js
│   ├── database.js
│   └── validate.js
├── models/
│   └── Todo.js
├── routes/
│   └── todoRoutes.js
├── controllers/
│   └── todoController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
└── utils/
    └── helpers.js
```

### server.js (Entry Point)
```javascript
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const config = require('./config');
const errorHandler = require('./middleware/errorHandler');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Error handler (last)
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
```

### config/database.js
```javascript
const mongoose = require('mongoose');
const config = require('./');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

## Best Practices

### DO's ✅
```javascript
// Use descriptive names
process.env.MONGODB_URI
process.env.JWT_SECRET

// Provide defaults
const port = process.env.PORT || 3000

// Validate required variables
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is required');
  process.exit(1);
}

// Group config in one file
const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGODB_URI
};
```

### DON'Ts ❌
```javascript
// Don't commit .env files
// .env should be in .gitignore

// Don't hardcode sensitive values
const apiKey = 'abc123'; // ❌

// Don't store secrets in code
const jwtSecret = 'mysecret'; // ❌

// Don't use .env in production without proper security
```

---

## Common Environment Variables

| Variable | Purpose |
|----------|---------|
| `PORT` | Server port number |
| `NODE_ENV` | Environment (development/production/test) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for JWT tokens |
| `API_KEY` | External API key |
| `CORS_ORIGIN` | Allowed CORS origin |
| `LOG_LEVEL` | Logging level (debug/info/error) |
| `DEBUG` | Debug mode flag |

---

## Production Considerations

### Use a Process Manager
```bash
# Set environment variables
export NODE_ENV=production
export PORT=8080
export MONGODB_URI=mongodb+srv://...

# Start with PM2
pm2 start server.js --name my-api
```

### Use Secret Management Services
- AWS Secrets Manager
- Azure Key Vault
- HashiCorp Vault
- Doppler

### Docker
```dockerfile
# Dockerfile
ENV NODE_ENV=production
ENV PORT=8080
```

```bash
# Run with environment variables
docker run -e PORT=8080 -e MONGODB_URI=mongodb://... my-image
```

---

## Quick Reference

| Command/Code | Purpose |
|--------------|---------|
| `npm install dotenv` | Install dotenv |
| `require('dotenv').config()` | Load .env file |
| `process.env.VAR_NAME` | Access variable |
| `process.env.PORT \|\| 3000` | Default value |
| `.env` | Environment file |
| `.gitignore` | Exclude .env |

### Environment-Specific
```javascript
if (process.env.NODE_ENV === 'production') {
  // Production code
} else {
  // Development code
}
