import styled from 'styled-components';
import { color } from '../../../constants/color';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 5rem;
  box-shadow: 0 0.5rem 0.75rem 0 #00000015;
  background-color: ${color.white};
  z-index: 1;
`;

export const HeaderWrapper = styled.div`
  max-width: 800px;
  height: 100%;
  padding: 1rem 1.25rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderItemWrapper = styled.div`
  display: flex;
`;

export const CommonButton = styled.button`
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
    background-color: ${color.lightPrimary};
  }
  &:active {
    color: ${color.white};
    background-color: ${color.primary};
  }
`;

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
    background-color: ${color.lightPrimary};
  }
  &:active {
    color: ${color.white};
    background-color: ${color.primary};
  }
`;

export const Button = styled(CommonButton)`
  display: inline-block;
  line-height: 1.4;
`;

export const ButtonAnchor = styled(CommonButtonAnchor)`
  display: inline-block;
  line-height: 1.4;
`;
