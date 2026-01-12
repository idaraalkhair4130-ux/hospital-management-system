# Hospital Management System (HMS)

## 📌 Integration Concept (Golden Rule)
"Har module apna kaam karega, aur doosre module se baat API ke zariye karega."

**Example:**
Billing ko doctor fee chahiye:
👉 Billing → Doctor API call karega
👉 Direct doctor table touch nahi karega

## 🏫 Student Rules
1. **Sirf apne module ke folder mein kaam karein ge**
2. **Direct database ya doosre module ka code touch nahi karein ge**
3. **Modules API calls ke zariye baat karein ge**

## 📂 Project Structure
```
hospital-management-system/
│
├── README.md
├── docker-compose.yml
│
├── backend/
│   ├── common/
│   │   ├── db/
│   │   ├── auth/
│   │   └── middleware/
│   │
│   ├── module-auth/
│   ├── module-patient/
│   ├── module-doctor/
│   ├── module-reception/
│   ├── module-pharmacy/
│   ├── module-ward/
│   ├── module-billing/
│
├── frontend/
│   ├── common/
│   │   ├── api/
│   │   └── components/
│   │
│   ├── auth/
│   ├── patient/
│   ├── doctor/
│   ├── reception/
│   ├── pharmacy/
│   ├── ward/
│   ├── billing/
│
├── docs/
│   ├── 01-auth.md
│   ├── 02-patient.md
│   ├── 03-doctor.md
│   ├── 04-reception.md
│   ├── 05-pharmacy.md
│   ├── 06-ward.md
│   ├── 07-billing.md
│
└── scripts/
```

## 🛠 Tech Stack
- **Backend:** Node.js (Express)
- **Frontend:** React.js
- **Database:** PostgreSQL
- **Container:** Docker
