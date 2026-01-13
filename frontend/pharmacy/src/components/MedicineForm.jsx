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
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
            <h3>Add Medicine</h3>
            <input name="name" placeholder="Medicine Name" value={formData.name} onChange={handleChange} required style={{ display: 'block', margin: '5px 0' }} />
            <input name="stock" type="number" placeholder="Stock Quantity" value={formData.stock} onChange={handleChange} required style={{ display: 'block', margin: '5px 0' }} />
            <input name="price" type="number" placeholder="Price ($)" value={formData.price} onChange={handleChange} required style={{ display: 'block', margin: '5px 0' }} />
            <input name="expiry_date" type="date" placeholder="Expiry Date" value={formData.expiry_date} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }} />
            <button type="submit">Add Medicine</button>
        </form>
    );
}

export default MedicineForm;
