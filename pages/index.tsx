import type { NextPage } from 'next';

import useUser from '../hooks/useUser';

import Layout from '../components/Layout/Layout';

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  return (
    <Layout user={user} isLoading={isLoading}>
      Home
    </Layout>
  );
};

export default Home;
