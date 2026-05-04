# 📚 Day 43 Resources - Node.js & NPM Fundamentals

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| Node.js Official Docs | https://nodejs.org/en/docs/ |
| Node.js fs Module | https://nodejs.org/api/fs.html |
| Node.js path Module | https://nodejs.org/api/path.html |
| Node.js os Module | https://nodejs.org/api/os.html |
| Node.js process Module | https://nodejs.org/api/process.html |
| npm Documentation | https://docs.npmjs.com/ |
| package.json Guide | https://docs.npmjs.com/cli/v10/configuring-npm/package-json |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Node.js Crash Course | https://youtu.be/fBNz5xF-Kx4 |
| Node.js Tutorial for Beginners | https://youtu.be/ENrzD9HAZK4 |
| npm Tutorial | https://youtu.be/jHDhaSSKmB0 |
| fs Module Tutorial | https://youtu.be/U57kU311-nE |

## ✅ npm Commands Cheatsheet

| Command | Purpose |
|---------|---------|
| `npm init -y` | Create package.json |
| `npm install <pkg>` | Install dependency |
| `npm install --save-dev <pkg>` | Install dev dependency |
| `npm install -g <pkg>` | Install globally |
| `npm uninstall <pkg>` | Remove dependency |
| `npm update` | Update dependencies |
| `npm run <script>` | Run script |
| `npm start` | Run start script |
| `npm test` | Run test script |
| `npm list` | List installed packages |
| `npm outdated` | Check outdated packages |

## 📝 Node.js Core Modules Cheatsheet

### fs (File System)
```javascript
// Read
fs.readFileSync('file.txt', 'utf8')
fs.readFile('file.txt', 'utf8', callback)
await fs.readFile('file.txt', 'utf8')

// Write
fs.writeFileSync('file.txt', 'content')
fs.writeFile('file.txt', 'content', callback)

// Directory
fs.readdirSync('./')
fs.mkdirSync('folder')
fs.existsSync('file.txt')

// Info
fs.statSync('file.txt')
```

### path (Path Manipulation)
```javascript
path.join('folder', 'file.txt')
path.extname('file.jpg')      // '.jpg'
path.basename('/path/file.txt')  // 'file.txt'
path.dirname('/path/file.txt')   // '/path'
path.resolve('file.txt')
```

### os (Operating System)
```javascript
os.platform()     // 'win32', 'linux', 'darwin'
os.cpus().length  // Number of cores
os.totalmem()     // Total RAM
os.homedir()      // Home directory
os.uptime()       // System uptime
```

### process (Process Info)
```javascript
process.argv      // Command line arguments
process.env       // Environment variables
process.cwd()     // Current working directory
process.exit(0)   // Exit process
process.version   // Node version
```

## 🚀 Quick Setup Commands

```bash
# Create project
mkdir my-project
cd my-project
npm init -y

# Install dependencies
npm install express
npm install --save-dev nodemon

# Create entry file
echo "console.log('Hello Node!')" > index.js

# Run
node index.js
npm start
```

## 🎯 Practice Exercises

### Exercise 1: File Reader
Create a script that reads a file and logs its content with line numbers.

### Exercise 2: Directory Lister
Create a CLI tool that lists all files in a directory with their sizes.

### Exercise 3: Environment Checker
Create a script that logs Node.js version, OS platform, and memory usage.

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `command not found: node` | Node not installed | Install Node.js from nodejs.org |
| `Cannot find module` | Missing dependency | Run `npm install` |
| `EACCES: permission denied` | Permission error | Use `sudo` or fix permissions |
| `ENOENT: no such file` | File not found | Check file path |
| `Module not found` | Wrong import path | Use correct relative path |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Node.js Event Loop | https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick |
| npm Best Practices | https://docs.npmjs.com/policies/npm-best-practices |
| Creating CLI Tools | https://nodejs.org/en/docs/guides/nodejs-docker-webapp |
| Node.js Security | https://nodejs.org/en/docs/guides/security/ |

