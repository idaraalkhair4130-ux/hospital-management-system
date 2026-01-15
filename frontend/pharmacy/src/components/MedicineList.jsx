import { useEffect, useState } from 'react';

function MedicineList({ refreshKey }) {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5005/api/medicines/list')
            .then(res => res.json())
            .then(data => setMedicines(data))
            .catch(err => console.error(err));
    }, [refreshKey]);

    const getStockStatus = (stock) => {
        if (stock <= 5) return <span className="badge badge-danger">Low Stock</span>;
        if (stock <= 20) return <span className="badge badge-warning">Running Low</span>;
        return <span className="badge badge-success">In Stock</span>;
    };

    return (
        <div>
            <h2>Inventory List</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Medicine Name</th>
                            <th>Stock Status</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                    No medicines found. Add some above!
                                </td>
                            </tr>
                        ) : (
                            medicines.map(m => (
                                <tr key={m.id}>
                                    <td>#{m.id}</td>
                                    <td><strong>{m.name}</strong></td>
                                    <td>{getStockStatus(m.stock)}</td>
                                    <td>{m.stock} units</td>
                                    <td>${m.price}</td>
                                    <td>{new Date(m.expiry_date).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MedicineList;
