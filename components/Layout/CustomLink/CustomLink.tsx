import Link from 'next/link';

import { ButtonAnchor } from '../../Common/ButtonAnchor/ButtonAnchor.styled';

interface CustomLinkProps extends Props {
  role?: 'button' | 'anchor';
  href: string;
}

const CustomLink = ({ role = 'anchor', href, children }: CustomLinkProps) => {
  return (
    <Link href={href} passHref>
      <ButtonAnchor role={role === 'button' ? role : ''}>
        {children}
      </ButtonAnchor>
    </Link>
  );
};

export default CustomLink;
