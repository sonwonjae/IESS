import styled from 'styled-components';
import { color } from '../../constants/color';

export const HomeTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${color.primary};
  margin: 3rem 0 1.5rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  line-height: 1.5;
  margin: 0.5rem 0 1rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid ${color.shadowPrimary};
  border-radius: 5rem;

  font-size: 1rem;
  font-weight: bold;
  color: ${color.black};

  &:focus {
    border: 2px solid ${color.primary};
    outline: none;
  }
`;
