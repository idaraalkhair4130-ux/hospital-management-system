import { useState } from 'react';

function BedForm({ onBedAdded }) {
    const [formData, setFormData] = useState({
        bed_number: '',
        type: 'General',
        price: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5006/api/beds/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                onBedAdded();
                setFormData({ bed_number: '', type: 'General', price: '' });
                alert('Bed Added Successfully!');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
            <h3>Add New Bed</h3>
            <input name="bed_number" placeholder="Bed Number (e.g., A-101)" value={formData.bed_number} onChange={handleChange} required style={{ display: 'block', margin: '5px 0' }} />
            <select name="type" value={formData.type} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }}>
                <option>General</option>
                <option>ICU</option>
                <option>Private</option>
                <option>Emergency</option>
            </select>
            <input name="price" type="number" placeholder="Price per Day ($)" value={formData.price} onChange={handleChange} required style={{ display: 'block', margin: '5px 0' }} />
            <button type="submit">Add Bed</button>
        </form>
    );
}

export default BedForm;
