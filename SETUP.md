# Hospital Management System (HMS) - Setup Guide

## 🏥 Architecture
This project is built using a **Microservices-inspired Modular Architecture**.
- **Total Modules**: 7 (Auth, Patient, Doctor, Reception, Pharmacy, Ward, Billing)
- **Tech Stack**: Node.js, Express, PostgreSQL, React (Vite).
- **Communication**: HTTP REST API.

## 🚀 One-Click Backend Start
For Linux/Mac:
```bash
chmod +x scripts/start-backends.sh
./scripts/start-backends.sh
```

## 🌐 Frontend Ports
| Module | Port |
| :--- | :--- |
| **Landing** | `5170` |
| Auth | `5173` |
| Patient | `5174` |
| Doctor | `5175` |
| Reception | `5176` |
| Pharmacy | `5177` |
| Ward | `5178` |
| Billing | `5179` |

## 🛠️ Manual Setup

### 1. Database (Docker)
Ensure Docker is running.
```bash
docker-compose up -d
```
*Port:* `5433` (Mapped to host)

### 2. Backend Modules
Each module in `backend/` is independent.
```bash
cd backend/module-patient
npm install
npm start
```

### 3. Frontend Modules
Each module in `frontend/` is independent.
```bash
cd frontend/patient
npm install
npm start
```
