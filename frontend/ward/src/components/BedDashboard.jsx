import { useEffect, useState } from 'react';

function BedDashboard({ refreshKey }) {
    const [beds, setBeds] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5006/api/beds/list')
            .then(res => res.json())
            .then(data => setBeds(data))
            .catch(err => console.error(err));
    }, [refreshKey]);

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Available' ? 'Occupied' : 'Available';
        // Simple toggle logic for demo
        try {
            // Note: In real app, "Occupied" would link to a patient admission. 
            // Here we just toggle state to demonstrate API interaction.
            await fetch(`http://localhost:5006/api/beds/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            // Optimistic update or reload. Reload for simplicity.
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h3>Ward View</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {beds.map(bed => (
                    <div
                        key={bed.id}
                        onClick={() => toggleStatus(bed.id, bed.status)}
                        style={{
                            border: '1px solid #333',
                            padding: '20px',
                            width: '100px',
                            textAlign: 'center',
                            backgroundColor: bed.status === 'Available' ? '#90ee90' : '#ffcccb',
                            cursor: 'pointer'
                        }}
                    >
                        <strong>{bed.bed_number}</strong><br />
                        {bed.type}<br />
                        <small>{bed.status}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BedDashboard;
