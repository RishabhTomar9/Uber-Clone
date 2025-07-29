# User Registration API Documentation

## Endpoint: `POST /users/register`

### Description
Registers a new user in the system. Validates the input data, hashes the password, and stores the user in the database. Returns a JWT token and user information upon successful registration.

---

### Request Body
Send as `application/json`:

```
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "emailAddress": "john.doe@example.com",
  "password": "yourPassword123",
  "confirmPassword": "yourPassword123"
}
```

#### Field Requirements
- `fullName.firstName`: String, required, minimum 3 characters
- `fullName.lastName`: String, required, minimum 3 characters
- `emailAddress`: String, required, must be a valid email
- `password`: String, required, minimum 8 characters
- `confirmPassword`: String, must match `password`

---

### Responses

#### Success (201 Created)
```
{
  "message": "User created successfully",
  "user": {
    "_id": "665f1c2e2b1e4a001e8e4b1a",
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "emailAddress": "john.doe@example.com",
    "createdAt": "2024-06-01T12:34:56.789Z",
    "updatedAt": "2024-06-01T12:34:56.789Z",
    "socketId": null
  },
  "token": "<jwt_token>"
}
```

##### Example Response
```
{
  "message": "User created successfully",
  "user": {
    "_id": "665f1c2e2b1e4a001e8e4b1a",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "emailAddress": "john.doe@example.com",
    "createdAt": "2024-06-01T12:34:56.789Z",
    "updatedAt": "2024-06-01T12:34:56.789Z",
    "socketId": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVmMWMyZTJiMWU0YTAwMWU4ZTRiMWEiLCJpYXQiOjE3MTcyMzg5OTYsImV4cCI6MTcxNzI0MjU5Nn0.abc123def456ghi789jkl"
}
```

#### Validation Error (400 Bad Request)
```
{
  "errors": [
    { "msg": "Invalid email address", "param": "email", ... },
    { "msg": "Password must be at least 8 characters long", "param": "password", ... },
    ...
  ]
}
```

#### Example cURL
```
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "emailAddress": "john.doe@example.com",
    "password": "yourPassword123",
    "confirmPassword": "yourPassword123"
  }'
```

---

### Notes
- All fields are required.
- Password and confirmPassword must match.
- On success, a JWT token is returned for authentication.


# User Login API Documentation

## Endpoint: `POST /users/login`

### Description
Authenticates a user with email and password. Returns a JWT token and user information upon successful login.

---

### Request Body
Send as `application/json`:

```
{
  "email": "john.doe@example.com",
  "password": "yourPassword123"
}
```

#### Field Requirements
- `email`: String, required, must be a valid email
- `password`: String, required, minimum 8 characters

---

### Responses

#### Success (200 OK)
```
{
  "token": "<jwt_token>",
  "user": {
    "_id": "665f1c2e2b1e4a001e8e4b1a",
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "emailAddress": "john.doe@example.com",
    "createdAt": "2024-06-01T12:34:56.789Z",
    "updatedAt": "2024-06-01T12:34:56.789Z",
    "socketId": null
  }
}
```

##### Example Response
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVmMWMyZTJiMWU0YTAwMWU4ZTRiMWEiLCJpYXQiOjE3MTcyMzg5OTYsImV4cCI6MTcxNzI0MjU5Nn0.abc123def456ghi789jkl",
  "user": {
    "_id": "665f1c2e2b1e4a001e8e4b1a",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "emailAddress": "john.doe@example.com",
    "createdAt": "2024-06-01T12:34:56.789Z",
    "updatedAt": "2024-06-01T12:34:56.789Z",
    "socketId": null
  }
}
```

#### Validation Error (400 Bad Request)
```
{
  "errors": [
    { "msg": "Invalid email address", "param": "email", ... },
    { "msg": "Password must be at least 8 characters long", "param": "password", ... },
    ...
  ]
}
```

#### Authentication Error (401 Unauthorized)
```
{
  "message": "Invalid email or password"
}
```

#### Example cURL
```
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourPassword123"
  }'
```

---

### Notes
- Both fields are required.
- On success, a JWT token is returned for authentication.


# User Profile API Documentation

## Endpoint: `GET /users/profile`

### Description
Returns the authenticated user's profile information. Requires a valid JWT token in the request.

---

### Authentication
- **Required**: Yes (JWT in `Authorization` header as `Bearer <token>` or in `token` cookie)

---

### Request Example
```
GET /users/profile
Authorization: Bearer <jwt_token>
```

---

### Success Response (200 OK)
```
{
  "_id": "665f1c2e2b1e4a001e8e4b1a",
  "fullName": { "firstName": "John", "lastName": "Doe" },
  "emailAddress": "john.doe@example.com",
  "createdAt": "2024-06-01T12:34:56.789Z",
  "updatedAt": "2024-06-01T12:34:56.789Z",
  "socketId": null
}
```

#### Example cURL
```
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

### Error Responses
- **401 Unauthorized**: If token is missing or invalid

```
{
  "message": "Unauthorized"
}
```


# User Logout API Documentation

## Endpoint: `GET /users/logout`

### Description
Logs out the authenticated user by blacklisting the JWT token and clearing the authentication cookie. Requires a valid JWT token.

---

### Authentication
- **Required**: Yes (JWT in `Authorization` header as `Bearer <token>` or in `token` cookie)

---

### Request Example
```
GET /users/logout
Authorization: Bearer <jwt_token>
```

---

### Success Response (200 OK)
```
{
  "message": "Logged out successfully"
}
```

#### Example cURL
```
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <jwt_token>"
```

---

### Error Responses
- **401 Unauthorized**: If token is missing or invalid

```
{
  "message": "Unauthorized"
}
``` 