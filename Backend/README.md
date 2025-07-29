# Uber Clone Backend API Documentation

## Overview
This is the backend API for an Uber Clone application that handles user registration, driver (caption) registration, authentication, and profile management.

## Base URL
```
http://localhost:3000
```

## Authentication
Most protected routes require a JWT token that can be sent either:
- As a cookie named `token`
- In the Authorization header as `Bearer <token>`

---

## User Routes (`/users`)

### 1. Register User
**Endpoint:** `POST /users/register`

**Description:** Registers a new user in the system.

**Request Body:**
```json
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

**Validation Rules:**
- `fullName.firstName`: String, required, 3-50 characters
- `fullName.lastName`: String, required, 3-50 characters
- `emailAddress`: String, required, valid email format
- `password`: String, required, 8-100 characters
- `confirmPassword`: String, must match password

**Success Response (201):**
```json
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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors or user already exists
- `500 Internal Server Error`: Server error

---

### 2. Login User
**Endpoint:** `POST /users/login`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "yourPassword123"
}
```

**Validation Rules:**
- `email`: String, required, valid email format
- `password`: String, required, minimum 8 characters

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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

**Error Responses:**
- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Invalid credentials
- `500 Internal Server Error`: Server error

---

### 3. Get User Profile
**Endpoint:** `GET /users/profile`

**Description:** Retrieves the authenticated user's profile information.

**Headers:**
```
Authorization: Bearer <token>
```
or
```
Cookie: token=<token>
```

**Success Response (200):**
```json
{
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
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token

---

### 4. Logout User
**Endpoint:** `GET /users/logout`

**Description:** Logs out the user by blacklisting their JWT token.

**Headers:**
```
Authorization: Bearer <token>
```
or
```
Cookie: token=<token>
```

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token

---

## Caption (Driver) Routes (`/captions`)

### 1. Register Caption
**Endpoint:** `POST /captions/register`

**Description:** Registers a new caption (driver) in the system with vehicle and location details.

**Request Body:**
```json
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

**Validation Rules:**
- `fullName.firstName`: String, required, minimum 3 characters
- `fullName.lastName`: String, required, minimum 3 characters
- `email`: String, required, valid email format
- `password`: String, required, minimum 8 characters
- `vehicle.color`: String, required, minimum 3 characters
- `vehicle.plate`: String, required, minimum 3 characters
- `vehicle.capacity`: Integer, required, minimum 1
- `vehicle.vehicleType`: String, required, one of: `car`, `bike`, `auto`, `other`
- `location.lat`: Float, required, between -90 and 90
- `location.lng`: Float, required, between -180 and 180

**Success Response (201):**
```json
{
  "message": "Caption created successfully",
  "caption": {
    "_id": "665f1c2e2b1e4a001e8e4b1a",
    "fullName": {
      "firstName": "Ali",
      "lastName": "Khan"
    },
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

**Error Responses:**
- `400 Bad Request`: Validation errors or caption already exists
- `500 Internal Server Error`: Server error

---

### 2. Login Caption
**Endpoint:** `POST /captions/login`

**Description:** Authenticates a caption (driver) and returns a JWT token.

**Request Body:**
```json
{
  "email": "ali.khan@example.com",
  "password": "securePassword123"
}
```

**Validation Rules:**
- `email`: String, required, valid email format
- `password`: String, required, minimum 8 characters

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful",
  "caption": {
    "_id": "665f1c2e2b1e4a001e8e4b1a",
    "fullName": {
      "firstName": "Ali",
      "lastName": "Khan"
    },
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

**Error Responses:**
- `400 Bad Request`: Validation errors or invalid credentials
- `500 Internal Server Error`: Server error

---

### 3. Get Caption Profile
**Endpoint:** `GET /captions/profile`

**Description:** Retrieves the authenticated caption's profile information.

**Headers:**
```
Authorization: Bearer <token>
```
or
```
Cookie: token=<token>
```

**Success Response (200):**
```json
{
  "caption": {
    "_id": "665f1c2e2b1e4a001e8e4b1a",
    "fullName": {
      "firstName": "Ali",
      "lastName": "Khan"
    },
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

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token

---

### 4. Logout Caption
**Endpoint:** `GET /captions/logout`

**Description:** Logs out the caption by blacklisting their JWT token.

**Headers:**
```
Authorization: Bearer <token>
```
or
```
Cookie: token=<token>
```

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token

---

## General Routes

### 1. Health Check
**Endpoint:** `GET /`

**Description:** Basic health check endpoint.

**Success Response (200):**
```
Hello World
```

---

## Error Response Format

### Validation Errors (400)
```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body",
      "value": "invalid-email"
    }
  ]
}
```

### Authentication Errors (401)
```json
{
  "message": "Unauthorized"
}
```

### Server Errors (500)
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  fullName: {
    firstName: String (3-50 chars),
    lastName: String (3-50 chars)
  },
  emailAddress: String (unique, valid email),
  password: String (8-100 chars, hashed),
  createdAt: Date,
  updatedAt: Date,
  socketId: String (nullable)
}
```

### Caption Model
```javascript
{
  _id: ObjectId,
  fullName: {
    firstName: String (min 3 chars),
    lastName: String (min 3 chars)
  },
  email: String (unique, valid email),
  password: String (min 8 chars, hashed),
  socketId: String (nullable),
  status: String (enum: 'active', 'inactive'),
  vehicle: {
    color: String (min 3 chars),
    plate: String (min 3 chars),
    capacity: Number (min 1),
    vehicleType: String (enum: 'car', 'bike', 'auto', 'other')
  },
  location: {
    lat: Number (-90 to 90),
    lng: Number (-180 to 180)
  },
  createdAt: Date
}
```

### BlacklistToken Model
```javascript
{
  _id: ObjectId,
  token: String (unique),
  createdAt: Date (auto-expires after 24 hours)
}
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your_jwt_secret_key_here
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

---

## Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env` file

3. Start the server:
```bash
npm start
```

---

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **cookie-parser** - Cookie parsing

---

## Notes

- All passwords are hashed using bcrypt with a salt rounds of 10
- JWT tokens expire after 24 hours
- Blacklisted tokens are automatically removed after 24 hours
- The API supports both cookie-based and header-based token authentication
- All timestamps are in ISO 8601 format
- Vehicle types are restricted to: car, bike, auto, other
- Location coordinates must be valid latitude/longitude values 