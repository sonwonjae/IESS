import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  head: string | null;
  tail: string | null;
  order: {
    [interviewId: string]: {
      prevId: string | null;
      nextId: string | null;
    };
  };
  interviews: Interviews;
} = {
  head: null,
  tail: null,
  order: {},
  interviews: {},
};

export const interviewsSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {
    setInterviews: (state, { payload }) => {
      return payload;
    },
    addInterview: (state, { payload }) => {
      const {
        interviewId,
        interview,
      }: {
        interviewId: string;
        interview: Interview;
      } = payload;

      if (!state.head) {
        state.head = interviewId;
        state.tail = interviewId;

        state.order[interviewId] = {
          prevId: null,
          nextId: null,
        };
      }

      if (state.tail) {
        state.order[state.tail].nextId = interviewId;

        state.order[interviewId] = {
          prevId: state.tail,
          nextId: null,
        };

        state.tail = interviewId;
      }

      state.interviews[interviewId] = interview;

      return state;
    },
    deleteInterview: (state, { payload }) => {
      const { interviewId } = payload;

      const { prevId, nextId } = state.order[interviewId];

      if (state.head === interviewId) {
        state.head = nextId;
      }

      if (state.tail === interviewId) {
        state.tail = prevId;
      }

      if (prevId) {
        state.order[prevId].nextId = nextId;
      }
      if (nextId) {
        state.order[nextId].prevId = prevId;
      }

      delete state.order[interviewId];
      delete state.interviews[interviewId];

      return state;
    },
    moveInterview: (state, { payload }) => {
      const { dragId, dropPrevId, dropNextId } = payload;

      const { prevId: dragPrevId, nextId: dragNextId } = state.order[dragId];

      if (!dragPrevId) {
        state.head = dragNextId;
      }

      if (!dragNextId) {
        state.tail = dragPrevId;
      }

      if (!dropPrevId) {
        state.head = dragId;
      }

      if (!dropNextId) {
        state.tail = dragId;
      }

      if (dragPrevId) {
        state.order[dragPrevId].nextId = dragNextId;
      }
      if (dragNextId) {
        state.order[dragNextId].prevId = dragPrevId;
      }

      if (dropPrevId) {
        state.order[dropPrevId].nextId = dragId;
      }

      if (dropNextId) {
        state.order[dropNextId].prevId = dragId;
      }

      state.order[dragId].prevId = dropPrevId;
      state.order[dragId].nextId = dropNextId;

      return state;
    },
  },
});

export const { setInterviews, addInterview, deleteInterview, moveInterview } =
  interviewsSlice.actions;

export default interviewsSlice.reducer;
