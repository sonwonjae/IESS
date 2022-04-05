import styled from 'styled-components';
import { color } from '../../../constants/color';

export const Nav = styled.nav`
  & > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    margin-right: 2rem;

    & > li:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

export const NavButton = styled.button`
  position: relative;
  width: 2.5rem;
  padding: 0;
  margin-left: 1rem;
  background-color: transparent;
  border: none;
  order: 1;
`;

export const Hamburger = styled.span`
  position: static;
  display: block;
  background-color: ${color.primary};
  width: 100%;
  height: 0.375rem;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 0.375rem;
    background-color: ${color.primary};
  }

  &:before {
    top: 0.12rem;
  }
  &:after {
    bottom: 0.12rem;
  }
`;

export const ResponsiveNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  background-color: ${color.lightBlack};

  & > ul {
    position: fixed;
    margin: 0;
    padding: 0;
    list-style: none;
    top: 0;
    right: 0;
    display: block;
    width: 70%;
    max-width: 360px;
    height: 100vh;
    margin: 0;
    background-color: ${color.primary};

    &:before {
      content: '메뉴';
      display: block;
      padding: 0.75rem;
      padding-top: 1.5rem;
      font-size: 1.5rem;
      font-weight: bold;
      color: ${color.white};
      border-bottom: 1px solid ${color.white};
    }

    & > li {
      &:not(:first-child) {
        margin-left: 0;
      }

      & > a {
        display: block;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid ${color.white};
        color: ${color.white};
        background-color: ${color.shadowBlack};
        line-height: 2;
      }
    }
  }
`;

export const EscapeButton = styled.button`
  position: fixed;
  z-index: 1;
  top: 1.5rem;
  right: 0.75rem;
  background-color: transparent;
  color: ${color.white};
  border: none;
  font-size: 2rem;
  padding: 0;
  width: 2rem;
  height: 2rem;
`;
