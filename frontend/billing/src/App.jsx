import { useState } from 'react';
import BillForm from './components/BillForm';
import BillDashboard from './components/BillDashboard';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBillCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>💰 Billing Module</h1>
      <BillForm onBillCreated={handleBillCreated} />
      <hr />
      <BillDashboard refreshKey={refreshKey} />
    </div>
  );
}

export default App;
