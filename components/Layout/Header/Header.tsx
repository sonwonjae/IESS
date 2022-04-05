import Link from 'next/link';

import { memo } from 'react';

import { auth } from '../../../firebase';
import { signOut, User } from 'firebase/auth';

import {
  HeaderContainer,
  HeaderWrapper,
  HeaderItemWrapper,
  Button,
  ButtonAnchor,
} from './Header.styled';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

interface HeaderProps extends Props {
  user: User;
  isLoading: boolean;
}

const Header = ({ user, isLoading }: HeaderProps) => {
  const handleLogout = () => {
    signOut(auth);
    window.location.href = '/';
  };

  if (isLoading)
    return (
      <HeaderContainer>
        <HeaderWrapper>
          <Logo />
        </HeaderWrapper>
      </HeaderContainer>
    );

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo />
        <HeaderItemWrapper>
          {user && (
            <Navigation>
              <ul>
                <li>
                  <Link href="/interview-list" passHref>
                    <ButtonAnchor>면접 연습하기</ButtonAnchor>
                  </Link>
                </li>
                <li>
                  <Link href="/interview-note-list" passHref>
                    <ButtonAnchor>면접 노트</ButtonAnchor>
                  </Link>
                </li>
              </ul>
            </Navigation>
          )}
          {user ? (
            <Button onClick={handleLogout}>로그아웃</Button>
          ) : (
            <Link href="/login" passHref>
              <ButtonAnchor role="button">로그인</ButtonAnchor>
            </Link>
          )}
        </HeaderItemWrapper>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default memo(Header);
