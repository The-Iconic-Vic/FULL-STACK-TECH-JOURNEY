# 📅 Day 43: Node.js & NPM Fundamentals

**Date:** May 4, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 3 - Backend Development  
**Topics:** Node.js Runtime, NPM, Core Modules (fs, path, os, process)

---

## 📋 Learning Objectives

- ✅ Understand what Node.js is and why it matters
- ✅ Differentiate between browser JavaScript and Node.js
- ✅ Initialize an npm project with `npm init`
- ✅ Understand package.json structure
- ✅ Install and manage dependencies
- ✅ Work with core Node modules: fs, path, os, process
- ✅ Build a CLI tool for file organization

---

## 🟢 Part 1: What is Node.js?

### JavaScript Outside the Browser

Node.js is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run on the server side.

```
┌─────────────────────────────────────────────────────────────┐
│                    JavaScript Runtime                        │
├─────────────────────────┬───────────────────────────────────┤
│      Browser (Client)    │           Node.js (Server)        │
├─────────────────────────┼───────────────────────────────────┤
│ • DOM manipulation       │ • File system access             │
│ • Event listeners        │ • HTTP server creation           │
│ • Browser APIs           │ • Database connections           │
│ • Cannot access file sys │ • Can access file system         │
│ • Single-threaded        │ • Event-driven, non-blocking      │
└─────────────────────────┴───────────────────────────────────┘
```

---

### Key Features of Node.js

| Feature | Description |
|---------|-------------|
| **Event-driven** | Responds to events (requests, file operations) |
| **Non-blocking I/O** | Doesn't wait for slow operations |
| **Single-threaded** | One thread handles many connections |
| **V8 Engine** | Same engine that powers Chrome |
| **npm** | Largest ecosystem of open-source libraries |

---

### Node.js vs Browser JavaScript

| Feature | Browser JS | Node.js |
|---------|------------|---------|
| Global object | `window` | `global` |
| DOM | ✅ Available | ❌ Not available |
| File system | ❌ Not available | ✅ `fs` module |
| Modules | ES modules (`import`) | CommonJS (`require`) |
| Event loop | Similar | Similar (server-focused) |
| Use case | UI interactivity | Backend APIs, CLIs |

---

## 📦 Part 2: NPM (Node Package Manager)

### Initializing a Project

```bash
# Create project directory
mkdir my-project
cd my-project

# Initialize package.json (interactive)
npm init

# Initialize with defaults (skip questions)
npm init -y
```

---

### package.json Explained

```json
{
  "name": "my-project",           // Project name
  "version": "1.0.0",             // Semantic version
  "description": "My Node project", // Project description
  "main": "index.js",             // Entry point file
  "scripts": {
    "start": "node index.js",     // npm start command
    "dev": "node --watch index.js" // npm run dev command
  },
  "keywords": ["node", "cli"],    // Search keywords
  "author": "Victor Innocent",    // Author name
  "license": "MIT",               // License type
  "dependencies": {               // Production dependencies
    "express": "^4.18.0"
  },
  "devDependencies": {            // Development dependencies
    "nodemon": "^2.0.0"
  }
}
```

---

### Installing Dependencies

```bash
# Install a package (adds to dependencies)
npm install express

# Install as dev dependency
npm install --save-dev nodemon

# Install globally
npm install -g nodemon

# Install from package.json
npm install

# Install specific version
npm install express@4.18.0

# Uninstall package
npm uninstall express
```

---

### Semantic Versioning

| Version Part | Example | Meaning |
|--------------|---------|---------|
| Major | `4.x.x` | Breaking changes |
| Minor | `x.18.x` | New features (backwards compatible) |
| Patch | `x.x.0` | Bug fixes |
| Caret (^) | `^4.18.0` | Updates minor and patch |
| Tilde (~) | `~4.18.0` | Updates only patch |

---

### node_modules Folder

- Contains all installed dependencies
- Usually large - add to `.gitignore`
- Never commit to version control

```gitignore
# .gitignore
node_modules/
.env
.DS_Store
```

---

## 📁 Part 3: Core Node Modules

### fs (File System)

```javascript
const fs = require('fs');

// Synchronous operations (blocking)
const content = fs.readFileSync('file.txt', 'utf8');
fs.writeFileSync('output.txt', 'Hello World');
fs.appendFileSync('log.txt', 'New line\n');
fs.unlinkSync('file.txt');  // Delete

// Asynchronous operations (non-blocking - preferred)
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Promise-based (modern)
const fs = require('fs/promises');
const data = await fs.readFile('file.txt', 'utf8');

// Directory operations
fs.readdirSync('./');           // List files
fs.mkdirSync('new-folder');     // Create directory
fs.rmdirSync('old-folder');     // Remove directory
fs.existsSync('file.txt');      // Check existence
fs.statSync('file.txt');        // File information
```

**Common fs methods:**

| Method | Purpose |
|--------|---------|
| `readFileSync()` | Read file (blocking) |
| `writeFileSync()` | Write file (blocking) |
| `appendFileSync()` | Append to file |
| `readdirSync()` | Read directory contents |
| `mkdirSync()` | Create directory |
| `renameSync()` | Rename/move file |
| `unlinkSync()` | Delete file |
| `statSync()` | Get file info |

---

### path (Path Manipulation)

```javascript
const path = require('path');

// Join paths (cross-platform)
const fullPath = path.join('/users', 'victor', 'file.txt');
// '/users/victor/file.txt'

// Get file extension
const ext = path.extname('image.jpg');  // '.jpg'

// Get file name
const basename = path.basename('/users/file.txt');  // 'file.txt'

// Get directory name
const dirname = path.dirname('/users/file.txt');    // '/users'

// Resolve to absolute path
const absolute = path.resolve('folder/file.txt');

// Parse file into components
const parsed = path.parse('/users/file.txt');
// { root: '/', dir: '/users', base: 'file.txt', ext: '.txt', name: 'file' }

// Normalize path (removes extra slashes)
const normalized = path.normalize('/users//victor/../file.txt');
```

---

### os (Operating System)

```javascript
const os = require('os');

// Platform info
console.log(os.platform());     // 'win32', 'linux', 'darwin'
console.log(os.arch());         // 'x64', 'arm64'
console.log(os.type());         // 'Windows_NT', 'Linux'

// CPU info
console.log(os.cpus());         // Array of CPU cores
console.log(os.cpus().length);  // Number of cores

// Memory info
console.log(os.totalmem());     // Total RAM in bytes
console.log(os.freemem());      // Free RAM in bytes

// System info
console.log(os.homedir());      // User home directory
console.log(os.hostname());     // Computer name
console.log(os.uptime());       // System uptime in seconds
console.log(os.userInfo());     // Current user info
```

---

### process (Process Information)

```javascript
// Environment variables
console.log(process.env.NODE_ENV);      // 'development', 'production'
console.log(process.env.PATH);          // System PATH

// Command line arguments
console.log(process.argv);
// ['node', '/path/to/script.js', 'arg1', 'arg2']

// Process info
console.log(process.version);    // Node.js version
console.log(process.pid);        // Process ID
console.log(process.cwd());      // Current working directory
console.log(process.platform);   // Operating system

// Exit process
process.exit(0);    // Success
process.exit(1);    // Error

// Handle events
process.on('exit', (code) => {
    console.log(`Exiting with code: ${code}`);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught error:', err);
    process.exit(1);
});
```

---

## 🛠️ Part 4: Building a CLI Tool

### File Organizer Structure

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get directory from command line or use current
const targetDir = process.argv[2] || process.cwd();

// Define file categories
const extensions = {
    'Images': ['.jpg', '.jpeg', '.png', '.gif'],
    'Documents': ['.pdf', '.txt', '.doc', '.docx'],
    'Code': ['.js', '.py', '.html', '.css', '.json']
};

function getCategory(filename) {
    const ext = path.extname(filename).toLowerCase();
    for (const [category, exts] of Object.entries(extensions)) {
        if (exts.includes(ext)) return category;
    }
    return 'Others';
}

function organizeFiles(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const filePath = path.join(directory, file);
        if (fs.statSync(filePath).isDirectory()) continue;
        
        const category = getCategory(file);
        const categoryPath = path.join(directory, category);
        
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath);
        }
        
        const newPath = path.join(categoryPath, file);
        fs.renameSync(filePath, newPath);
        console.log(`Moved: ${file} → ${category}/`);
    }
}

organizeFiles(targetDir);
```

---

## 📝 Quick Reference

### npm Commands

| Command | Purpose |
|---------|---------|
| `npm init -y` | Create package.json |
| `npm install <package>` | Install dependency |
| `npm install --save-dev <package>` | Install dev dependency |
| `npm install` | Install all dependencies |
| `npm uninstall <package>` | Remove dependency |
| `npm update` | Update dependencies |
| `npm run <script>` | Run script from package.json |

### Core Modules Quick Reference

| Module | Common Methods |
|--------|----------------|
| `fs` | `readFileSync`, `writeFileSync`, `readdirSync`, `mkdirSync`, `renameSync` |
| `path` | `join`, `extname`, `basename`, `dirname`, `resolve`, `parse` |
| `os` | `platform`, `cpus`, `totalmem`, `homedir`, `uptime` |
| `process` | `argv`, `env`, `cwd`, `exit`, `version` |

---

## ✅ Day 43 Checklist

- [ ] Understand what Node.js is and its use cases
- [ ] Create a project with `npm init`
- [ ] Understand package.json structure
- [ ] Install dependencies with npm
- [ ] Differentiate dependencies vs devDependencies
- [ ] Read/write files using fs module
- [ ] Work with paths using path module
- [ ] Access system info using os module
- [ ] Use command-line arguments (process.argv)
- [ ] Build File Organizer CLI tool
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Node.js allows JavaScript to run on servers** - not just browsers
2. **npm is the largest package ecosystem** - millions of packages available
3. **package.json is the heart of Node projects** - tracks dependencies and scripts
4. **Core modules (fs, path, os) are built-in** - no installation needed
5. **`process.argv` gives command-line arguments** - enables CLI tools
6. **File operations can be synchronous or async** - use async for better performance
7. **`node_modules` should be in .gitignore** - it's huge and can be regenerated
8. **`require()` vs `import`** - Node uses CommonJS by default (`require`)

