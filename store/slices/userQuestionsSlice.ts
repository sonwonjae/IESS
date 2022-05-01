import { createSlice } from '@reduxjs/toolkit';

const initialState: Partial<InterviewsWithUserQuestion> = {};

export const userQuestionsSlice = createSlice({
  name: 'userQuestions',
  initialState,
  reducers: {
    setUserQuestions: (state, action) => {
      console.log({ payload: action.payload });

      return action.payload;
    },
  },
});

export const { setUserQuestions } = userQuestionsSlice.actions;

export default userQuestionsSlice.reducer;
