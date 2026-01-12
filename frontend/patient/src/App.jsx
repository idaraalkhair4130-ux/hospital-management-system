import { useState } from 'react';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePatientAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>👤 Patient Module</h1>
      <PatientForm onPatientAdded={handlePatientAdded} />
      <hr />
      <PatientList refreshKey={refreshKey} />
    </div>
  );
}

export default App;
