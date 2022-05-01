import Link from 'next/link';
import { NextPage } from 'next';

import { DragEventHandler, FormEvent, useEffect, useState } from 'react';

import useUser from '../../hooks/useUser';

import Layout from '../../components/Layout/Layout';
import useInterviews from '../../hooks/useInterviews';
import InterviewAddForm from '../../components/Interviews/InterviewAddForm/InterviewAddForm';
import {
  InterviewTitle,
  InterviewList,
  AddButton,
} from '../../components/Interviews/Interviews.styled';
import InterviewItem from '../../components/Interviews/InterviewItem/InterviewItem';

interface InterviewListProps {}

const Interviews: NextPage<InterviewListProps> = () => {
  const { user, isLoading } = useUser({ requiredValidConfirm: true });

  const [showInterviewAddForm, setShowInterviewAddForm] = useState(false);
  const [dragInterviewId, setDragInterviewId] = useState<string | null>(null);
  const [targetPrevInterviewId, setTargetPrevInterviewId] = useState<
    string | null
  >(null);
  const [targetNextInterviewId, setTargetNextInterviewId] = useState<
    string | null
  >(null);
  const interviewHook = useInterviews();

  useEffect(() => {
    if (!isLoading && user && interviewHook) interviewHook.getInterviews();
  }, [user]);

  if (isLoading || !interviewHook) return <>...isLoading</>;

  const toggleShowInterviewAddForm = () => {
    setShowInterviewAddForm(!showInterviewAddForm);
  };

  const onSubmitWithTitle =
    (title: string) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      interviewHook.createInterview({
        title,
        created_by: Date.now(),
      });
      toggleShowInterviewAddForm();
    };

  return (
    <Layout user={user}>
      <InterviewTitle>면접 리스트</InterviewTitle>
      <InterviewList>
        {interviewHook.makeInterviewList().map(({ interviewId, title }) => {
          const deleteInterview = () => {
            interviewHook.deleteInterview(interviewId);
          };

          const handleDragStart = () => {
            setDragInterviewId(interviewId);
            if (!dragInterviewId) return;
          };

          const handleDragEnd = () => {
            if (!dragInterviewId) {
              return;
            }

            setTargetPrevInterviewId(null);
            setTargetNextInterviewId(null);
            setDragInterviewId(null);

            if (
              targetPrevInterviewId === dragInterviewId ||
              targetNextInterviewId === dragInterviewId ||
              targetPrevInterviewId === targetNextInterviewId
            )
              return;

            interviewHook.moveInterview(
              dragInterviewId,
              targetPrevInterviewId,
              targetNextInterviewId
            );
          };

          const handleDragOver: DragEventHandler<HTMLLIElement> = (e) => {
            if (!dragInterviewId || dragInterviewId === interviewId) return;

            const { prevId, nextId } =
              interviewHook.getInterviewOrder(interviewId);

            const interviewLI = e.target as HTMLLIElement;
            const { y: interviewY, height: interviewHeight } =
              interviewLI.getBoundingClientRect();
            const isTop = e.clientY - interviewY < interviewHeight / 2;
            if (isTop) {
              if (targetNextInterviewId === interviewId) return;
              setTargetPrevInterviewId(prevId);
              setTargetNextInterviewId(interviewId);
            } else {
              if (targetPrevInterviewId === interviewId) return;
              setTargetPrevInterviewId(interviewId);
              setTargetNextInterviewId(nextId);
            }
          };

          return (
            <InterviewItem
              key={interviewId}
              interviewId={interviewId}
              title={title}
              isCeil={targetPrevInterviewId === interviewId}
              isFloor={targetNextInterviewId === interviewId}
              deleteItem={deleteInterview}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
            />
          );
        })}
      </InterviewList>
      {!showInterviewAddForm && (
        <AddButton onClick={toggleShowInterviewAddForm}>
          면접 추가하기
        </AddButton>
      )}
      {showInterviewAddForm && (
        <InterviewAddForm
          onSubmitWithTitle={onSubmitWithTitle}
          toggleShowInterviewAddForm={toggleShowInterviewAddForm}
        />
      )}
    </Layout>
  );
};

export default Interviews;
