import styled from 'styled-components';
import { color } from '../../../constants/color';

export const InterviewItemWrapper = styled.li<{
  isCeil: boolean;
  isFloor: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  margin: 1.25rem 0 0;
  padding: 0 0.5rem;
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.375rem 0.125rem ${color.shadowPrimary};
  font-size: 1rem;
  font-weight: bold;
  color: ${color.primary};

  ${({ isCeil }) => {
    if (isCeil) {
      return `
        &:after {
          content: '';
          position: absolute;
          top: 100%;
          margin-top: 0.375rem;
          left: 0;
          display: block;
          width: 100%;
          height: 0.5rem;
          background-color: ${color.lightPrimary};
        }`;
    }
  }};

  ${({ isFloor }) => {
    if (isFloor) {
      return `
        &:before {
          content: '';
          position: absolute;
          bottom: 100%;
          margin-bottom: 0.375rem;
          left: 0;
          display: block;
          width: 100%;
          height: 0.5rem;
          background-color: ${color.lightPrimary};
        }`;
    }
  }};
`;

export const MoveButton = styled.button`
  position: relative;
  margin: 0;
  margin-right: 1rem;
  padding: 0;
  width: 3rem;
  height: 3rem;
  background-color: transparent;
  border: none;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 75%;
    left: 12.5%;
    height: 0.3rem;
    border-radius: 0.125rem;
    background-color: ${color.primary};
  }

  &:before {
    top: 1rem;
  }
  &:after {
    bottom: 1rem;
  }
`;

export const InterviewAnchor = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  line-height: 3rem;
`;

export const ToolButton = styled.button`
  position: absolute;
  right: 0.5rem;
  height: 1.75rem;
  padding: 0 0.5rem;
  margin-left: 1rem;
  background-color: transparent;
  border: none;
`;

export const ThreeDot = styled.span`
  display: block;
  background-color: ${color.primary};
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    background-color: ${color.primary};
  }

  &:before {
    top: 0.12rem;
  }
  &:after {
    bottom: 0.12rem;
  }
`;

export const InterviewTool = styled.div`
  position: absolute;
  top: 0.625rem;
  right: 2.5rem;
  min-width: 6rem;
  padding: 0.25rem 0;
  background-color: ${color.white};
  box-shadow: 0px 0px 4px rgba(1, 19, 119, 0.5);
  border-radius: 0.5rem;

  & > button {
    display: block;
    width: 100%;
    border: none;
    color: ${color.black};
    font-size: 0.75rem;
    font-weight: bold;
    line-height: 2;
    background-color: transparent;
    text-align: left;
    padding-left: 1rem;

    &:hover {
      background-color: ${color.lightBlack};
    }
    &:active {
      color: ${color.white};
      background-color: ${color.black};
    }
  }
`;
