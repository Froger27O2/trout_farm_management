// frontend/src/pages/ClientStore.jsx
import { useNavigate } from 'react-router-dom';

export default function ClientStore() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', color: '#fff' }}>
      <h1>🛒 Spas Farm Store</h1>
      <p>Available trout and order history will go here.</p>
      <button 
        onClick={handleLogout}
        style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}