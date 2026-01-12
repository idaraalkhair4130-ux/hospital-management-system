import { useState, useEffect } from 'react';

function Profile({ onLogout }) {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('No token found');
                return;
            }

            try {
                const response = await fetch('http://localhost:5001/api/auth/profile', {
                    method: 'GET',
                    headers: {
                        // TEACHING POINT: Send token in Authorization header
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch profile');
                }

                setProfile(data);
            } catch (err) {
                setError(err.message);
                // Optional: onLogout() if token is invalid
            }
        };

        fetchProfile();
    }, []);

    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
    if (!profile) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Protected Profile</h2>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>

            <button
                onClick={onLogout}
                style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none' }}
            >
                Logout
            </button>
        </div>
    );
}

export default Profile;
