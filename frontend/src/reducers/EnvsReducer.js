 import {
     FETCH_QUESTION,
     UPDATE_FLIGHT,
     SET_COUNTER,
     UPDATE_STATS,
     CORRECT_ANSWER,
     SET_INTERVAL,
     NEXT_QUESTION,
     UPDATE_SCORE,
     SET_DATA
 } from '../actions/types';

const INITIAL_STATE = {
  flight_number: '',
  departure: '',
  weather: '',
  question: '',
  city: '',
  a1: '',
  a2: '',
  a3: '',
  a4: '',
  answer: 0,
  correct: 0,
  counter: 0,
  stats: [0,0,0,0],
  requestStats: false,
  interval: null,
  score: 0
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
        case UPDATE_STATS:
            return { ...state, stats: action.payload };
        case CORRECT_ANSWER:
            return { ...state, ...action.payload };
        case NEXT_QUESTION:
            return { ...state, counter: action.payload };
        case UPDATE_SCORE:
            return { ...state, score: action.payload };
        case SET_DATA:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
