import {
  HeaderContainer,
  HeaderWrapper,
  HeaderItemWrapper,
} from './Header.styled';

import Logo from '../../Common/Logo/Logo';

interface HeaderProps extends Props {}

const Header = ({ children }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo />
        <HeaderItemWrapper>{children}</HeaderItemWrapper>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
