interface UserQuestion {
  order: number;
  group_order: number;
  question: string;
  test_answer: string;
  note_answer: string;
  isPrivate: boolean;
  created_by: number;
}

interface TmpUserQuestion {}

type InterviewsWithUserQuestion = {
  [userQuestionId: string]: UserQuestion;
};

type UserQuestions = {
  [interviewId: string]: InterviewsWithUserQuestion;
};
