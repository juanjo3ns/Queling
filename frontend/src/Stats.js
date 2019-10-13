import React, { Component } from 'react';
import Chart from 'react-google-charts';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import {
  updateStats,
  nextQuestion
} from './actions';


class Stats extends Component {

  nextQuestion(){
    const { interval, counter } = this.props;
    clearInterval(interval);
    this.props.nextQuestion(counter);

  }

  renderResult(){
    const { answer, correct, score, a1, a2, a3, a4 } = this.props;
    const answer_list = [a1,a2,a3,a4];
    if(answer==correct){
      return(
        <span style={rightStyle}>You're right!</span>
      )
    }else{
      return(
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={wrongStyle}>You're wrong!</span>
          <span>Correct answer: {answer_list[correct]}</span>
        </div>
      )
    }
  }

  render(){
    const { stats, requestStats, a1, a2, a3, a4 } = this.props;
    return (
      <div id="stats_class" style={statsStyle}>
        <Chart
          width={350}
          height={500}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['', ''],
            [a1, stats[0]],
            [a2, stats[1]],
            [a3, stats[2]],
            [a4, stats[3]]
            ]}
          options={{
            title: 'Votations',
            chartArea: { width: '95%' },
            hAxis: {
              title: '',
              minValue: 0,
            },
            vAxis: {
              title: '',
            },
          }}
        />
        <div style={{ padding: '20px' }}>
        {this.renderResult()}
        </div>
        <div>
          <Link to="/quiz">
            <Button
            size="lg"
            onClick={this.nextQuestion.bind(this)}
            variant="dark">
            <span role="img" aria-label="arrow_right">➡️</span>
            </Button>
          </Link>
        </div>

      </div>
    );
  }

}

const statsStyle ={
  backgroundColor: 'rgba(120, 255, 120, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%'
}

const rightStyle = {
  fontSize: '30px',
  fontWeight: 'bold',
  color: 'rgba(20, 255, 20, 0.8)'
}
const wrongStyle = {
  fontSize: '30px',
  fontWeight: 'bold',
  color: 'rgba(255, 0, 0, 0.8)'
}
const mapStateToProps = ({ environments }) => {
  const { answer, correct, stats, requestStats, a1, a2, a3, a4, interval, counter, score } = environments;
  return { answer, correct, stats, requestStats, a1, a2, a3, a4, interval, counter, score };
}

export default connect(mapStateToProps, {
  updateStats,
  nextQuestion
} )(Stats);
