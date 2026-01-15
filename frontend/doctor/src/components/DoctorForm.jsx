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
        <div>
            <h2>➕ Register New Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Doctor Name</label>
                        <input name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Specialization</label>
                        <input name="specialization" placeholder="e.g., Cardiology" value={formData.specialization} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Contact</label>
                        <input name="contact" placeholder="Phone" value={formData.contact} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Consultation Fee ($)</label>
                        <input name="fee" type="number" placeholder="0.00" value={formData.fee} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Schedule</label>
                    <input name="schedule" placeholder="e.g., Mon-Fri 9AM-5PM" value={formData.schedule} onChange={handleChange} />
                </div>
                <button type="submit" className="primary-btn">Register Doctor</button>
            </form>
        </div>
    );
}

export default DoctorForm;
