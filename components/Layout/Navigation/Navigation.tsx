import { MouseEventHandler, useEffect, useState } from 'react';

import debounce from 'lodash.debounce';

import { Nav, NavButton, Hamburger } from './Navigation.styled';

import ResponsiveNavigation from './ResponsiveNavigation';

interface NavigationProps extends Props {}

const Navigation = ({ children }: NavigationProps) => {
  const isMobileWidth = document.documentElement.clientWidth <= 600;

  const [{ isMobile, isShowNav }, setResizeInfo] = useState({
    isMobile: isMobileWidth,
    isShowNav: !isMobileWidth,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      const isMobileWidth = document.documentElement.clientWidth <= 600;
      if (isMobileWidth === isMobile) return;

      setResizeInfo({
        isMobile: isMobileWidth,
        isShowNav,
      });
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const toggleIsShowNav: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    setResizeInfo({ isMobile, isShowNav: !isShowNav });
  };

  if (isMobile) {
    return (
      <>
        <NavButton onClick={toggleIsShowNav}>
          <Hamburger onClick={toggleIsShowNav} />
        </NavButton>
        {isShowNav && (
          <ResponsiveNavigation toggleIsShowNav={toggleIsShowNav}>
            {children}
          </ResponsiveNavigation>
        )}
      </>
    );
  }

  return <Nav>{children}</Nav>;
};

export default Navigation;
