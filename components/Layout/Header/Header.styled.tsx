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
  min-width: 320px;
  height: 100%;
  padding: 1rem 1.25rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 3rem;
`;
