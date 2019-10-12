import React from 'react';
import {
  LOAD_ENVS_SUCCESS,
  CHANGE_BUTTON_CELL,
  UPDATE_CELL_VALUES,
  RESET_CELL_VALUES,
  RESET_ENV,
  RESET_FORM,
  FETCH_ENVS_SUCCES,
  CHANGE_ACTIVE_ENV,
  MOUSE_OVER,
  ENABLE_MODAL,
  UPDATE_SUCCESS,
  UPDATE_SNACKBAR
} from './types';
import loadEnvs from '../requests/envs';
import axios from 'axios';
import base_url from '../requests/base_url';
import db from '../config';
import history from '../history'


const validateValues = (formValues, walls, walls_values, initstate, finalstate) => {
  let response = [true, ''];
  Object.entries(formValues).map(([key, value]) => {
    if (
      key === "savefreq" ||
      key === "iterations" ||
      key === "visibleRad" ||
      key === "normal_reward" ||
      key === "min_wall" ||
      key === "max_wall" ||
      key === "seed" ||
      key === "done_reward" ||
      key === "edge_value" ||
      key === "numAgents" ||
      key === "epsmax" ||
      key === "epsmin" ||
      key === "health"
    ) {
      if (isNaN(value)) {
        response = [false, 'Incorrect values!'];
      }else if (value === ""){
        response = [false, 'Fill all the paremeters!'];
      }
    } else if (
      key === "numwalls" ||
      key === "batch_size" ||
      key === "pos" ||
      key === "variance"
    ) {
      if (isNaN(value.value)) {
        response = [false, 'Incorrect values!'];
      }
    } else if (key === "version"){
      if(value === ""){
        response = [false, 'Fill all the paremeters!'];
      }
    }
  });
  if ((initstate.length === 0 || finalstate.length === 0) && (formValues.alg === "DQN" || formValues.alg === "GA")) {
    response = [false, 'Add initial and final state!']
  }
  return response;
}


export const loadEnvsFirebase = () => dispatch => {
  db.collection("envs").get().then(snapshot => {
    let data = {};
    snapshot.forEach(doc => {
      data[doc.id] = doc.data();
    });
    dispatch({
      type: LOAD_ENVS_SUCCESS,
      payload: data
    });
  });
}


export const loadEnvsAction = () => dispatch => {
  base_url.get('/allenvs')
    .then((response) => {
      dispatch({
        type: LOAD_ENVS_SUCCESS,
        payload: response.data
      });
    });
}


export const enableModal = version => {
  return {
    type: ENABLE_MODAL,
    payload: version
  }
}

export const updateForm = values => {
  return {
    type: UPDATE_SUCCESS,
    payload: values
  }
}


export const saveEnv = (formValues, walls, initstate, finalstate, walls_values) => dispatch => {
  const a = validateValues(formValues, walls, walls_values, initstate, finalstate);
  const able = a[0];
  const comment = a[1];
  if (able) {
    const data = {
      ...formValues,
      walls: walls,
      initstate: initstate,
      finalstate: finalstate,
      walls_values: walls_values
    };
    axios.post("http://localhost:5000/envs", data)
      .then((response) => {
        dispatch({
          type: CHANGE_ACTIVE_ENV,
          payload: formValues.version
        });
        dispatch({
          type: FETCH_ENVS_SUCCES,
          payload: response.data
        });
      });
  }
};

export const handleReset = () => (dispatch) => {
  dispatch({
    type: RESET_CELL_VALUES,
    payload: "reset"
  });
  dispatch({
    type: RESET_ENV,
    payload: "reset"
  });
  dispatch({
    type: RESET_FORM,
    payload: "reset"
  });
};

export const handleTrain = ( formValues, walls, initstate, finalstate, walls_values) => (dispatch) => {
  const a = validateValues(formValues, walls, walls_values, initstate, finalstate);
  const able = a[0];
  const comment = a[1];
  if (able) {
    const data = {
      ...formValues,
      walls: walls,
      initstate: initstate,
      finalstate: finalstate,
      walls_values: walls_values
    };
    db.collection('train').doc(formValues['version']).set(data);
    dispatch({
      type: UPDATE_SNACKBAR,
      payload: {
        snackopen: true,
        snackvariant: 'success',
        snackmessage: 'Environment added to training buffer!'
      }
    });
  }else{
    dispatch({
      type: UPDATE_SNACKBAR,
      payload: {
        snackopen: true,
        snackvariant: 'error',
        snackmessage: comment
      }
    });
  }
}

export const handleSnackClose = () => (dispatch) => {
  dispatch({
    type: UPDATE_SNACKBAR,
    payload: { snackopen: false }
  });
}


export const handleThreed = (version) => (dispatch) => {
  const algorithm = version.split('.')[0];
  var newwindow = window.open('/templates/'.concat(algorithm).concat('/index.html?version=').concat(version), "_blank");


}

export const handleClick = (id) => {
  return {
    type: CHANGE_BUTTON_CELL,
    payload: id
  };
};

export const handleCell = (cell, id, walls, initstate, finalstate, walls_values, type, clicked, min_wall, max_wall, isMobile) => dispatch => {
  if (!isMobile){
    if (type === "click" && cell === "walls") {
      dispatch({
        type: MOUSE_OVER,
        payload: !clicked
      });
    }
  }
  if (walls.indexOf(id) !== -1) {
    const index = walls.indexOf(id);
    walls_values.splice(index, 1);
    dispatch({
      type: UPDATE_CELL_VALUES,
      payload: {
        walls: walls.filter((wall) => {
          return wall !== id
        }),
        walls_values: [...walls_values]
      }
    });
  } else if (initstate.indexOf(id) !== -1) {
    dispatch({
      type: UPDATE_CELL_VALUES,
      payload: {
        initstate: []
      }
    });
  } else if (finalstate.indexOf(id) !== -1) {
    dispatch({
      type: UPDATE_CELL_VALUES,
      payload: {
        finalstate: []
      }
    });
  } else if (cell === "finalstate") {
    dispatch({
      type: UPDATE_CELL_VALUES,
      payload: {
        finalstate: [id]
      }
    });
  } else if (cell === "initstate") {
    dispatch({
      type: UPDATE_CELL_VALUES,
      payload: {
        initstate: [id]
      }
    });
  } else {
    dispatch({
      type: UPDATE_CELL_VALUES,
      payload: {
        walls: [...walls, id],
        walls_values: [...walls_values, Math.random() * (max_wall - min_wall) + min_wall]
      }
    });
  }
};
