import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


import {
  sendAnswer,
  getQuestion
} from './actions';

class QuestionClass extends Component {

  onResponse(e){
    const { score } = this.props;
    this.props.sendAnswer(e.target.id, score);
  }

  updateQuestion(counter){
    this.props.getQuestion(counter);
  }

  componentWillMount(){
    const { counter } = this.props;
    this.updateQuestion(counter);
  }

  render(){
    const { score, counter, question, a1, a2, a3, a4 } = this.props;
    if (counter==4){
      return(
        <div id="finalpage" style={appStyle}>
          <div style={{ padding: '30px' }}>
            <span style={questionStyle}>Enjoy your flight!</span>
          </div>
          <div style={{ padding: '30px' }}>
            <span style={vuelingStyle}>+{score*10} Vueling Points!</span>
          </div>
          <div style={{ padding: '30px' }}>
            <span style={questionStyle}>✈️✈️✈️✈️✈️✈️✈️</span>
          </div>
        </div>
      );
    }else{
      return (
        <div id="questions" style={appStyle}>
        <div style={{ padding: '30px' }}>
        <span style={questionStyle}>{question}</span>
        </div>
        <div>
        <ButtonGroup vertical>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
            <div style={{ padding: '10px' }}>
              <Link to="/stats">
              <Button id="0" onClick={this.onResponse.bind(this)} size="lg" variant="primary">{a1}</Button>
              </Link>
              </div>

              <div style={{ padding: '10px' }}>
              <Link to="/stats">
              <Button id="1" onClick={this.onResponse.bind(this)} size="lg" variant="info">{a2}</Button>
              </Link>
              </div>
              <div style={{ padding: '10px' }}>
              <Link to="/stats">
              <Button id="2" onClick={this.onResponse.bind(this)} size="lg" variant="warning">{a3}</Button>
              </Link>
              </div>
              <div style={{ padding: '10px' }}>
              <Link to="/stats">
              <Button id="3" onClick={this.onResponse.bind(this)} size="lg" variant="dark">{a4}</Button>
              </Link>
              </div>
            </div>
      </ButtonGroup>
      </div>
      </div>
    );
    }
  }
}
const appStyle = {
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
  color: 'rgba(50, 100, 255, 0.8)'
}

const vuelingStyle={
  fontSize: '30px',
  fontWeight: 'bold',
  color: 'rgba(0, 0, 0, 0.6)'
}
const mapStateToProps = ({ environments }) => {
  const { question, a1, a2, a3, a4, counter, score } = environments;
  return { question, a1, a2, a3, a4, counter, score };
}

export default connect(mapStateToProps, {
  sendAnswer,
  getQuestion
} )(QuestionClass);
