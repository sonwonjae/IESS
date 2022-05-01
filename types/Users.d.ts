interface User {
  id: string;
  name: string;
  image: string;
  interviews: Interviews;
  like_questions: {
    [parse_question: string]: boolean;
  };
}

type Users = User[];
