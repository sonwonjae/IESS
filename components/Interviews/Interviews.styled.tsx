import styled from 'styled-components';
import { color } from '../../constants/color';
import { CommonButton } from '../Common/Button/Button.styled';

export const InterviewTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${color.primary};
  margin: 3rem 0 1.5rem;
`;

export const InterviewList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const AddButton = styled(CommonButton)`
  margin-top: 1.25rem;
  width: 100%;
  height: 3rem;
  color: ${color.shadowPrimary};
  border-color: ${color.shadowPrimary};
  border-radius: 0.5rem;

  &:hover {
    background-color: ${color.shadowPrimary};
  }
`;
