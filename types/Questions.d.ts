interface Question {
  question: string;
  like: number;
  write_by: string;
  isPrivate: boolean;
  created_by: number;
  liked_users: {
    [userId: string]: boolean;
  };
}

type Questions = {
  [questionId: string]: Question;
};
