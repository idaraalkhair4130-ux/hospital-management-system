import { useEffect, useState } from 'react';

function PatientList({ refreshKey }) {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5002/api/patients/list')
            .then(res => res.json())
            .then(data => setPatients(data))
            .catch(err => console.error(err));
    }, [refreshKey]);

    return (
        <div className="card">
            <h2>📋 Patient Records</h2>

            {patients.length === 0 ? (
                <div className="text-center" style={{ padding: '3rem', color: '#64748b' }}>
                    <p>No patients registered yet.</p>
                    <p>Use the form above to register a new patient.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Patient ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Contact</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map(p => (
                                <tr key={p.id}>
                                    <td><strong>#{p.id}</strong></td>
                                    <td>{p.name}</td>
                                    <td>{p.age} years</td>
                                    <td>{p.gender}</td>
                                    <td>{p.contact || 'N/A'}</td>
                                    <td>{p.address || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default PatientList;
