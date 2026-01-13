import { useState } from 'react';

function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'Patient' // Default selection
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getPortalUrl = (role) => {
        // Map roles to Frontend Ports (Fixed Ports)
        switch (role) {
            case 'Patient': return 'http://localhost:5174';
            case 'Doctor': return 'http://localhost:5175';
            case 'Receptionist': return 'http://localhost:5176';
            case 'Pharmacist': return 'http://localhost:5177';
            case 'Nurse': return 'http://localhost:5178'; // Ward
            case 'Admin': return 'http://localhost:5179'; // Billing
            default: return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Note: Backend must be running on 5001
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Notify Parent
                if (onLogin) onLogin(data.token);

                // Smart Redirect
                const targetUrl = getPortalUrl(formData.role);
                if (targetUrl) {
                    // Redirect with token query param to auto-login destination
                    window.location.href = `${targetUrl}?token=${data.token}`;
                } else {
                    alert("Login Successful, but no portal found for role: " + formData.role);
                }

            } else {
                alert('Login Failed: ' + (data.error || 'Unknown error'));
            }
        } catch (err) {
            alert('Connection Error. Is the Backend/Docker running? ' + err.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>🏥 HMS Unified Login</h2>
            <form onSubmit={handleSubmit}>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Select Your Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        <option value="Patient">Patient (Portal)</option>
                        <option value="Doctor">Doctor (Portal)</option>
                        <option value="Receptionist">Receptionist (Desk)</option>
                        <option value="Pharmacist">Pharmacist (Store)</option>
                        <option value="Nurse">Nurse (Ward)</option>
                        <option value="Admin">Admin (Billing/Finance)</option>
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>

                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
                    Login & Access Portal
                </button>
            </form>
        </div>
    );
}

export default Login;
