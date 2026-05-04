# 📘 Node.js & NPM Reference

## What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run outside the browser, primarily on servers.

### Key Features

| Feature | Description |
|---------|-------------|
| **Event-driven** | Responds to events as they occur |
| **Non-blocking I/O** | Doesn't wait for slow operations to complete |
| **Single-threaded** | Uses one thread with event loop |
| **V8 Engine** | Same engine that powers Chrome |
| **npm** | Largest package ecosystem |

---

## Node.js vs Browser JavaScript

| Feature | Browser JS | Node.js |
|---------|------------|---------|
| Global object | `window` | `global` |
| DOM | ✅ | ❌ |
| File system | ❌ | ✅ (`fs`) |
| HTTP client | `fetch`, `XMLHttpRequest` | `http`, `https` modules |
| Modules | ES modules (`import`) | CommonJS (`require`) |
| Event loop | Yes | Yes (similar) |

---

## NPM (Node Package Manager)

### Basic Commands

```bash
# Initialize project
npm init                # Interactive
npm init -y             # Defaults

# Install dependencies
npm install <package>   # Save to dependencies
npm install --save-dev <package>  # Dev dependency
npm install -g <package>          # Global install
npm install             # Install from package.json

# Remove dependencies
npm uninstall <package>

# Update dependencies
npm update

# Run scripts
npm run <script-name>
npm start               # Special: runs "start" script
npm test                # Special: runs "test" script
```

---

### package.json Structure

```json
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "Project description",
  "main": "index.js",
  "type": "commonjs",        // or "module" for ES modules
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "keywords": ["node", "api"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0"
  }
}
```

### Semantic Versioning

| Symbol | Meaning | Example |
|--------|---------|---------|
| `^` | Compatible with major version | `^4.18.0` → `4.x.x` |
| `~` | Approximately equivalent | `~4.18.0` → `4.18.x` |
| `*` | Any version | `*` |
| `>` `>=` `<` `<=` | Comparison | `>=4.0.0 <5.0.0` |

---

## Core Modules

### fs (File System)

#### Synchronous Methods (Blocking)

```javascript
const fs = require('fs');

// Read file
const data = fs.readFileSync('file.txt', 'utf8');

// Write file
fs.writeFileSync('output.txt', 'Hello World');

// Append to file
fs.appendFileSync('log.txt', 'New line\n');

// Delete file
fs.unlinkSync('file.txt');

// Check if exists
if (fs.existsSync('file.txt')) { }

// Get file info
const stats = fs.statSync('file.txt');
console.log(stats.size);      // File size in bytes
console.log(stats.isFile());  // Is file?
console.log(stats.isDirectory()); // Is directory?
console.log(stats.birthtime); // Creation time
console.log(stats.mtime);     // Modification time

// Read directory
const files = fs.readdirSync('./');

// Create directory
fs.mkdirSync('new-folder');

// Remove directory
fs.rmdirSync('empty-folder');

// Rename/move file
fs.renameSync('old.txt', 'new.txt');
```

#### Asynchronous Methods (Non-blocking)

```javascript
// Callback pattern
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Promise-based (fs/promises)
const fs = require('fs/promises');

async function readFile() {
    try {
        const data = await fs.readFile('file.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
```

---

### path (Path Manipulation)

```javascript
const path = require('path');

// Join paths (cross-platform)
path.join('folder', 'subfolder', 'file.txt');
// 'folder/subfolder/file.txt' (Unix) or 'folder\\subfolder\\file.txt' (Windows)

// Get file extension
path.extname('image.jpg');     // '.jpg'

// Get file name
path.basename('/users/file.txt');        // 'file.txt'
path.basename('/users/file.txt', '.txt'); // 'file'

// Get directory name
path.dirname('/users/file.txt');          // '/users'

// Get absolute path
path.resolve('file.txt');                 // '/current/working/dir/file.txt'
path.resolve('folder', 'file.txt');       // '/current/working/dir/folder/file.txt'

// Normalize path (removes . and ..)
path.normalize('/users//victor/../file.txt'); // '/users/file.txt'

// Parse path into components
const parsed = path.parse('/users/victor/file.txt');
// {
//   root: '/',
//   dir: '/users/victor',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// Format components back to path
const formatted = path.format(parsed);  // '/users/victor/file.txt'

// Check if path is absolute
path.isAbsolute('/users/file.txt');  // true
path.isAbsolute('file.txt');         // false
```

---

### os (Operating System)

```javascript
const os = require('os');

// Platform
os.platform();      // 'win32', 'linux', 'darwin'
os.type();          // 'Windows_NT', 'Linux', 'Darwin'
os.arch();          // 'x64', 'arm64', 'ia32'

// CPU
os.cpus();          // Array of CPU objects
os.cpus().length;   // Number of CPU cores

// Memory
os.totalmem();      // Total RAM in bytes
os.freemem();       // Free RAM in bytes

// System
os.homedir();       // User home directory
os.hostname();      // Computer name
os.uptime();        // System uptime in seconds
os.userInfo();      // Current user info
os.endianness();    // 'BE' or 'LE'
os.loadavg();       // Load average (Unix only)
os.networkInterfaces(); // Network interfaces
```

---

### process (Process Information)

```javascript
// Environment variables
process.env.NODE_ENV;        // 'development', 'production'
process.env.PATH;            // System PATH

// Command line arguments
process.argv;
// ['node', '/path/to/script.js', 'arg1', 'arg2']

// Process info
process.version;             // Node.js version
process.versions;            // All version info
process.pid;                 // Process ID
process.ppid;                // Parent process ID
process.cwd();               // Current working directory
process.platform;            // Operating system
process.arch;                // CPU architecture
process.title;               // Process title
process.uptime();            // Process uptime (seconds)

// Exit
process.exit(0);             // Success
process.exit(1);             // Error

// Events
process.on('exit', (code) => {
    console.log(`Exiting with code: ${code}`);
});

process.on('uncaughtException', (err) => {
    console.error('Unhandled error:', err);
    process.exit(1);
});

process.on('SIGINT', () => {
    console.log('Received SIGINT (Ctrl+C)');
    process.exit();
});

// Standard streams
process.stdin;      // Readable stream for input
process.stdout;     // Writable stream for output
process.stderr;     // Writable stream for errors

process.stdout.write('Hello\n');
console.log('Hello');  // Same as process.stdout.write
```

---

## Creating CLI Tools

### Structure for CLI Tool

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get arguments
const args = process.argv.slice(2);
const command = args[0];
const options = args.slice(1);

// Parse options
function parseOptions(args) {
    const options = {};
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            const key = args[i].slice(2);
            const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
            options[key] = value;
            if (value !== true) i++;
        }
    }
    return options;
}

// Help text
function showHelp() {
    console.log(`
Usage: node index.js [command] [options]

Commands:
  init       Initialize project
  build      Build project
  clean      Clean project

Options:
  --dir      Target directory
  --force    Force operation
  --verbose  Verbose output

Examples:
  node index.js init --dir ./src
  node index.js build --force
    `);
}

// Main logic
async function main() {
    const command = args[0];
    const options = parseOptions(args.slice(1));

    switch (command) {
        case 'init':
            console.log('Initializing...');
            break;
        case 'build':
            console.log('Building...');
            break;
        case 'clean':
            console.log('Cleaning...');
            break;
        case 'help':
        case undefined:
            showHelp();
            break;
        default:
            console.error(`Unknown command: ${command}`);
            showHelp();
            process.exit(1);
    }
}

// Run
main().catch(console.error);
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

# Logs
logs/
*.log
npm-debug.log*

# Build output
dist/
build/
out/

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Test coverage
coverage/
.nyc_output/

# Temporary files
*.tmp
*.temp
```

---

## Common npm Scripts

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack --mode production",
    "lint": "eslint .",
    "format": "prettier --write .",
    "clean": "rm -rf node_modules",
    "reinstall": "npm run clean && npm install",
    "prepare": "husky install"
  }
}
```

---

## Useful npm Packages

| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `nodemon` | Auto-restart on changes |
| `dotenv` | Load environment variables |
| `axios` | HTTP client |
| `mongoose` | MongoDB ODM |
| `bcrypt` | Password hashing |
| `jsonwebtoken` | JWT authentication |
| `cors` | CORS middleware |
| `helmet` | Security headers |
| `morgan` | HTTP request logging |
| `jest` | Testing framework |
| `eslint` | Code linting |
| `prettier` | Code formatting |
