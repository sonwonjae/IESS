import { updateProfile } from 'firebase/auth';

import Heart from '../../Common/Icon/Heart';
import {
  QuestionList,
  Question,
  Like,
  LikeCount,
} from './HomeQuestions.styled';

interface HomeQuestionsProps extends Props {
  questions: [string, Question][];
}

const HomeQuestions = ({ questions }: HomeQuestionsProps) => {
  // const { updateQuestionLike } = useQuestion();

  return (
    <QuestionList>
      {questions.map(([questionId, { question, like }]) => (
        <li key={questionId}>
          <Question>{question}</Question>
          <Like>
            <Heart
              onClick={() => {
                // updateQuestionLike(questionId, { isLike: false });
              }}
            />
            <LikeCount>{like}</LikeCount>
          </Like>
        </li>
      ))}
    </QuestionList>
  );
};

export default HomeQuestions;
