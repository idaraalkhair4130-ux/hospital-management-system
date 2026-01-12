import { useState } from 'react';

function DoctorForm({ onDoctorAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        contact: '',
        fee: '',
        schedule: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5003/api/doctors/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                onDoctorAdded();
                setFormData({ name: '', specialization: '', contact: '', fee: '', schedule: '' });
                alert('Doctor Created Successfully!');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
            <h3>Register Doctor</h3>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={{ display: 'block', margin: '5px 0' }} />
            <input name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }} />
            <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }} />
            <input name="fee" type="number" placeholder="Fee ($)" value={formData.fee} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }} />
            <textarea name="schedule" placeholder="Schedule (e.g., Mon-Fri 9-5)" value={formData.schedule} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }} />
            <button type="submit">Register</button>
        </form>
    );
}

export default DoctorForm;
