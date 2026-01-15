import { useState } from 'react';
import MedicineForm from './components/MedicineForm';
import MedicineList from './components/MedicineList';
import IssueMedicine from './components/IssueMedicine';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>💊 Pharmacy Management</h1>
        <div style={{ opacity: 0.9 }}>Hospital Management System</div>
      </header>

      <div className="grid-2">
        <section>
          <MedicineForm onMedicineAdded={handleRefresh} />
        </section>
        <section>
          <IssueMedicine refreshKey={refreshKey} onMedicineIssued={handleRefresh} />
        </section>
      </div>

      <section className="card">
        <MedicineList refreshKey={refreshKey} />
      </section>
    </div>
  );
}

export default App;
