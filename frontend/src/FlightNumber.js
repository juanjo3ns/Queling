import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function FlightNumber() {
  return (
    <div style={appStyle}>
      <InputGroup className="mb-3" size="lg">
        <InputGroup.Prepend>

          <InputGroup.Text id="inputGroup-sizing-lg" id="basic-addon1">
            <span role="img" aria-label="sheep">✈️</span>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="flight number"
          aria-label="flight number"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      
      <Button size="lg" variant="dark"><span role="img" aria-label="zap">⚡️</span></Button>

    </div>
  );
}

const appStyle ={
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

export default FlightNumber;
