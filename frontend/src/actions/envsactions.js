import {
    FETCH_QUESTION,
    UPDATE_FLIGHT,
    CORRECT_ANSWER,
    SET_COUNTER,
    UPDATE_STATS,
    SET_INTERVAL,
    NEXT_QUESTION,
    UPDATE_SCORE,
    SET_DATA
} from './types';
import axios from 'axios';

// const url = "http://localhost:5000";
const url = "http://backend3.ngrok.io";

export const getQuestion = (number) =>  (dispatch) => {
    axios.get(url.concat("/question"), {
      params: {
        qnumber: number
      }})
    .then((response) => {
      dispatch({ type: FETCH_QUESTION, payload: response.data });
    });
};
export const setFlightNumber = (flight_number) =>  (dispatch) => {
  axios.get(url.concat("/login"), {
    params: {
      flight_number: flight_number
    }})
  .then((response) => {
    dispatch({
      type: SET_COUNTER,
      payload: 0
    });
    dispatch({
      type: SET_DATA,
      payload: { departure: response.data['departure'], city: response.data['city'], weather: response.data['weather'] }
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
    axios.get(url.concat("/stats"))
    .then((response) => {
      dispatch({
        type: UPDATE_STATS,
        payload: response.data });
    });
};

export const resetStats = () => (dispatch) => {
    axios.get(url.concat("/reset"))
    .then((response) => {
      dispatch({
        type: UPDATE_STATS,
        payload: {
          '0':[0,0,0,0],
          '1':[0,0,0,0],
          '2':[0,0,0,0],
          '3':[0,0,0,0]
        } });
    });
};

export const nextQuestion = (counter) => (dispatch) => {

  dispatch({
    type: NEXT_QUESTION,
    payload: counter+1
   });
};

export const sendAnswer = (answer, score) => (dispatch) => {
  axios.post(url.concat("/answer"), { 'answer': answer })
  .then((response) => {
    dispatch({
      type: CORRECT_ANSWER,
      payload: { 'answer': answer, 'correct': response.data['answer'], requestStats: true }
    });
    if (answer==response.data['answer']){
      dispatch({
        type: UPDATE_SCORE,
        payload: score+1
      });
    }
    const intervalID = setInterval(() => {
      	updateStats(dispatch);
    	}, 800);
		dispatch({
			type: SET_INTERVAL,
			payload: intervalID
		});
  });
};
