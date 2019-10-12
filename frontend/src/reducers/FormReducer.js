import {
  UPDATE_SUCCESS,
  SLIDER_X_CHANGED,
  SLIDER_Y_CHANGED,
  ALGORITHM_CHANGED,
  INPUT_CHANGED,
  FETCH_ENV_SUCCES,
  RESET_FORM,
  CHECK_CHANGED
 } from '../actions/types';

const INITIAL_STATE = {
  height: 7,
  width: 7,
  alg: "DQN",
  version: "",
  version_placeholder: "DQN.test.0",
  tensorboard: true,
  saveweights: true,
  savefreq: 1000,
  iterations: 10000,
  numwalls: { value: 15, disabled: true},
  visibleRad: 1,
  normal_reward: -0.04,
  min_wall: -1.0,
  max_wall: -1.0,
  seed: 0,
  done_reward: 10,
  edge_value: -1,
  numAgents: 1,
  epsmax: 0.6,
  epsmin: 0.0001,
  health: 20,
  batch_size: { value: 1000, disabled: false},
  pos: { value: 0.05, disabled: true},
  variance: { value: 0.03, disabled: true},
  po: { value: false, disabled: true},
  comments: ''

};

const DQN_DEFAULTS = {
  version: "",
  version_placeholder: "DQN.test.0",
  tensorboard: true,
  saveweights: true,
  savefreq: 1000,
  iterations: 10000,
  numwalls: { value: 15, disabled: true},
  visibleRad: 1,
  normal_reward: -0.04,
  min_wall: -1.0,
  max_wall: -1.0,
  seed: 0,
  done_reward: 10,
  edge_value: -1,
  numAgents: 1,
  epsmax: 0.6,
  epsmin: 0.0001,
  health: 20,
  batch_size: { value: 1000, disabled: false},
  pos: { value: 0.05, disabled: true},
  variance: { value: 0.03, disabled: true},
  po: { value: false, disabled: true}
}

const GA_DEFAULTS = {
  version: "",
  version_placeholder: "GA.test.0",
  tensorboard: true,
  saveweights: true,
  savefreq: 20,
  iterations: 300,
  numwalls: { value: 15, disabled: true},
  visibleRad: 1,
  normal_reward: -0.04,
  min_wall: -1.0,
  max_wall: -1.0,
  seed: 0,
  done_reward: 10,
  edge_value: -1,
  numAgents: 100,
  epsmax: 0.6,
  epsmin: 0.0001,
  health: 20,
  batch_size: { value: 1000, disabled: true},
  pos: { value: 0.05, disabled: false},
  variance: { value: 0.03, disabled: false},
  po: { value: false, disabled: true}
}
const RWB_DEFAULTS = {
  version: "",
  version_placeholder: "RWB.test.0",
  tensorboard: true,
  saveweights: true,
  savefreq: 10000,
  iterations: 200000,
  numwalls: { value: 15, disabled: false},
  visibleRad: 1,
  normal_reward: -0.04,
  min_wall: -1.0,
  max_wall: 0.5,
  seed: 0,
  done_reward: 10,
  edge_value: -1,
  numAgents: 1,
  epsmax: 0.6,
  epsmin: 0.0001,
  health: 1,
  batch_size: { value: 1000, disabled: true},
  pos: { value: 0.05, disabled: true},
  variance: { value: 0.03, disabled: true},
  po: { value: true, disabled: false}
}
const AC_DEFAULTS = {
  version: "",
  version_placeholder: "A2C.test.0",
  tensorboard: true,
  saveweights: true,
  savefreq: 10000,
  iterations: 200000,
  numwalls: { value: 15, disabled: false},
  visibleRad: 1,
  normal_reward: -0.04,
  min_wall: -1.0,
  max_wall: 0.5,
  seed: 0,
  done_reward: 10,
  edge_value: -1,
  numAgents: 1,
  epsmax: 0.6,
  epsmin: 0.0001,
  health: 1,
  batch_size: { value: 1000, disabled: true},
  pos: { value: 0.05, disabled: true},
  variance: { value: 0.03, disabled: true},
  po: { value: true, disabled: false}
}

const DEFAULTS = { "DQN": DQN_DEFAULTS, "GA": GA_DEFAULTS, "RWB": RWB_DEFAULTS, "A2C": AC_DEFAULTS }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_SUCCESS:
            return {  ...state, ...action.payload };
        case SLIDER_X_CHANGED:
            return { ...state, height: action.payload };
        case SLIDER_Y_CHANGED:
            return { ...state, width: action.payload };
        case ALGORITHM_CHANGED:
            return { ...state, ...DEFAULTS[action.payload], alg: action.payload };
        case INPUT_CHANGED:
            return { ...state, ...action.payload };
        case CHECK_CHANGED:
            return { ...state, ...action.payload };
        case FETCH_ENV_SUCCES:
            return { ...state,  ...action.payload};
        case RESET_FORM:
            return { ...state,  ...INITIAL_STATE};
        default:
            return state;
    }
};
