import React, { Component } from 'react';
import Question from './Question';
import { connect } from 'react-redux';

import {
  sendAnswer,
  getQuestion
} from './actions';

class QuestionClass extends Component {

  updateQuestion(counter){
    this.props.getQuestion(counter);
  }

  componentWillMount(){
    const { counter } = this.props;
    this.updateQuestion(counter);
  }
  render(){
    console.log(this.props);
    const { question, a1, a2, a3, a4, a5 } = this.props;
    return (
      <div>
      <Question
      question={question}
      a1={a1}
      a2={a2}
      a3={a3}
      a4={a4}
      />
      </div>
    );
  }

}


const mapStateToProps = ({ environments }) => {
  const { question, a1, a2, a3, a4, counter } = environments;
  return { question, a1, a2, a3, a4, counter };
}

export default connect(mapStateToProps, {
  sendAnswer,
  getQuestion
} )(QuestionClass);
