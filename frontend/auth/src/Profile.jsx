import { useState, useEffect } from 'react';

function Profile({ onLogout }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:5001/api/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                } else {
                    // If token is invalid (401), Logout automatically
                    if (response.status === 401) {
                        console.warn("Invalid Token, Logging out...");
                        onLogout();
                    } else {
                        setError(data.message || 'Failed to fetch profile');
                    }
                }
            } catch (err) {
                setError('Connection Error: ' + err.message);
            }
        };

        fetchProfile();
    }, [onLogout]);

    if (error) return <div style={{ color: 'red' }}>Error: {error} <br /><button onClick={onLogout}>Back to Login</button></div>;
    if (!user) return <div>Loading Profile...</div>;

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center', padding: '20px', border: '1px solid #ccc' }}>
            <h2>👤 User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><small>Member since: {new Date(user.created_at || Date.now()).toLocaleDateString()}</small></p>

            <button
                onClick={onLogout}
                style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}
            >
                Logout
            </button>
        </div>
    );
}

export default Profile;
