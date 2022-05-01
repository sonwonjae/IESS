import { MouseEventHandler } from 'react';

import { createPortal } from 'react-dom';

import { ResponsiveNav, EscapeButton } from './Navigation.styled';

interface ResponsiveNavProps extends Props {
  toggleIsShowNav: MouseEventHandler<HTMLButtonElement>;
}

const ResponsiveNavigation = ({
  children,
  toggleIsShowNav,
}: ResponsiveNavProps) => {
  return createPortal(
    <ResponsiveNav onClick={toggleIsShowNav}>
      <EscapeButton onClick={toggleIsShowNav}>×</EscapeButton>
      {children}
    </ResponsiveNav>,
    document.body
  );
};

export default ResponsiveNavigation;
