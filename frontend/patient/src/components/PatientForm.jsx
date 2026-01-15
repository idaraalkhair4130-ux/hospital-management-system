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
        <div>
            <h2>➕ Register New Patient</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Patient Name</label>
                        <input
                            name="name"
                            placeholder="Full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input
                            name="age"
                            type="number"
                            placeholder="0"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Contact Number</label>
                        <input
                            name="contact"
                            placeholder="Phone number"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <textarea
                        name="address"
                        placeholder="Full address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="2"
                    />
                </div>

                <button type="submit" className="primary-btn">Register Patient</button>
            </form>
        </div>
    );
}

export default PatientForm;
