 import {
     FETCH_QUESTION,
     UPDATE_FLIGHT,
     SET_COUNTER
 } from '../actions/types';
const INITIAL_STATE = {
  flight_number: '',
  question: '',
  a1: '',
  a2: '',
  a3: '',
  a4: '',
  correct: '',
  counter: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_QUESTION:
            return { ...state,
              question: action.payload['question'],
              a1: action.payload['answers'][0],
              a2: action.payload['answers'][1],
              a3: action.payload['answers'][2],
              a4: action.payload['answers'][3],
              };
        case UPDATE_FLIGHT:
            return { ...state, flight_number: action.payload };
        case SET_COUNTER:
            return { ...state, counter: action.payload };
        default:
            return state;
    }
};
