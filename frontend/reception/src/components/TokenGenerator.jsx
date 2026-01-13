import { useState, useEffect } from 'react';

function TokenGenerator({ onTokenGenerated }) {
    const [formData, setFormData] = useState({
        patient_name: '',
        doctor_id: '',
        consultation_fee: 50
    });
    const [doctors, setDoctors] = useState([]);

    // Fetch doctors for dropdown
    useEffect(() => {
        fetch('http://localhost:5003/api/doctors/list')
            .then(res => res.json())
            .then(data => setDoctors(data))
            .catch(err => console.log('Doctor module offline/empty', err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5004/api/tokens/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                onTokenGenerated();
                setFormData({ patient_name: '', doctor_id: '', consultation_fee: 50 });
                alert('Token Generated: ' + data.token.id);
            } else {
                alert('Error: ' + data.error);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
            <h3>Generate Token</h3>
            <input name="patient_name" placeholder="Patient Name" value={formData.patient_name} onChange={handleChange} required style={{ display: 'block', margin: '5px 0' }} />
            <select name="doctor_id" value={formData.doctor_id} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }}>
                <option value="">Select Doctor (Optional)</option>
                {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
            </select>
            <input name="consultation_fee" type="number" placeholder="Fee ($)" value={formData.consultation_fee} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }} />
            <button type="submit">Generate Token</button>
        </form>
    );
}

export default TokenGenerator;
