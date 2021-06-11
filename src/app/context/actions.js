import actionTypes from './actionTypes';

export const setData = async (dispatch, data) => {
  dispatch({ type: actionTypes.setDataSuccess, data });
};