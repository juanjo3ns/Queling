import { combineReducers } from 'redux';
import EnvsReducer from './EnvsReducer';

export default combineReducers({
  environments: EnvsReducer
});
