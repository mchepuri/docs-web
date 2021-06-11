import React, { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import * as actions from './actions';

const UserRegistrationState = createContext();
const UserRegistrationDispatch = createContext();

export const useUserRegistrationDispatch = () => {
  const context = useContext(UserRegistrationDispatch);
  if (context === undefined) {
    logger.warn('useUserRegistrationDispatch must be used within a UserRegistrationContextProvider');
    return {};
  }
  return context;
};
export const useUserRegistrationState = () => {
  const context = useContext(UserRegistrationState);
  if (context === undefined) {
    console.log('useUserRegistrationState must be used within a UserRegistrationContextProvider');
    return {};
  }
  return context;
};

export const UserRegistrationContextProvider = ({ children, initialState = initialSignupState }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const setData = (data) => actions.setData(dispatch, data);
  
    return (
      <UserRegistrationState.Provider value={{ ...state }}>
        <UserRegistrationDispatch.Provider value={{ setData }}>{children}</UserRegistrationDispatch.Provider>
      </UserRegistrationState.Provider>
    );
  };