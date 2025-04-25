import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', color = '#4a2d71' }) => {
  const getSize = () => {
    switch (size) {
      case 'small': return { width: '20px', height: '20px' };
      case 'large': return { width: '60px', height: '60px' };
      default: return { width: '40px', height: '40px' };
    }
  };

  const spinnerStyle = {
    ...getSize(),
    border: `4px solid rgba(0, 0, 0, 0.1)`,
    borderRadius: '50%',
    borderTop: `4px solid ${color}`,
    animation: 'spin 1s linear infinite',
    margin: '2rem auto',
  };

  return (
    <div className="loader-container" style={{ textAlign: 'center', padding: '2rem 0' }}>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={spinnerStyle}></div>
      <p style={{ marginTop: '1rem', color: '#666', fontWeight: 500 }}>جارٍ التحميل...</p>
    </div>
  );
};

export default Loader;
