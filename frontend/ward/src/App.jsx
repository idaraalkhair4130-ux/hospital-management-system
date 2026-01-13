import { useState } from 'react';
import BedForm from './components/BedForm';
import BedDashboard from './components/BedDashboard';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🛏️ Ward Module</h1>
      <p>Click on a bed to toggle Available/Occupied status.</p>
      <BedForm onBedAdded={handleRefresh} />
      <hr />
      <BedDashboard refreshKey={refreshKey} />
    </div>
  );
}

export default App;
