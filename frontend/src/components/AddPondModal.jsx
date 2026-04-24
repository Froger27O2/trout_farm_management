import React, { useState } from 'react';
import axios from 'axios';

const AddPondModal = ({ isOpen, onClose, onPondAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    length: '',
    width: '',
    depth: '',
    current_count: 0,
    initial_weight: 0
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Convert strings from inputs to numbers for the backend
      const payload = {
        ...formData,
        length: parseFloat(formData.length),
        width: parseFloat(formData.width),
        depth: parseFloat(formData.depth),
        current_count: parseInt(formData.current_count),
        initial_weight: parseFloat(formData.initial_weight)
      };

      const res = await axios.post('http://localhost:5000/api/ponds', payload);
      
      // Update the parent state and close
      onPondAdded(res.data); 
      onClose();
      
      // Reset form for next time
      setFormData({ name: '', length: '', width: '', depth: '', current_count: 0, initial_weight: 0 });
    } catch (err) {
      setError(err.response?.data?.error || "Check your connection and try again.");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.content}>
        <h2 style={{ marginTop: 0 }}>🏗️ Add New Pond</h2>
        {error && <p style={styles.error}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Pond Name</label>
          <input 
            type="text" 
            placeholder="e.g. Nursery Tank 1"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={styles.input}
          />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Length (m)</label>
              <input type="number" step="0.1" value={formData.length} onChange={(e) => setFormData({...formData, length: e.target.value})} style={styles.input} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Width (m)</label>
              <input type="number" step="0.1" value={formData.width} onChange={(e) => setFormData({...formData, width: e.target.value})} style={styles.input} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Depth (m)</label>
              <input type="number" step="0.1" value={formData.depth} onChange={(e) => setFormData({...formData, depth: e.target.value})} style={styles.input} />
            </div>
          </div>

          <label style={styles.label}>Initial Fish Count</label>
          <input type="number" value={formData.current_count} onChange={(e) => setFormData({...formData, current_count: e.target.value})} style={styles.input} />

          <label style={styles.label}>Avg. Fish Weight (g)</label>
          <input type="number" step="0.1" value={formData.initial_weight} onChange={(e) => setFormData({...formData, initial_weight: e.target.value})} style={styles.input} />

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" style={styles.saveBtn}>Create Pond</button>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  content: { backgroundColor: '#1e293b', padding: '30px', borderRadius: '12px', width: '400px', color: 'white', border: '1px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  label: { fontSize: '0.85rem', color: '#94a3b8', marginBottom: '-8px' },
  input: { padding: '12px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', fontSize: '1rem' },
  error: { color: '#fb7185', fontSize: '0.9rem', backgroundColor: 'rgba(251, 113, 133, 0.1)', padding: '10px', borderRadius: '6px' },
  saveBtn: { flex: 1, padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  cancelBtn: { flex: 1, padding: '12px', backgroundColor: '#475569', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }
};

export default AddPondModal;