import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import account from './accountSlice';
import interviews from './interviewsSlice';
import userQuestions from './userQuestionsSlice';
import questions from './questionsSlice';

const reducer = (state: any, action: { type: string; payload: any }) => {
  if (action.type === HYDRATE) return { ...state, ...action.payload };

  return combineReducers({ account, interviews, userQuestions, questions })(
    state,
    action
  );
};

export default reducer;
