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
        <div>
            <h2>➕ Add New Bed</h2>
            <form onSubmit={handleSubmit} className="form-grid">
                <div className="form-group">
                    <label>Bed Number (e.g., A-101)</label>
                    <input
                        name="bed_number"
                        placeholder="Room-Bed"
                        value={formData.bed_number}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Ward Type</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option>General Ward</option>
                        <option>ICU</option>
                        <option>Private Room</option>
                        <option>Emergency</option>
                        <option>Pediatric</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Price per Day ($)</label>
                    <input
                        name="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="primary-btn">Add Bed to System</button>
                </div>
            </form>
        </div>
    );
}

export default BedForm;
