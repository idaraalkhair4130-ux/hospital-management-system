import { useEffect, useState } from 'react';

function DoctorList({ refreshKey }) {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5003/api/doctors/list')
            .then(res => res.json())
            .then(data => setDoctors(data))
            .catch(err => console.error(err));
    }, [refreshKey]);

    return (
        <div className="card">
            <h2>👨‍⚕️ Doctor Directory</h2>
            {doctors.length === 0 ? (
                <div className="text-center" style={{ padding: '3rem', color: '#64748b' }}>
                    <p>No doctors registered.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Specialization</th>
                                <th>Contact</th>
                                <th>Fee</th>
                                <th>Schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map(d => (
                                <tr key={d.id}>
                                    <td><strong>#{d.id}</strong></td>
                                    <td>{d.name}</td>
                                    <td>{d.specialization || 'N/A'}</td>
                                    <td>{d.contact || 'N/A'}</td>
                                    <td>${d.fee}</td>
                                    <td>{d.schedule || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default DoctorList;
