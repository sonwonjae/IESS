import Head from 'next/head';

import { memo } from 'react';

import { User } from 'firebase/auth';

import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import Profile from './Profile/Profile';
import CustomLink from './CustomLink/CustomLink';
import Main from './Main/Main';

interface LayoutProps extends Props {
  user: User;
}

const Layout = ({ user, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>IESS</title>
      </Head>
      <Header>
        {user ? (
          <>
            <Navigation>
              <ul>
                <li>
                  <CustomLink href="/mock-interview">모의 면접 진행</CustomLink>
                </li>
                <li>
                  <CustomLink href="/interviews">면접 노트</CustomLink>
                </li>
              </ul>
            </Navigation>
            <Profile user={user} />
          </>
        ) : (
          <CustomLink href="/login" role="button">
            로그인
          </CustomLink>
        )}
      </Header>
      <Main>{children}</Main>
    </>
  );
};
export default memo(Layout);
