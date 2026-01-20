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
        <div className="card">
            <h2>Issue Medicine</h2>
            <form onSubmit={handleIssue}>
                <div className="form-group">
                    <label>Select Medicine</label>
                    <select
                        value={selectedMed}
                        onChange={e => setSelectedMed(e.target.value)}
                        required
                    >
                        <option value="">-- Choose Medicine --</option>
                        {medicines.map(m => (
                            <option key={m.id} value={m.id} disabled={m.stock <= 0}>
                                {m.name} (Stock: {m.stock})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Quantity to Issue</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={!selectedMed}>Issue Medicine</button>
            </form>
        </div>
    )
}

export default IssueMedicine;
