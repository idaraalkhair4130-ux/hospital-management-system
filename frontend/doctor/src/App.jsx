import { useState } from 'react';
import DoctorForm from './components/DoctorForm';
import DoctorList from './components/DoctorList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDoctorAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>👨‍⚕️ Doctor Module</h1>
      <DoctorForm onDoctorAdded={handleDoctorAdded} />
      <hr />
      <DoctorList refreshKey={refreshKey} />
    </div>
  );
}

export default App;
