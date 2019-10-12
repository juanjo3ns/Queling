import { combineReducers } from 'redux';
import GeneralReducer from './GeneralReducer';
import FormReducer from './FormReducer';
import EnvsReducer from './EnvsReducer';

export default combineReducers({
  generalbuttons: GeneralReducer,
  formValues: FormReducer,
  environments: EnvsReducer
});
