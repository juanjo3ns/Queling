import {
    FETCH_QUESTION,
    UPDATE_FLIGHT,
    SEND_ANSWER,
    SET_COUNTER
} from './types';
import axios from 'axios';


export const getQuestion = (number) =>  (dispatch) => {
  console.log("getquestion ", number)
    axios.get("http://localhost:5000/question", {
      params: {
        qnumber: number
      }})
    .then((response) => {
      console.log(response.data);
      dispatch({ type: FETCH_QUESTION, payload: response.data });
    });
};
export const setFlightNumber = (flight_number) =>  (dispatch) => {
  axios.get("http://localhost:5000/login", {
    params: {
      flight_number: flight_number
    }})
  .then((response) => {
    console.log(response);
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


export const sendAnswer = (answer) => (dispatch) => {
  dispatch({
    type: SEND_ANSWER,
    payload: answer
  });
}
