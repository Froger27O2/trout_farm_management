// frontend/src/pages/ManagerDashboard.jsx
import { useNavigate } from 'react-router-dom';

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', color: '#fff' }}>
      <h1>👑 Manager Control Center</h1>
      <p>Welcome to the Spas Farm management dashboard.</p>
      <button 
        onClick={handleLogout}
        style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}