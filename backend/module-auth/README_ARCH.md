# Auth Module Architecture 🏗️

This module uses a **Layered Architecture** to keep code clean and organized.

## 📂 Structure
- **`routes/`**: The map of your application. It matches URLs to Controllers.
- **`controllers/`**: The "Traffic Cop". Handles the request (`req`), calls the Service, and sends the response (`res`).
- **`services/`**: The "Worker". Contains the actual business logic (Database calls, Password hashing, Token creation).
- **`middleware/`**: The "Security Guard". Checks tokens before letting requests pass.

## 🔄 Request Flow
1. **User** sends `POST /api/auth/login`.
2. **Route** (`authRoutes.js`) sends it to **Controller** (`authController.js`).
3. **Controller** extracts email/password and calls **Service** (`authService.js`).
4. **Service** checks DB, compares password, creates Token, and returns it.
5. **Controller** sends JSON response back to User.

## 🔐 JWT Flow
1. User logs in -> gets **Token**.
2. User requests Profile -> sends **Token** in Header (`Authorization: Bearer <token>`).
3. **Middleware** (`authMiddleware.js`) intercepts, checks token.
   - If valid: adds `req.user` and calls `next()`.
   - If invalid: sends `401 Unauthorized`.
4. **Controller** gets the request and shows Profile.
