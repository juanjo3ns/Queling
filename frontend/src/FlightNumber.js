import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import {
  updateFlightNumber,
  setFlightNumber
} from './actions';

class FlightNumber extends Component {

  setFlightNumber() {
    const { flight_number } = this.props;
    this.props.setFlightNumber(flight_number);
  }
  updateFlightNumber(e){
    this.props.updateFlightNumber(e.target.value);
  }


  render(){
    console.log(this.props.flight_number);
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
        value={this.props.flight_number}
        onChange={this.updateFlightNumber.bind(this)}
        />
      </InputGroup>
      <Link to="/quiz">
      <Button
      size="lg"
      onClick={this.setFlightNumber.bind(this)}
      variant="dark">
      <span role="img" aria-label="zap">⚡️</span>
      </Button>
      </Link>
      </div>
    );

  }
}

const appStyle ={
  padding: '50px',
  backgroundColor: 'rgba(120, 255, 120, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}


const mapStateToProps = ({ environments }) => {
  const { flight_number } = environments;
  return { flight_number };
}

export default connect(mapStateToProps, {
  updateFlightNumber,
  setFlightNumber
} )(FlightNumber);
