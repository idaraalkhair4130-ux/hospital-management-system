import { useEffect, useState } from 'react';

function Dashboard({ refreshKey }) {
    const [tokens, setTokens] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5004/api/tokens/list')
            .then(res => res.json())
            .then(data => setTokens(data))
            .catch(err => console.error(err));

        // Fetch doctors for assignment dropdown
        fetch('http://localhost:5003/api/doctors/list')
            .then(res => res.json())
            .then(data => setDoctors(data))
            .catch(err => console.log('Doctor module offline', err));
    }, [refreshKey]);

    const handleAssign = async (tokenId, doctorId) => {
        try {
            const response = await fetch('http://localhost:5004/api/tokens/assign-doctor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tokenId, doctorId })
            });
            if (response.ok) {
                alert('Doctor Assigned');
                // Simple refresh by re-fetching or reloading. ideally lift state or use context.
                // For student simplicity:
                window.location.reload();
            }
        } catch (err) {
            alert('Failed to assign');
        }
    }

    return (
        <div>
            <h3>Live Tokens</h3>
            <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Token ID</th>
                        <th>Patient</th>
                        <th>Status</th>
                        <th>Assigned Doctor</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.map(t => (
                        <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.patient_name}</td>
                            <td>{t.status}</td>
                            <td>{t.doctor_id ? `Dr. ID ${t.doctor_id}` : 'Unassigned'}</td>
                            <td>
                                {!t.doctor_id && (
                                    <select onChange={(e) => handleAssign(t.id, e.target.value)}>
                                        <option value="">Assign Dr...</option>
                                        {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                    </select>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
