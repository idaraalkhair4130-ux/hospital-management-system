import { useState } from 'react';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePatientAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>👤 Patient Management</h1>
        <p>Register and manage patient records</p>
      </header>

      <section className="card">
        <PatientForm onPatientAdded={handlePatientAdded} />
      </section>

      <PatientList refreshKey={refreshKey} />
    </div>
  );
}

export default App;
