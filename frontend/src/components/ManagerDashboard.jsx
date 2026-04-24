import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPondModal from '../components/AddPondModal';
import PondGrid from '../components/PondGrid';

const ManagerDashboard = () => {
  const [ponds, setPonds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Ponds on Component Mount
  useEffect(() => {
    const fetchPonds = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ponds');
        setPonds(res.data);
      } catch (err) {
        console.error("Failed to load ponds from the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchPonds();
  }, []);

  // 2. Callback for when the Modal successfully adds a pond
  const handlePondAdded = (newPond) => {
    // Append the new pond to the current state list
    setPonds((prevPonds) => [...prevPonds, newPond]);
  };

  return (
    <div style={styles.container}>
      {/* HEADER SECTION */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>👑 Manager Control Center</h1>
          <p style={styles.subtitle}>Spas Farm Operational Overview</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={styles.addBtn}
        >
          + Add Pond
        </button>
      </header>

      <hr style={styles.divider} />

      {/* MAIN CONTENT AREA */}
      {loading ? (
        <div style={styles.loading}>Loading Farm Data...</div>
      ) : (
        <PondGrid ponds={ponds} />
      )}

      {/* MODAL LAYER */}
      <AddPondModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onPondAdded={handlePondAdded} 
      />
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#0f172a', // Deep dark blue background
    minHeight: '100vh',
    color: 'white',
    fontFamily: 'Inter, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    letterSpacing: '-0.025em'
  },
  subtitle: {
    color: '#94a3b8',
    marginTop: '5px',
    fontSize: '1rem'
  },
  addBtn: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.2s',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  divider: {
    borderColor: '#1e293b',
    margin: '30px 0',
    borderStyle: 'solid',
    borderWidth: '0.5px'
  },
  loading: {
    textAlign: 'center',
    padding: '100px',
    color: '#64748b',
    fontSize: '1.2rem'
  }
};

export default ManagerDashboard;