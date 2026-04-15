# 📘 HTTP Methods Reference

## What are HTTP Methods?

HTTP methods (also called HTTP verbs) indicate the desired action to be performed on a resource.

| Method | CRUD | Description | Safe | Idempotent |
|--------|------|-------------|------|-------------|
| GET | Read | Retrieve data | ✅ | ✅ |
| POST | Create | Create new resource | ❌ | ❌ |
| PUT | Update | Replace entire resource | ❌ | ✅ |
| PATCH | Update | Partial update | ❌ | ❌ |
| DELETE | Delete | Remove resource | ❌ | ✅ |
| HEAD | Read | Headers only | ✅ | ✅ |
| OPTIONS | Read | Allowed methods | ✅ | ✅ |

---

## GET Method

Used to retrieve data from the server. GET requests should not have a body.

```javascript
// Basic GET
const response = await fetch('https://api.example.com/users');
const users = await response.json();

// GET with query parameters
const response = await fetch('https://api.example.com/users?page=2&limit=10');
const users = await response.json();

// GET with headers (authentication)
const response = await fetch('https://api.example.com/users/me', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
});
Characteristics:

Data is passed in URL (query parameters)

Can be cached by browser

Remains in browser history

Can be bookmarked

Length limited by URL length (about 2000 characters)

Should NOT be used for sensitive data (passwords, credit cards)

POST Method
Used to create new resources on the server.

javascript
const newUser = {
    name: 'Victor',
    email: 'victor@example.com',
    age: 25
};

const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
});

const createdUser = await response.json();
Characteristics:

Data is sent in request body

Not cached by default

Not stored in browser history

Cannot be bookmarked

No length limitations

Can send sensitive data (body is encrypted in HTTPS)

PUT Method
Used to update an entire resource (replace).

javascript
const updatedUser = {
    name: 'Victor Updated',
    email: 'victor_new@example.com',
    age: 26
};

const response = await fetch('https://api.example.com/users/1', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedUser)
});

const user = await response.json();
Characteristics:

Replaces the entire resource

Requires all fields (missing fields may be deleted)

Idempotent (multiple identical requests have same effect)

PATCH Method
Used to partially update a resource.

javascript
// Only update the name
const updates = {
    name: 'Victor New Name'
};

const response = await fetch('https://api.example.com/users/1', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
});

const user = await response.json();
Characteristics:

Updates only provided fields

More efficient than PUT for partial updates

Not necessarily idempotent

DELETE Method
Used to remove a resource.

javascript
const response = await fetch('https://api.example.com/users/1', {
    method: 'DELETE'
});

if (response.ok) {
    console.log('User deleted');
}
Characteristics:

Usually returns 204 No Content on success

Idempotent (deleting same resource multiple times has same effect)

HEAD Method
Same as GET but returns only headers, no body.

javascript
const response = await fetch('https://api.example.com/large-file.zip', {
    method: 'HEAD'
});

const contentLength = response.headers.get('Content-Length');
const contentType = response.headers.get('Content-Type');

console.log(`File size: ${contentLength} bytes`);
Use cases:

Check file size before download

Check if resource exists

Check last-modified date

OPTIONS Method
Returns the HTTP methods supported by the server for a resource.

javascript
const response = await fetch('https://api.example.com/users', {
    method: 'OPTIONS'
});

const allowedMethods = response.headers.get('Allow');
console.log(allowedMethods); // "GET, POST, PUT, DELETE, OPTIONS"
Use cases:

CORS preflight requests (browser handles automatically)

Discovering API capabilities

Status Code Reference
Success (2xx)
Code	Name	Description
200	OK	GET request success
201	Created	POST request success
204	No Content	DELETE request success
Redirection (3xx)
Code	Name	Description
301	Moved Permanently	Resource moved permanently
304	Not Modified	Cached version is current
Client Error (4xx)
Code	Name	Description
400	Bad Request	Invalid request format
401	Unauthorized	Authentication required
403	Forbidden	No permission
404	Not Found	Resource doesn't exist
409	Conflict	Conflict with current state
422	Unprocessable Entity	Validation failed
429	Too Many Requests	Rate limit exceeded
Server Error (5xx)
Code	Name	Description
500	Internal Server Error	Generic server error
502	Bad Gateway	Invalid response from upstream
503	Service Unavailable	Server overloaded or down
504	Gateway Timeout	Upstream timeout
RESTful API Patterns
URL	GET	POST	PUT	DELETE
/users	List users	Create user	Bulk update	Bulk delete
/users/1	Get user 1	Error	Update user 1	Delete user 1
/users/1/posts	Get user's posts	Create post for user	Bulk update	Bulk delete
/posts/1	Get post 1	Error	Update post 1	Delete post 1
javascript
// RESTful API examples
const api = 'https://api.example.com';

// GET - List all users
await fetch(`${api}/users`);

// GET - Get specific user
await fetch(`${api}/users/1`);

// POST - Create new user
await fetch(`${api}/users`, { method: 'POST', body: JSON.stringify(user) });

// PUT - Update entire user
await fetch(`${api}/users/1`, { method: 'PUT', body: JSON.stringify(user) });

// PATCH - Partial update
await fetch(`${api}/users/1`, { method: 'PATCH', body: JSON.stringify({ name: 'New' }) });

// DELETE - Remove user
await fetch(`${api}/users/1`, { method: 'DELETE' });
Best Practices
Practice	Why
Use appropriate HTTP methods	Follow REST conventions
Set correct Content-Type header	Server needs to parse body
Check response.ok	Don't assume success
Handle 4xx and 5xx errors	Provide user feedback
Use HTTPS in production	Encrypt sensitive data
Don't PUT/PATCH what you didn't GET	Avoid data loss
Use query parameters for GET filters	Follow REST patterns