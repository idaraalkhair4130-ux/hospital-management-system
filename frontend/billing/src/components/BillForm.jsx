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
        <div>
            <h2>📝 Generate New Bill</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Patient Name</label>
                        <input
                            name="patient_name"
                            placeholder="Enter patient name"
                            value={formData.patient_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Bill Amount ($)</label>
                        <input
                            name="amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Description / Services</label>
                    <textarea
                        name="description"
                        placeholder="e.g., Surgery, Consultation, Lab Tests, Medications..."
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                    />
                </div>

                <button type="submit" className="primary-btn">Create Bill</button>
            </form>
        </div>
    );
}

export default BillForm;
