import styled from 'styled-components';
import { CommonButton } from '../Common/Button/Button.styled';

import { color } from '../../constants/color';

export const LoginContainer = styled.div`
  margin: 0 auto;
  max-width: 480px;
  padding: 1rem;
`;

export const LoginTitleWrapper = styled.div``;

export const LoginTitle = styled.h3`
  display: inline-block;
  padding: 0.5rem 0.75rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${color.primary};
  border-bottom: 2px solid ${color.primary};
`;

export const LoginInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.35rem 0.75rem;
  border: 2px solid ${color.lightBlack};
  background-color: ${color.white};
  color: ${color.black};
  font-size: 1rem;
  font-weight: bold;
  line-height: 2;

  &:focus {
    outline: none;
    border: 2px solid ${color.black};
  }

  margin-bottom: 0.5rem;
`;

export const LoginButton = styled(CommonButton)`
  display: block;
  width: 100%;
`;

export const LoginGuideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color.black};
  margin-top: 0.5rem;

  & > span {
    line-height: 2;
    border-bottom: 2px solid transparent;
  }

  & > button {
    box-sizing: border-box;
    margin: 0;
    margin-left: 0.5rem;
    padding: 0 0.25rem;
    line-height: 2;
    font-size: 1rem;
    font-weight: bold;
    background-color: transparent;
    border: none;
    color: ${color.black};
    border-bottom: 2px solid ${color.black};
    cursor: pointer;

    &:hover {
      color: ${color.primary};
      border-bottom: 2px solid ${color.primary};
    }
  }
`;
