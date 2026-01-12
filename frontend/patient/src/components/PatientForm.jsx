import { useState } from 'react';

function PatientForm({ onPatientAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'Male',
        contact: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5002/api/patients/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                onPatientAdded();
                setFormData({ name: '', age: '', gender: 'Male', contact: '', address: '' }); // Reset
                alert('Patient Created Successfully!');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
            <h3>Register Patient</h3>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={{ display: 'block', margin: '5px 0' }} />
            <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required style={{ display: 'block', margin: '5px 0' }} />
            <select name="gender" value={formData.gender} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>
            <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }} />
            <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }} />
            <button type="submit">Register</button>
        </form>
    );
}

export default PatientForm;
