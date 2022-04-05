import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import account from './accountSlice';

const reducer = (state: any, action: { type: string; payload: any }) => {
  if (action.type === HYDRATE) return { ...state, ...action.payload };

  return combineReducers({ account })(state, action);
};

export default reducer;
