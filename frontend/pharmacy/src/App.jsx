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
    <div style={{ padding: '20px' }}>
      <h1>💊 Pharmacy Module</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <MedicineForm onMedicineAdded={handleRefresh} />
        </div>
        <div style={{ flex: 1 }}>
          <IssueMedicine refreshKey={refreshKey} onMedicineIssued={handleRefresh} />
        </div>
      </div>
      <hr />
      <MedicineList refreshKey={refreshKey} />
    </div>
  );
}

export default App;
