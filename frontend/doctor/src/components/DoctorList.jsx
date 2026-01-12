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
        <div>
            <h3>Doctor List</h3>
            <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.specialization}</td>
                            <td>{d.contact}</td>
                            <td>${d.fee}</td>
                            <td>{d.schedule}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DoctorList;
