import debounce from 'lodash.debounce';
import Link from 'next/link';

import { DragEventHandler, MouseEventHandler, useState } from 'react';
import useInterviews from '../../../hooks/useInterviews';

import {
  InterviewItemWrapper,
  MoveButton,
  InterviewAnchor,
  ThreeDot,
  ToolButton,
  InterviewTool,
} from './InterviewItem.styled';

interface InterviewItemProps extends Props {
  interviewId: string;
  title: string;
  deleteItem: MouseEventHandler<HTMLButtonElement>;
  onDragStart: DragEventHandler<HTMLLIElement>;
  onDragEnd: DragEventHandler<HTMLLIElement>;
  onDragOver: DragEventHandler<HTMLLIElement>;
  isCeil: boolean;
  isFloor: boolean;
}

const InterviewItem = ({
  interviewId,
  title,
  deleteItem,
  onDragStart,
  onDragEnd,
  onDragOver,
  isCeil,
  isFloor,
}: InterviewItemProps) => {
  const [showTool, setShowTool] = useState(false);

  const toggleShowTool = () => {
    setShowTool(!showTool);
  };

  return (
    <InterviewItemWrapper
      draggable
      isCeil={isCeil}
      isFloor={isFloor}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      {/* <MoveButton /> */}
      <Link href={`${window.location.pathname}/${interviewId}`} passHref>
        <InterviewAnchor draggable>{title}</InterviewAnchor>
      </Link>
      <ToolButton draggable="false" onClick={toggleShowTool}>
        <ThreeDot draggable="false" />
      </ToolButton>
      {showTool && (
        <InterviewTool>
          <button onClick={deleteItem}>삭제</button>
        </InterviewTool>
      )}
    </InterviewItemWrapper>
  );
};

export default InterviewItem;
