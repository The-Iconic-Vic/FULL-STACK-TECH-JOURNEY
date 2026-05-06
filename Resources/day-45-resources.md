# 📚 Day 45 Resources - MongoDB & Mongoose

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MongoDB Official Docs | https://www.mongodb.com/docs/ |
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas |
| Mongoose Official Docs | https://mongoosejs.com/ |
| Mongoose Schemas | https://mongoosejs.com/docs/guide.html |
| Mongoose Models | https://mongoosejs.com/docs/models.html |
| Mongoose Queries | https://mongoosejs.com/docs/queries.html |
| MongoDB Compass | https://www.mongodb.com/products/compass |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| MongoDB Crash Course | https://youtu.be/2oe7sIsoUdA |
| Mongoose Tutorial | https://youtu.be/DZBGEVgL2eE |
| MongoDB Atlas Setup | https://youtu.be/TB1iQgjwBSU |
| Node.js + Express + MongoDB | https://youtu.be/0oXYd8Wv1Yc |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| MongoDB Atlas | Cloud database | https://mongodb.com/cloud/atlas |
| MongoDB Compass | GUI for MongoDB | https://www.mongodb.com/products/compass |
| Studio 3T | MongoDB GUI (free) | https://studio3t.com |
| Postman | API testing | https://postman.com |

## 📝 Mongoose Cheatsheet

### Connection
```javascript
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
```

### Schema
```javascript
const schema = new mongoose.Schema({
  name: { type: String, required: true }
});
const Model = mongoose.model('Model', schema);
```

### Create
```javascript
await Model.create(data);
const doc = new Model(data); await doc.save();
```

### Read
```javascript
await Model.find(filter);
await Model.findById(id);
await Model.findOne(filter);
```

### Update
```javascript
await Model.findByIdAndUpdate(id, update, { new: true });
await Model.updateMany(filter, update);
```

### Delete
```javascript
await Model.findByIdAndDelete(id);
await Model.deleteMany(filter);
```

## ✅ Environment Setup

### .env file
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=3000
```

### .gitignore
```
node_modules/
.env
.DS_Store
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `MongooseServerSelectionError` | Wrong IP whitelist | Add IP to Atlas Network Access |
| `Authentication failed` | Wrong password | Check password in connection string |
| `Cannot overwrite model` | Model already compiled | Use `mongoose.models.Model` or `mongoose.model()` once |
| `Cast to ObjectId failed` | Invalid ID format | Validate ID before query |
| `Validation failed` | Schema validation error | Check required fields |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| MongoDB Aggregation Pipeline | https://www.mongodb.com/docs/manual/aggregation/ |
| Mongoose Middleware | https://mongoosejs.com/docs/middleware.html |
| Mongoose Population | https://mongoosejs.com/docs/populate.html |
| MongoDB Indexes | https://www.mongodb.com/docs/manual/indexes/ |
