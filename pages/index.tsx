import type { GetServerSideProps, NextPage } from 'next';

import axios from 'axios';

import { wrapper } from '../store';
import { setQuestions } from '../store/slices/questionsSlice';

import useUser from '../hooks/useUser';
import useQuestions from '../hooks/useQuestions';

import SearchInput from '../components/Home/SearchInput/SearchInput';
import Layout from '../components/Layout/Layout';
import Readmore from '../components/Home/Readmore/Readmore';
import { HomeTitle } from '../components/Home/Home.styled';
import {
  Like,
  LikeCount,
  Question,
  QuestionList,
} from '../components/Home/HomeQuestions/HomeQuestions.styled';
import Heart from '../components/Common/Icon/Heart';

interface HomeProps {
  searchKeyword: string;
}

const Home: NextPage<HomeProps> = ({ searchKeyword }) => {
  const { user } = useUser();

  const { questions, nextQuestionId, getNextQuestions, updateQuestionLike } =
    useQuestions();

  const handleReadMore = () => {
    getNextQuestions(searchKeyword);
  };

  return (
    <Layout user={user}>
      <HomeTitle>공유된 질문 리스트</HomeTitle>
      <SearchInput initSearchKeyword={searchKeyword} />
      <QuestionList>
        {Object.entries(questions).map(
          ([questionId, { question, like, liked_users }]) => {
            const isFulfilledHeart = user ? liked_users[user.uid] : false;
            const handleHeart = () => {
              if (user) {
                const { uid } = user;
                const isLike = liked_users[uid];
                updateQuestionLike({ questionId, isLike, uid });
              }
            };

            return (
              <li key={questionId}>
                <Question>{question}</Question>
                <Like>
                  <Heart fulfill={isFulfilledHeart} onClick={handleHeart} />
                  <LikeCount>{like}</LikeCount>
                </Like>
              </li>
            );
          }
        )}
      </QuestionList>
      {nextQuestionId && <Readmore onClick={handleReadMore}>더보기</Readmore>}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    context.query.searchKeyword = context.query.searchKeyword || '';
    const searchKeyword = context.query.searchKeyword as string;
    const encodingSearchKeyword = encodeURIComponent(searchKeyword);

    const {
      data: { questions, nextQuestionId },
    } = await axios.get(
      `https://iess-sonwonjae.vercel.app/api/questions?searchKeyword=${encodingSearchKeyword}`
    );

    store.dispatch(setQuestions({ questions, nextQuestionId }));

    return {
      props: { searchKeyword },
    };
  });

export default Home;
