# 📚 Day 47 Resources - Authentication with JWT

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| JWT.io Official | https://jwt.io |
| JWT Debugger | https://jwt.io/#debugger-io |
| jsonwebtoken npm | https://www.npmjs.com/package/jsonwebtoken |
| bcryptjs npm | https://www.npmjs.com/package/bcryptjs |
| Node.js Crypto | https://nodejs.org/api/crypto.html |
| OWASP Password Storage | https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| JWT Explained | https://youtu.be/7Q17ubqLfaM |
| Node.js Authentication with JWT | https://youtu.be/mbsmsi7l3r4 |
| bcrypt Tutorial | https://youtu.be/O6cmuiTBZVs |
| JWT Middleware | https://youtu.be/7nafaH9Sddw |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| JWT Debugger | Decode and verify JWTs | https://jwt.io |
| Postman | Test authentication endpoints | https://postman.com |
| bcrypt Generator | Hash passwords online | https://bcrypt-generator.com |
| Random Key Generator | Generate JWT secrets | https://randomkeygen.com |

## 📝 JWT Cheatsheet

### Generate Token
```javascript
jwt.sign({ id: user._id }, SECRET, { expiresIn: '30d' })
```

### Verify Token
```javascript
jwt.verify(token, SECRET)
```

### Token Options
| Option | Example |
|--------|---------|
| expiresIn | `'30d'`, `'7d'`, `'24h'`, `'3600s'` |
| issuer | `'myapp'` |
| audience | `'myapp-users'` |

## 🔐 bcrypt Cheatsheet

### Hash Password
```javascript
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);
```

### Compare Password
```javascript
const isMatch = await bcrypt.compare(password, hashedPassword);
```

### Salt Rounds
| Rounds | Time (approx) | Security |
|--------|---------------|----------|
| 8 | 0.05s | Low |
| 10 | 0.1s | Good (default) |
| 12 | 0.4s | Better |
| 14 | 1.5s | High |

## 📋 Authentication Flow

```
1. Register
   Client → POST /api/auth/register → Hash password → Save user → Return JWT

2. Login
   Client → POST /api/auth/login → Find user → Compare password → Return JWT

3. Protected Route
   Client → GET /api/todos (with Bearer token) → Verify JWT → Return data
```

## 🧪 Testing Headers

### Postman Setup
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### cURL
```bash
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/api/todos
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `JsonWebTokenError: invalid signature` | Wrong secret | Check JWT_SECRET matches |
| `TokenExpiredError` | Token expired | Login again |
| `bcrypt.compare always false` | Wrong hashing | Check salt rounds match |
| `Cannot read property 'id' of undefined` | No user in req | Check middleware order |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| JWT Best Practices | https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/ |
| Password Security | https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html |
| OAuth 2.0 | https://oauth.net/2/ |
| Refresh Tokens | https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/ |

