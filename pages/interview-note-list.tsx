import type { AppProps } from 'next/app';

import useUser from '../hooks/useUser';

import Layout from '../components/Layout/Layout';

interface InterviewListProps extends AppProps {}

const InterviewNoteList = (prop: InterviewListProps) => {
  const { user, isLoading } = useUser({ requiredValidConfirm: true });

  return (
    <Layout user={user} isLoading={isLoading}>
      InterviewNoteList
    </Layout>
  );
};

export default InterviewNoteList;
