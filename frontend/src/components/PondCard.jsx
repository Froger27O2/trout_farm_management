import React from 'react';

const PondCard = ({ pond }) => {
  // Simple calculation for biomass: Count * Avg Weight / 1000 (to get kg)
  const totalBiomassKg = ((pond.current_count * pond.avg_weight_g) / 1000).toFixed(1);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{pond.name}</h3>
        <span style={{ 
          ...styles.badge, 
          backgroundColor: pond.current_count > 0 ? '#065f46' : '#334155',
          color: pond.current_count > 0 ? '#34d399' : '#94a3b8'
        }}>
          {pond.current_count > 0 ? 'Active' : 'Empty'}
        </span>
      </div>

      <div style={styles.body}>
        <div style={styles.statRow}>
          <span style={styles.label}>Fish Count:</span>
          <span style={styles.value}>{pond.current_count.toLocaleString()}</span>
        </div>
        
        <div style={styles.statRow}>
          <span style={styles.label}>Avg. Weight:</span>
          <span style={styles.value}>{pond.avg_weight_g} g</span>
        </div>

        <div style={styles.biomassContainer}>
          <span style={styles.label}>Total Biomass</span>
          <div style={styles.biomassValue}>{totalBiomassKg} kg</div>
        </div>
      </div>

      <div style={styles.footer}>
        <span style={styles.volume}>Volume: {pond.volume_m3} m³</span>
        <button style={styles.detailsBtn}>View Details →</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    transition: 'transform 0.2s ease',
    cursor: 'default'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #334155',
    paddingBottom: '10px'
  },
  title: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#f8fafc'
  },
  badge: {
    fontSize: '0.75rem',
    padding: '4px 10px',
    borderRadius: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem'
  },
  label: {
    color: '#94a3b8'
  },
  value: {
    color: '#f1f5f9',
    fontWeight: '500'
  },
  biomassContainer: {
    marginTop: '10px',
    padding: '12px',
    backgroundColor: '#0f172a',
    borderRadius: '8px',
    textAlign: 'center'
  },
  biomassValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#3b82f6',
    marginTop: '4px'
  },
  footer: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px'
  },
  volume: {
    fontSize: '0.8rem',
    color: '#64748b'
  },
  detailsBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    padding: 0
  }
};

export default PondCard;