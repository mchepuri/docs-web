import actionTypes from './actionTypes';

export const setData = async (dispatch, data) => {
  console.log('SetData Called ',data);
  dispatch({ type: actionTypes.setDataSuccess, data });
};