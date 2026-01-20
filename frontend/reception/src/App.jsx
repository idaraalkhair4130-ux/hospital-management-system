import { useState } from 'react';
import TokenGenerator from './components/TokenGenerator';
import Dashboard from './components/Dashboard';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTokenGenerated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🧑‍💼 Reception Module</h1>
      <TokenGenerator onTokenGenerated={handleTokenGenerated} />
      <hr />
      <Dashboard refreshKey={refreshKey} />
    </div>
  );
}

export default App;
