import {
  FETCH_ENVS_SUCCES,
  FETCH_THREED_SUCCES,
  CHANGE_ACTIVE_ENV,
  RESET_ENV
 } from '../actions/types';

const INITIAL_STATE = {
  envs: [],
  threedlist: [],
  activenv: ''

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ENVS_SUCCES:
            return { ...state, envs: action.payload };
        case FETCH_THREED_SUCCES:
            return { ...state, threedlist: action.payload };
        case CHANGE_ACTIVE_ENV:
            return { ...state, activenv: action.payload};
        case RESET_ENV:
            return { ...state, activenv: '' };
        default:
            return state;
    }
};
