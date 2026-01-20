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
        const action = newStatus === 'Occupied' ? 'Admit Patient' : 'Discharge Patient';

        if (!window.confirm(`Are you sure you want to ${action}?`)) return;

        try {
            await fetch(`http://localhost:5006/api/beds/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            // Reload to fetch fresh data (including mock updates)
            window.location.reload();
        } catch (err) {
            alert("Failed to update status");
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem', border: 'none' }}>
                    🛏️ Bed Status Board
                </h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>● Available</span>
                    <span className="badge" style={{ background: '#fee2e2', color: '#991b1b' }}>● Occupied</span>
                </div>
            </div>

            <div className="bed-grid">
                {beds.map(bed => (
                    <div
                        key={bed.id}
                        onClick={() => toggleStatus(bed.id, bed.status)}
                        className={`bed-card ${bed.status === 'Available' ? 'available' : 'occupied'}`}
                    >
                        <div className="bed-icon">
                            {bed.status === 'Available' ? '🛏️' : '🤒'}
                        </div>

                        <div className="bed-number">{bed.bed_number}</div>
                        <div className="bed-type">{bed.type}</div>

                        <div className={`status-badge ${bed.status === 'Available' ? 'available' : 'occupied'}`}>
                            {bed.status === 'Available' ? 'Available' : 'Occupied'}
                        </div>
                    </div>
                ))}
            </div>

            {beds.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    <p>No beds found in the ward.</p>
                    <p>Use the form above to add new beds.</p>
                </div>
            )}
        </div>
    );
}

export default BedDashboard;
