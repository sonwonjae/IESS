import { RootState } from '../store/index';

import { useSelector, useDispatch } from 'react-redux';
import {
  changeQuestionLike,
  setQuestions,
  updateQuestions,
} from '../store/slices/questionsSlice';

import axios from 'axios';

const useQuestions = () => {
  const { questions, nextQuestionId } = useSelector(
    ({ questions }: RootState) => questions
  );
  const dispatch = useDispatch();

  const getQuestions = async (searchKeyword: string) => {
    const { origin } = window.location;
    const encodingSearchKeyword = encodeURIComponent(searchKeyword);

    const {
      data: { questions, nextQuestionId },
    } = await axios.get(
      `${origin}/api/questions?searchKeyword=${encodingSearchKeyword}`
    );
    dispatch(setQuestions({ questions, nextQuestionId }));
  };

  const getNextQuestions = async (searchKeyword: string) => {
    const { origin } = window.location;
    const encodingSearchKeyword = encodeURIComponent(searchKeyword);

    const {
      data: { questions, nextQuestionId: newNextQuestionId },
    } = await axios.get(
      `${origin}/api/questions?searchKeyword=${encodingSearchKeyword}&nextQuestionId=${nextQuestionId}`
    );
    dispatch(updateQuestions({ questions, nextQuestionId: newNextQuestionId }));
  };

  const updateQuestionLike = async ({
    questionId,
    isLike,
    uid,
  }: {
    questionId: string;
    isLike: boolean;
    uid: string;
  }) => {
    const { origin } = window.location;
    await axios.patch(`${origin}/api/question/${questionId}`, { isLike, uid });

    dispatch(changeQuestionLike({ questionId, uid }));
  };

  return {
    questions,
    nextQuestionId,
    getQuestions,
    getNextQuestions,
    updateQuestionLike,
  };
};

export default useQuestions;
