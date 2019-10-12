import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const Question = (props) => {
  const { question, a1, a2, a3, a4 } = props;
  return (
    <div id="questions" style={appStyle}>
      <div style={{ padding: '30px' }}>
      <span style={questionStyle}>{question}</span>
      </div>
      <div>
      <ButtonGroup vertical>
        <Button size="lg" variant="primary">{a1}</Button>
        <Button size="lg" variant="info">{a2}</Button>
        <Button size="lg" variant="warning">{a3}</Button>
        <Button size="lg" variant="dark">{a4}</Button>
      </ButtonGroup>
      </div>
    </div>
  );
}

const appStyle ={
  backgroundColor: 'rgba(120, 255, 120, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%'
}
const questionStyle ={
  fontSize: '50px',
  fontWeight: 'bold',
  color: 'rgba(50, 100, 255, 0.6)'
}

export default Question;
