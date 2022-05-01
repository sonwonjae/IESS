import Link from 'next/link';
import { LogoWrapper } from './Logo.styled';

interface LogoProps extends Props {}

const Logo = (prop: LogoProps) => {
  return (
    <Link href="/" passHref>
      <LogoWrapper>IESS</LogoWrapper>
    </Link>
  );
};

export default Logo;
