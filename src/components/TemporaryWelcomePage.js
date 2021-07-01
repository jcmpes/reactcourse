import React from 'react';

function TemporaryWelcomePage() {
  return (
    <React.Fragment>
      <div style={{
        textAlign: 'center',
        fontSize: 40,
      }}>
        Welcome to Courseapp
      </div>
      <div>
        <a href="/login">Login</a>
      </div>
    </React.Fragment>
  )
}

export default TemporaryWelcomePage