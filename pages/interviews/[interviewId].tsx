import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { useEffect, useState, ChangeEvent } from 'react';

import useUser from '../../hooks/useUser';

import Layout from '../../components/Layout/Layout';
import useUserQuestions from '../../hooks/useUserQuestions';

interface QuestionsInInterviewProps extends AppProps {}

const QuestionsInInterview = (prop: QuestionsInInterviewProps) => {
  const { user, isLoading } = useUser({ requiredValidConfirm: true });
  const { query } = useRouter();
  const { interviewId } = query;
  const {
    userQuestions,
    getUserQuestions,
    createUserQuestion,
    deleteUserQuestion,
  } = useUserQuestions(interviewId as string);

  const userQuestionList = Object.entries(userQuestions).sort(([, a], [, b]) =>
    !(a && b) ? 0 : b.created_by - a.created_by
  );

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);

  const changeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const changeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const toggleIsPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  useEffect(() => {
    if (!isLoading && user) getUserQuestions();
  }, [user]);

  const handleDeleteQuestion = (questionId: string) => () => {
    deleteUserQuestion(questionId);
  };

  if (isLoading) return <>...isLoading</>;

  return (
    <Layout user={user}>
      <ul>
        {userQuestionList.map(([questionId, { question, test_answer }]) => (
          <li key={questionId}>
            <div>질문: {question}</div>
            <div>답변: {test_answer}</div>
            <button onClick={handleDeleteQuestion(questionId)}>삭제</button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUserQuestion({
            order: 0,
            group_order: 0,
            question,
            test_answer: answer,
            note_answer: '',
            isPrivate,
            created_by: Date.now(),
          });
        }}
      >
        <input
          type="text"
          required
          placeholder="질문을 입력하세요."
          onChange={changeQuestion}
        />
        <input
          type="text"
          required
          placeholder="답변을 입력하세요."
          onChange={changeAnswer}
        />
        <label>
          Private
          <input
            checked={isPrivate}
            type="checkbox"
            onChange={toggleIsPrivate}
          />
        </label>
        <button type="submit">질문 추가하기</button>
      </form>
    </Layout>
  );
};

export default QuestionsInInterview;
