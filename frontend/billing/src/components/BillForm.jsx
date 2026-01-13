import { useState } from 'react';

function BillForm({ onBillCreated }) {
    const [formData, setFormData] = useState({
        patient_name: '',
        description: '',
        amount: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5007/api/bills/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                onBillCreated();
                setFormData({ patient_name: '', description: '', amount: '' });
                alert('Bill Created Successfully!');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
            <h3>Generate Bill</h3>
            <input name="patient_name" placeholder="Patient Name" value={formData.patient_name} onChange={handleChange} required style={{ display: 'block', margin: '5px 0' }} />
            <textarea name="description" placeholder="Description (e.g., Surgery, Consultation)" value={formData.description} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }} />
            <input name="amount" type="number" placeholder="Amount ($)" value={formData.amount} onChange={handleChange} required style={{ display: 'block', margin: '5px 0' }} />
            <button type="submit">Create Bill</button>
        </form>
    );
}

export default BillForm;
