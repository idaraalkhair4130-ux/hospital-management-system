import { useState } from 'react';
import BedForm from './components/BedForm';
import BedDashboard from './components/BedDashboard';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🏥 Ward Management Dashboard</h1>
        <p>Manage beds, admissions, and discharges efficiently</p>
      </header>

      <section className="card">
        <BedForm onBedAdded={handleRefresh} />
      </section>

      <BedDashboard refreshKey={refreshKey} />
    </div>
  );
}

export default App;
