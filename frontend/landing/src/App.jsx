import React from 'react';
import './App.css';

function App() {
    const modules = [
        { name: '🔐 Authentication', url: 'http://localhost:5173', desc: 'Login & Profile Management', color: '#6c757d' },
        { name: '👤 Patient Portal', url: 'http://localhost:5174', desc: 'Patient Registration & History', color: '#007bff' },
        { name: '👨‍⚕️ Doctor Portal', url: 'http://localhost:5175', desc: 'Appointments & Schedule', color: '#28a745' },
        { name: '🧑‍💼 Reception Desk', url: 'http://localhost:5176', desc: 'Token Generation & Assign', color: '#17a2b8' },
        { name: '💊 Pharmacy Store', url: 'http://localhost:5177', desc: 'Medicine Inventory & Issues', color: '#ffc107' },
        { name: '🛏️ Ward Manager', url: 'http://localhost:5178', desc: 'Bed Availability & Admissions', color: '#dc3545' },
        { name: '💰 Billing System', url: 'http://localhost:5179', desc: 'Invoices & Payments', color: '#343a40' },
    ];

    return (
        <div className="container">
            <header className="header">
                <h1>🏥 Hospital Management System</h1>
                <p>Central Access Hub</p>
            </header>

            <div className="grid">
                {modules.map((mod, index) => (
                    <div key={index} className="card" onClick={() => window.location.href = mod.url} style={{ borderColor: mod.color }}>
                        <h2 style={{ color: mod.color }}>{mod.name}</h2>
                        <p>{mod.desc}</p>
                        <div className="arrow">➜</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
