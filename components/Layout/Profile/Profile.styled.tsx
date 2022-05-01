import styled from 'styled-components';
import { color } from '../../../constants/color';

export const ProfileButton = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
`;

export const Name = styled.h3`
  display: inline-block;
  margin: 0;
  margin-right: 0.5rem;
  padding: 0;
  font-size: 1rem;
  line-height: 3rem;
  color: ${color.black};
`;

export const UpArrow = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  border-bottom: 0.75rem solid ${color.black};
`;

export const DownArrow = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  border-top: 0.75rem solid ${color.black};
`;

export const ProfileToolContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 10rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
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
