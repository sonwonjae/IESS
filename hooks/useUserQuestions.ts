import { RootState } from '../store/index';

import { useSelector, useDispatch } from 'react-redux';
import { setUserQuestions } from '../store/slices/userQuestionsSlice';

import axios from 'axios';

const useUserQuestions = (interviewId: string) => {
  const { user, isLoading } = useSelector((state: RootState) => state.account);
  const userQuestions = useSelector((state: RootState) => state.userQuestions);
  const dispatch = useDispatch();

  const getUserQuestions = async () => {
    const { origin } = window.location;
    const { data: userQuestions } = await axios.get(
      `${origin}/api/user-questions/${user.uid}/${interviewId}`
    );

    dispatch(setUserQuestions(userQuestions));
  };

  const createUserQuestion = async (userQuestion: UserQuestion) => {
    const { origin } = window.location;
    const { data: userQuestions } = await axios.post(
      `${origin}/api/user-questions/${user.uid}/${interviewId}`,
      userQuestion
    );

    dispatch(setUserQuestions(userQuestions));
  };

  const deleteUserQuestion = async (questionId: string) => {
    const { origin } = window.location;
    const { data: userQuestions } = await axios.delete(
      `${origin}/api/user-questions/${user.uid}/${interviewId}`,
      {
        data: questionId,
      }
    );

    dispatch(setUserQuestions(userQuestions));
  };

  return {
    userQuestions,
    getUserQuestions,
    createUserQuestion,
    deleteUserQuestion,
  };
};

export default useUserQuestions;
