import { ChangeEvent, FormEvent, useState } from 'react';

import { Form } from './InterviewAddForm.styled';

interface InterviewAddFormProps extends Props {
  onSubmitWithTitle: (title: string) => (e: FormEvent<HTMLFormElement>) => void;
  toggleShowInterviewAddForm: () => void;
}

const InterviewAddForm = ({
  onSubmitWithTitle,
  toggleShowInterviewAddForm,
}: InterviewAddFormProps) => {
  const [title, setTitle] = useState('');

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Form onSubmit={onSubmitWithTitle(title)}>
      <input
        type="text"
        required
        placeholder="면접 제목을 작성해주세요."
        onChange={changeTitle}
      />
      <button type="submit">저장</button>
      <button type="reset" onClick={toggleShowInterviewAddForm}>
        취소
      </button>
    </Form>
  );
};

export default InterviewAddForm;
