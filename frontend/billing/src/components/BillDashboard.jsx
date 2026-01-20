import { useEffect, useState } from 'react';

function BillDashboard({ refreshKey }) {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5007/api/bills/list')
            .then(res => res.json())
            .then(data => setBills(data))
            .catch(err => console.error(err));
    }, [refreshKey]);

    const handlePay = async (id) => {
        try {
            const response = await fetch(`http://localhost:5007/api/bills/${id}/pay`, {
                method: 'PUT'
            });
            if (response.ok) {
                alert('Marked as Paid');
                // Simple refresh by reload
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="card">
            <h2>📊 Billing Records</h2>

            {bills.length === 0 ? (
                <div className="text-center" style={{ padding: '3rem', color: '#64748b' }}>
                    <p>No bills found.</p>
                    <p>Create a new bill using the form above.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Bill ID</th>
                                <th>Patient Name</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map(b => (
                                <tr key={b.id}>
                                    <td><strong>#{b.id}</strong></td>
                                    <td>{b.patient_name}</td>
                                    <td>{b.description || 'N/A'}</td>
                                    <td className="amount">${parseFloat(b.amount).toFixed(2)}</td>
                                    <td>
                                        <span className={`badge ${b.status === 'Paid' ? 'badge-paid' : 'badge-pending'}`}>
                                            {b.status}
                                        </span>
                                    </td>
                                    <td>
                                        {b.status === 'Pending' && (
                                            <button
                                                onClick={() => handlePay(b.id)}
                                                className="secondary-btn"
                                            >
                                                ✓ Mark as Paid
                                            </button>
                                        )}
                                        {b.status === 'Paid' && (
                                            <span style={{ color: '#10b981', fontSize: '0.9rem' }}>✓ Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default BillDashboard;
