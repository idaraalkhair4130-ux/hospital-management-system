import { useState } from 'react';
import BillForm from './components/BillForm';
import BillDashboard from './components/BillDashboard';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBillCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>💰 Billing & Payments</h1>
        <p>Manage patient bills and payment records</p>
      </header>

      <section className="card">
        <BillForm onBillCreated={handleBillCreated} />
      </section>

      <BillDashboard refreshKey={refreshKey} />
    </div>
  );
}

export default App;
