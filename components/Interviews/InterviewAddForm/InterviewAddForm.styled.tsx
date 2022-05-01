import styled from 'styled-components';

import { color } from '../../../constants/color';

export const Form = styled.form`
  margin: 1rem 0 0;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.375rem 0.125rem ${color.shadowPrimary};
  font-size: 1rem;
  font-weight: bold;
  color: ${color.primary};

  & > input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    font-weight: bold;
    color: ${color.primary};

    &::-webkit-input-placeholder {
      color: ${color.shadowPrimary};
    }
  }

  & > button {
    margin: 0;
    margin-left: 0.5rem;
    padding: 0 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    word-break: keep-all;
    border: none;
    border-radius: 0.5rem;
    line-height: 2;
    background-color: ${color.shadowPrimary};
    color: ${color.white};

    &:hover {
      background-color: ${color.primary};
    }

    &[type='reset'] {
      background-color: ${color.lightRed};

      &:hover {
        background-color: ${color.red};
      }
    }
  }
`;
