import { useState, useEffect } from 'react';

function IssueMedicine({ refreshKey, onMedicineIssued }) {
    const [medicines, setMedicines] = useState([]);
    const [selectedMed, setSelectedMed] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch('http://localhost:5005/api/medicines/list')
            .then(res => res.json())
            .then(data => setMedicines(data))
            .catch(err => console.error(err));
    }, [refreshKey]);

    const handleIssue = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5005/api/medicines/issue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: selectedMed, quantity: parseInt(quantity) })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Medicine Issued Successfully');
                onMedicineIssued();
            } else {
                alert('Failed: ' + data.error);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    }

    return (
        <form onSubmit={handleIssue} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
            <h3>Issue Medicine</h3>
            <select value={selectedMed} onChange={e => setSelectedMed(e.target.value)} required style={{ display: 'block', marginBottom: '5px' }}>
                <option value="">Select Medicine...</option>
                {medicines.map(m => (
                    <option key={m.id} value={m.id}>{m.name} (Stock: {m.stock})</option>
                ))}
            </select>
            <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} style={{ display: 'block', marginBottom: '5px' }} />
            <button type="submit">Issue</button>
        </form>
    )
}

export default IssueMedicine;
