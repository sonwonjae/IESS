interface Interview {
  title: string;
  created_by: number;
}

interface InterviewInList extends Interview {
  interviewId: string;
}

interface Interviews {
  [interviewId: string]: Interview;
}
interface ResInterviews {
  headId: string | null;
  tailId: string | null;
  interviews: Interviews;
}
