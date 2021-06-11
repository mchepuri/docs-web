import actionTypes from './actionTypes';

export const initialUserRegistrationState = {};

export const reducer = (state = initialUserRegistrationState, action = { type: '' }) => {
  // Change to switch statement once 3 or more conditions
  if (action.type === actionTypes.setDataSuccess) {
    return {
      ...state,
      ...action.data,
    };
  } else {
    return state;
  }
};
