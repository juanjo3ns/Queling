import {
    FETCH_ENVS_SUCCES,
    FETCH_THREED_SUCCES,
    FETCH_ENV_SUCCES,
    CHANGE_ACTIVE_ENV,
    LOAD_WALLS
} from './types';
import axios from 'axios';


export const fetchEnvironments = () =>  (dispatch) => {
    axios.get("http://localhost:5000/login")
    .then((response) => {
      dispatch({ type: FETCH_ENVS_SUCCES, payload: response.data });
    });
};
export const fetchSingleEnv = (version) => (dispatch) => {
    axios.get("http://localhost:5000/question", {
    params: {
      version: version
    }}).then((response) => {
      dispatch({
        type: LOAD_WALLS,
        payload: walls
      });
    });
};
