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
  "message": "Login successful",
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
  "message": "Login successful",
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

# Caption Registration API Documentation

## Endpoint: `POST /captions/register`

### Description
Registers a new caption (driver) in the system. Validates the input data, hashes the password, and stores the caption in the database. Returns the created caption and a JWT token upon successful registration.

---

### Request Body
Send as `application/json`:

```
{
  "fullName": {
    "firstName": "Ali",
    "lastName": "Khan"
  },
  "email": "ali.khan@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC-1234",
    "capacity": 4,
    "vehicleType": "car"
  },
  "location": {
    "lat": 24.8607,
    "lng": 67.0011
  }
}
```

#### Field Requirements
- `fullName.firstName`: String, required, minimum 3 characters
- `fullName.lastName`: String, required, minimum 3 characters
- `email`: String, required, must be a valid email
- `password`: String, required, minimum 8 characters
- `vehicle.color`: String, required, minimum 3 characters
- `vehicle.plate`: String, required, minimum 3 characters
- `vehicle.capacity`: Integer, required, minimum 1
- `vehicle.vehicleType`: String, required, one of `car`, `bike`, `auto`, `other`
- `location.lat`: Float, required, between -90 and 90
- `location.lng`: Float, required, between -180 and 180

---

### Responses

#### Success (201 Created)
```
{
  "message": "Caption created successfully",
  "caption": {
    "_id": "665f1c2e2b1e4a001e8e4b1a",
    "fullName": { "firstName": "Ali", "lastName": "Khan" },
    "email": "ali.khan@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": 24.8607,
      "lng": 67.0011
    },
    "status": "active",
    "createdAt": "2024-06-01T12:34:56.789Z",
    "socketId": null
  }
}
```

#### Validation Error (400 Bad Request)
```
{
  "errors": [
    { "msg": "First name must be at least 3 characters long", "param": "fullName.firstName", ... },
    { "msg": "Invalid email address", "param": "email", ... },
    ...
  ]
}
```

#### Already Exists (400 Bad Request)
```
{
  "message": "Caption already exists"
}
```

---

### Example cURL
```
curl -X POST http://localhost:3000/captions/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "Ali", "lastName": "Khan" },
    "email": "ali.khan@example.com",
    "password": "securePassword123",
    "vehicle": {
      "color": "Red",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": 24.8607,
      "lng": 67.0011
    }
  }'
```

---

### Notes
- All fields are required.
- The backend validates all fields and returns detailed errors if validation fails.
- On success, a JWT token is set as a cookie and the created caption is returned in the response.
- The endpoint is intended for registering new captions (drivers) with their vehicle and location details. 