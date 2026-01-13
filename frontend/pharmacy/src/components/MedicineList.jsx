import { useEffect, useState } from 'react';

function MedicineList({ refreshKey }) {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5005/api/medicines/list')
            .then(res => res.json())
            .then(data => setMedicines(data))
            .catch(err => console.error(err));
    }, [refreshKey]);

    return (
        <div>
            <h3>Inventory</h3>
            <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Expiry</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(m => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.name}</td>
                            <td>{m.stock}</td>
                            <td>${m.price}</td>
                            <td>{m.expiry_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MedicineList;
