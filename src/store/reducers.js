import C from '../constants';
import { combineReducers } from 'redux';

export const goal = (state = 10, action) =>
  (action.type === C.SET_GOAL) ?
    action.payload :
    state;

export const skiDay = (state = null, action) =>
  (action.type === C.ADD_DAY) ?
    action.payload :
    state;

export const errors = (state = [], action) => {
  switch(action.type) {
  case C.ADD_ERROR:
    return [
      ...state,
      action.payload
    ];

  case C.CLEAR_ERROR:
    return state.filter((message, i) => i !== action.payload);

  default:
    return state;
  }
};

export const allSkiDays = (state = [], action) => {
  switch(action.type) {
  // Composing reducers. Using reducer skiDay to add new one into collection
  // first parameter of reducer expecting state which we dont have so will put just a null
  // Its important to give it same action so it will trigger
  case C.ADD_DAY:
  const hasDayAlready = state.some(skiDay => skiDay.date === action.payload.date);
    return (hasDayAlready) ?
      state :
      [
        ...state,
        skiDay(null, action)
      ];

  case C.REMOVE_DAY:
    return state.filter(skiDay => skiDay.date !== action.payload);

  default:
    return state;
  }
};

export const fetching = (state = false, action) => {
  switch(action.type) {
  case C.FETCH_RESORT_NAMES :
    return true;

  case C.CANCEL_FETCHING :
    return false;

  case C.CHANGE_SUGGESTIONS :
    return false;
  default: return state;
  }
};

export const suggestions = (state = [], action) => {
  switch(action.type) {
  case C.CLEAR_SUGGESTIONS :
    return [];

  case C.CHANGE_SUGGESTIONS :
    return action.payload;
  default: return state;
  }
};

// Resort names using two reducers so we need to combine them first to pass it to a single reducer object
export default combineReducers({
  allSkiDays,
  goal,
  errors,
  resortNames: combineReducers({
    fetching,
    suggestions
  })
});
