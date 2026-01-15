import { useState } from 'react';
import DoctorForm from './components/DoctorForm';
import DoctorList from './components/DoctorList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDoctorAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>👨‍⚕️ Doctor Management</h1>
        <p>Manage doctor profiles and schedules</p>
      </header>

      <section className="card">
        <DoctorForm onDoctorAdded={handleDoctorAdded} />
      </section>

      <DoctorList refreshKey={refreshKey} />
    </div>
  );
}

export default App;
