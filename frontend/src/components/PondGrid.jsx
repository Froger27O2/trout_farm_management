import React from 'react';
import PondCard from './PondCard';

const PondGrid = ({ ponds }) => {
  // Handle the empty state gracefully
  if (ponds.length === 0) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>🐟</div>
        <h3>No Ponds Found</h3>
        <p style={{ color: '#94a3b8' }}>
          Your farm is currently empty. Click the "+ Add Pond" button to get started!
        </p>
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {ponds.map((pond) => (
        <PondCard key={pond.id} pond={pond} />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    // This creates a responsive grid that fits as many 300px cards as possible
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '20px'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    backgroundColor: '#1e293b',
    borderRadius: '16px',
    border: '2px dashed #334155',
    textAlign: 'center',
    marginTop: '20px'
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '10px',
    opacity: 0.5
  }
};

export default PondGrid;