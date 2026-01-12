# HMS Project Setup Instructions

## 1️⃣ Clone Repo
The repository is cloned in `hospital-management-system`.

## 2️⃣ Database Setup (PostgreSQL)
We use Docker for the database.
```bash
docker-compose up -d
```
- **Port:** Local port `5433` is mapped to container port `5432` (to avoid conflicts).
- **Credentials:** `hms_user` / `hms_password`
- **Database:** `hms_db`

## 3️⃣ Antigravity IDE
- Open `hospital-management-system` folder.
- Work **ONLY** in your assigned module folder.

## 4️⃣ Run Auth Module (Backend)
The Auth module now creates its own database table (`users`) automatically.

### Option A: Run Locally (Recommended for development)
1. Go to module folder:
   ```bash
   cd backend/module-auth
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start server:
   ```bash
   npm start
   ```
   - Connects to DB at `localhost:5433`.
   - Creates `users` table on first run.

### Option B: Run via Docker (Future)
*Currently, we run backend locally and DB via Docker.*

## 5️⃣ API Testing
Use Postman or Curl.
- **Register:** `POST http://localhost:5001/api/auth/register`
  ```json
  { "email": "test@hms.com", "password": "123", "name": "Test User", "role": "doctor" }
  ```
- **Login:** `POST http://localhost:5001/api/auth/login`
  ```json
  { "email": "test@hms.com", "password": "123" }
  ```
- **Profile:** `GET http://localhost:5001/api/auth/profile`
  - Header: `Authorization: Bearer <your_token>`

## 6️⃣ Frontend (Auth Module)
1. Go to frontend folder:
   ```bash
   cd frontend/auth
   ```
2. Install & Start:
   ```bash
   npm install
   npm start
   ```
   - Runs on `http://localhost:5173`

## 7️⃣ Important Notes
- **Do NOT** commit `.env` files (add to .gitignore if not already).
- **Do NOT** touch `common` code or other modules.
