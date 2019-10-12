import {
    FETCH_QUESTION,
    UPDATE_FLIGHT,
    CORRECT_ANSWER,
    SET_COUNTER,
    UPDATE_STATS,
    SET_INTERVAL,
    NEXT_QUESTION
} from './types';
import axios from 'axios';


export const getQuestion = (number) =>  (dispatch) => {
    axios.get("http://localhost:5000/question", {
      params: {
        qnumber: number
      }})
    .then((response) => {
      dispatch({ type: FETCH_QUESTION, payload: response.data });
    });
};
export const setFlightNumber = (flight_number) =>  (dispatch) => {
  axios.get("http://localhost:5000/login", {
    params: {
      flight_number: flight_number
    }})
  .then((response) => {
    dispatch({
      type: SET_COUNTER,
      payload: 0
    });
  });

};
export const updateFlightNumber = (flight_number) => (dispatch) => {
    dispatch({
      type: UPDATE_FLIGHT,
      payload: flight_number
    });
};

export const updateStats = (dispatch) => {
    console.log("updating stats");
    axios.get("http://localhost:5000/stats")
    .then((response) => {
      dispatch({
        type: UPDATE_STATS,
        payload: response.data });
    });
};

export const nextQuestion = (counter) => (dispatch) => {

  dispatch({
    type: NEXT_QUESTION,
    payload: counter+1
   });
};

export const sendAnswer = (answer) => (dispatch) => {
  axios.post("http://localhost:5000/answer", { 'answer': answer })
  .then((response) => {
    dispatch({
      type: CORRECT_ANSWER,
      payload: { 'answer': answer, 'correct': response.data['answer'], requestStats: true }
    });
    const intervalID = setInterval(() => {
      console.log("update stats");
      	updateStats(dispatch);
    	}, 1000);
		dispatch({
			type: SET_INTERVAL,
			payload: intervalID
		});
  });
};
