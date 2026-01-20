import { useState } from 'react';

function MedicineForm({ onMedicineAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        stock: '',
        price: '',
        expiry_date: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5005/api/medicines/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                onMedicineAdded();
                setFormData({ name: '', stock: '', price: '', expiry_date: '' });
                alert('Medicine Added Successfully!');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    return (
        <div className="card">
            <h2>Add New Medicine</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Medicine Name</label>
                    <input
                        name="name"
                        placeholder="e.g. Paracetamol"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid-2" style={{ marginBottom: 0, gap: '1rem' }}>
                    <div className="form-group">
                        <label>Stock Quantity</label>
                        <input
                            name="stock"
                            type="number"
                            placeholder="0"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price ($)</label>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                        name="expiry_date"
                        type="date"
                        value={formData.expiry_date}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Add Medicine</button>
            </form>
        </div>
    );
}

export default MedicineForm;
