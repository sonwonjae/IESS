interface InterviewTestQuestion {
  id: string;
  title: string;
  answer: string;
  IsPrivate: boolean;
}
interface InterviewNoteQuestion extends InterviewTestQuestion {
  group: string;
}

type InterviewTest = InterviewTestQuestion[];
type InterviewNote = InterviewNoteQuestion[];

interface Interview {
  id: string;
  title: string;
  test: InterviewTest;
  note: InterviewNote;
}
type Interviews = Interview[];
