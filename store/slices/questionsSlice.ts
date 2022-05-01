import { createSlice } from '@reduxjs/toolkit';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

const initialState: { questions: Partial<Questions>; nextQuestionId: string } =
  {
    questions: {},
    nextQuestionId: '',
  };

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload.questions;
      state.nextQuestionId = action.payload.nextQuestionId;
    },
    updateQuestions: (state, action) => {
      state.questions = { ...state.questions, ...action.payload.questions };
      state.nextQuestionId = action.payload.nextQuestionId;
    },
    changeQuestionLike: (
      state,
      {
        payload: { questionId, uid },
      }: { payload: { questionId: string; uid: string } }
    ) => {
      const isLike = state.questions[questionId]!.liked_users[uid];
      const likeCount = state.questions[questionId]!.like;

      state.questions[questionId]!.liked_users[uid] = !isLike;
      state.questions[questionId]!.like = isLike
        ? likeCount - 1
        : likeCount + 1;
    },
  },
});

export const { updateQuestions, setQuestions, changeQuestionLike } =
  questionsSlice.actions;

export default questionsSlice.reducer;
