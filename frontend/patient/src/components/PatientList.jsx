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
        <div>
            <h3>Patient List</h3>
            <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
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
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.age}</td>
                            <td>{p.gender}</td>
                            <td>{p.contact}</td>
                            <td>{p.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientList;
