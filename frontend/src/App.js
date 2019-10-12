import React from 'react';

import FlightNumber from './FlightNumber';
import QuestionClass from './QuestionClass';
import Question from './Question';

function App() {
  return (
    <div style={appStyle}>
      <FlightNumber/>
    </div>
  );
}

const appStyle ={
  backgroundColor: 'rgba(120, 255, 120, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}

export default App;
