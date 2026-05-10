# 📚 Day 49 Resources - Week 7 Capstone

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React Documentation | https://react.dev |
| React Router Documentation | https://reactrouter.com/en/main |
| Express.js Documentation | https://expressjs.com |
| MongoDB Documentation | https://www.mongodb.com/docs/ |
| Mongoose Documentation | https://mongoosejs.com/docs/guide.html |
| JWT.io | https://jwt.io |
| bcryptjs Documentation | https://www.npmjs.com/package/bcryptjs |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Full Stack MERN Tutorial | https://youtu.be/7CqJlxBYj-M |
| JWT Authentication Tutorial | https://youtu.be/7nafaH9Sddw |
| React Context API | https://youtu.be/5LrDIWkK_Bc |
| MongoDB Relationships | https://youtu.be/2oe7sIsoUdA |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Postman | API testing | https://postman.com |
| MongoDB Compass | Database GUI | https://mongodb.com/products/compass |
| MongoDB Atlas | Cloud database | https://mongodb.com/cloud/atlas |
| VS Code | Code editor | https://code.visualstudio.com |
| Git | Version control | https://git-scm.com |

## 📝 Environment Variables Template

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/task_management_db
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## ✅ API Endpoints Summary

### Auth Routes
| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/api/auth/register` | `{ name, email, password }` | `{ token, user }` |
| POST | `/api/auth/login` | `{ email, password }` | `{ token, user }` |
| GET | `/api/auth/me` | - | `{ user }` |

### Task Routes
| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| GET | `/api/tasks` | Query params | `{ tasks, count }` |
| GET | `/api/tasks/:id` | - | `{ task }` |
| POST | `/api/tasks` | `{ title, description, status, priority, dueDate }` | `{ task }` |
| PUT | `/api/tasks/:id` | `{ title, description, status, priority, dueDate }` | `{ task }` |
| DELETE | `/api/tasks/:id` | - | `{ message }` |
| PATCH | `/api/tasks/:id/status` | `{ status }` | `{ task }` |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid/expired token | Re-login or check token in localStorage |
| 403 Forbidden | Trying to access another user's task | Check user reference in task query |
| 400 Bad Request | Missing required fields | Add validation on both frontend and backend |
| CORS error | Backend not configured | Add `cors()` middleware with frontend URL |
| MongoDB connection error | Wrong connection string | Check `.env` and network access |
| `req.user is undefined` | Auth middleware not applied | Add `protect` middleware to routes |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| MERN Stack Best Practices | https://www.mongodb.com/mern-stack |
| JWT Best Practices | https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/ |
| REST API Design | https://restfulapi.net/ |
| Axios Interceptors | https://axios-http.com/docs/interceptors |

