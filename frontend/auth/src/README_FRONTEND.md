# Frontend Auth Flow for Students 🎓

This demonstrates how to consume the JWT Auth API.

## 1. Storage (`localStorage`)
We use `localStorage` to save the JWT.
- **Why?** It persists even if you refresh the page.
- **Code:** `localStorage.setItem('token', token)`

## 2. Sending the Token
To access protected routes (like `/api/auth/profile`), you MUST send the token.
- **Header:** `Authorization`
- **Format:** `Bearer <your-token>`
- **Code:**
  ```javascript
  headers: {
    'Authorization': `Bearer ${token}`
  }
  ```

## 3. Protected Routes (Frontend)
In `App.jsx`, we check if a token exists.
- **If yes:** Show `<Profile />`
- **If no:** Show `<Login />`

## 4. Logout
Logout is simple: **Destroy the token.**
- **Code:** `localStorage.removeItem('token')`
- The app detects the token is gone and returns to the Login screen.
