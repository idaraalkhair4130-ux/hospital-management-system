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
        <div>
            <h3>Billing Dashboard</h3>
            <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map(b => (
                        <tr key={b.id}>
                            <td>{b.id}</td>
                            <td>{b.patient_name}</td>
                            <td>{b.description}</td>
                            <td>${b.amount}</td>
                            <td style={{ color: b.status === 'Paid' ? 'green' : 'red', fontWeight: 'bold' }}>
                                {b.status}
                            </td>
                            <td>
                                {b.status === 'Pending' && (
                                    <button onClick={() => handlePay(b.id)}>Mark Paid</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BillDashboard;
