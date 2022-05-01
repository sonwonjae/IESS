import styled from 'styled-components';
import { color } from '../../../constants/color';

export const QuestionList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  color: ${color.black};

  & > li {
    padding: 1.25rem 1.25rem 0.75rem;
    border-bottom: 1px solid ${color.black};
  }
`;

export const Question = styled.h4`
  margin: 0;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

export const Like = styled.div`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
`;

export const LikeCount = styled.span`
  margin-left: 0.5rem;
  font-weight: bold;
`;
