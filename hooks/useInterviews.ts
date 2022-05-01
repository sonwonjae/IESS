import { RootState } from '../store/index';

import { useSelector, useDispatch } from 'react-redux';
import * as interviewsSlice from '../store/slices/interviewsSlice';

import axios from 'axios';
import { v5 } from 'uuid';

import useInterviewsApi from '../api/useInterviews';

const useInterviews = () => {
  const { user, isLoading } = useSelector((state: RootState) => state.account);
  const { head, tail, order, interviews } = useSelector(
    (state: RootState) => state.interviews
  );
  const dispatch = useDispatch();
  const api = useInterviewsApi();

  if (!api) return;

  const getInterviews = async () => {
    const resInterviews = await api.getInterviews();
    dispatch(interviewsSlice.setInterviews(resInterviews));
  };

  const createInterview = (interview: Interview) => {
    const interviewId = v5(user.uid + new Date().toISOString(), v5.URL);

    api.addInterview(interviewId, interview).then(() => {
      dispatch(interviewsSlice.addInterview({ interviewId, interview }));
    });
  };

  const moveInterview = (
    dragId: string,
    dropPrevId: string | null,
    dropNextId: string | null
  ) => {
    api.moveInterview(dragId, dropPrevId, dropNextId).then(() => {
      dispatch(
        interviewsSlice.moveInterview({ dragId, dropPrevId, dropNextId })
      );
    });
  };

  const deleteInterview = (interviewId: string) => {
    api.deleteInterview(interviewId).then(() => {
      dispatch(interviewsSlice.deleteInterview({ interviewId }));
    });
  };

  const getInterviewOrder = (interviewId: string) => {
    return order[interviewId];
  };

  const makeInterviewList = () => {
    if (!head) return [];

    const list: InterviewInList[] = [];

    list.push({
      interviewId: head,
      ...interviews[head],
    });

    let tmp = order[head];
    while (tmp.nextId) {
      list.push({
        interviewId: tmp.nextId,
        ...interviews[tmp.nextId],
      });

      tmp = order[tmp.nextId];
    }

    return list;
  };

  return {
    head,
    tail,
    order,
    interviews,
    getInterviews,
    createInterview,
    moveInterview,
    deleteInterview,
    getInterviewOrder,
    makeInterviewList,
  };
};

export default useInterviews;
