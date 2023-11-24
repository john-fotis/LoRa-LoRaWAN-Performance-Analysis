import React from 'react';

const NotFound = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  };

  const contentStyle = {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    fontSize: '3rem',
    marginBottom: '10px',
    color: '#ff5555',
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={headingStyle}>404 Not Found</h1>
        <p style={paragraphStyle}>Oops! The page you're looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
