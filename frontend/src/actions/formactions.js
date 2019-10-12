import {
    SLIDER_X_CHANGED,
    SLIDER_Y_CHANGED,
    ALGORITHM_CHANGED,
    INPUT_CHANGED,
    CHECK_CHANGED
} from './types';



export const heightSlider = (value) => {
  value = value || 10;
  return {
    type: SLIDER_X_CHANGED,
    payload: value
  };
};

export const widthSlider = (value) => {
  value = value || 10;
  return {
    type: SLIDER_Y_CHANGED,
    payload: value
  };
};

export const changeAlgorithm = (alg) => {
  alg = alg || "DQN";
  return (dispatch) => {
  dispatch({type: ALGORITHM_CHANGED, payload: alg});
  };
};

export const changeInput = (input) => {
  return {
    type: INPUT_CHANGED,
    payload: input
  };
};

export const changeCheck = (check) => {
  return {
    type: CHECK_CHANGED,
    payload: check
  };
}
