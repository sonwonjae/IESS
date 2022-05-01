import styled from 'styled-components';

import { color } from '../../../constants/color';

export const CommonButtonAnchor = styled.a`
  box-sizing: border-box;
  border-radius: 0.25rem;
  padding: 0.35rem 0.75rem;
  border: 2px solid ${color.primary};
  background-color: ${color.white};
  color: ${color.primary};
  font-size: 1rem;
  font-weight: bold;
  line-height: 2;
  letter-spacing: 0.025em;
  &:hover {
    background-color: ${color.shadowPrimary};
  }
  &:active {
    color: ${color.white};
    background-color: ${color.primary};
  }
`;

export const ButtonAnchor = styled(CommonButtonAnchor)`
  display: inline-block;
`;
