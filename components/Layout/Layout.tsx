import { memo } from 'react';

import Head from 'next/head';

import Header from './Header/Header';

import { User } from 'firebase/auth';

import { Main, Container } from './Layout.styled';

interface LayoutProps extends Props {
  user: User;
  isLoading: boolean;
}

const Layout = ({ user, isLoading, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>IESS</title>
      </Head>
      <Header user={user} isLoading={isLoading} />
      <Main>
        <Container>{children}</Container>
      </Main>
    </>
  );
};
export default memo(Layout);
