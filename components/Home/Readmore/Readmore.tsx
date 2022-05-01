import { MouseEventHandler } from 'react';
import { ReadmoreButton } from './Readmore.styled';

interface ReadmoreProps extends Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Readmore = ({ onClick }: ReadmoreProps) => {
  return <ReadmoreButton onClick={onClick}>Readmore</ReadmoreButton>;
};

export default Readmore;
