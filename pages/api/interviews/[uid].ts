import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../firebase.js';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  getDocs,
} from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    head: string | null;
    tail: string | null;
    order: {
      [interviewId: string]: {
        prevId: string | null;
        nextId: string | null;
      };
    };
    interviews: Interviews;
  }>
) {
  let {
    body,
    method,
    query: { uid },
  } = req;

  let responseBody: {
    head: string | null;
    tail: string | null;
    order: {
      [interviewId: string]: {
        prevId: string | null;
        nextId: string | null;
      };
    };
    interviews: Interviews;
  } = {
    head: null,
    tail: null,
    order: {},
    interviews: {},
  };

  const getInterviewDocsInInterviewsCollection = async () => {
    const endPointSnap = await getDoc(doc(db, 'users', uid as string));
    const endPoint = endPointSnap.data() as {
      head: string | null;
      tail: string | null;
    };

    console.log({ endPoint });

    if (endPoint) {
      responseBody.head = endPoint.head;
      responseBody.tail = endPoint.tail;
    } else {
      responseBody.head = null;
      responseBody.tail = null;
    }

    const interviewOrderQuery = query(collection(db, `users/${uid}/order`));
    const interviewOrderSnap = await getDocs(interviewOrderQuery);
    interviewOrderSnap.forEach(async (orderDoc) => {
      responseBody.order[orderDoc.id] = orderDoc.data() as {
        prevId: string | null;
        nextId: string | null;
      };
    });

    const interviewsQuery = query(collection(db, `users/${uid}/interviews`));
    const interviewsSnap = await getDocs(interviewsQuery);
    interviewsSnap.forEach(async (interviewDoc) => {
      responseBody.interviews[interviewDoc.id] =
        interviewDoc.data() as Interview;
    });

    console.log({ responseBody });

    res.statusCode = 200;
  };

  switch (method) {
    case 'GET':
      await getInterviewDocsInInterviewsCollection();
      break;
    case 'POST':
      interface PostBody {
        head: string | null;
        tail: string | null;
        interviewId: string;
        interview: Interview;
      }

      const {
        head: postHead,
        tail: postTail,
        interviewId: postInterviewId,
        interview,
      }: PostBody = body;

      if (!postHead) {
        await setDoc(doc(db, `users`, uid as string), {
          head: postInterviewId,
          tail: postInterviewId,
        });

        await setDoc(doc(db, `users/${uid}/order`, postInterviewId), {
          prevId: null,
          nextId: null,
        });
      } else if (postTail) {
        await updateDoc(doc(db, `users/${uid}/order`, postTail), {
          nextId: postInterviewId,
        });

        await setDoc(doc(db, `users/${uid}/order`, postInterviewId), {
          prevId: postTail,
          nextId: null,
        });

        await updateDoc(doc(db, `users`, uid as string), {
          tail: postInterviewId,
        });
      }

      await setDoc(
        doc(db, `users/${uid}/interviews`, postInterviewId),
        interview
      );

      break;
    case 'PATCH':
      interface PatchBody {
        dragId: string;
        dragPrevId: string | null;
        dragNextId: string | null;
        dropId: string;
        dropPrevId: string | null;
        dropNextId: string | null;
      }

      const {
        dragId,
        dragPrevId,
        dragNextId,
        dropId,
        dropPrevId,
        dropNextId,
      }: PatchBody = body;

      if (!dragPrevId) {
        await updateDoc(doc(db, `users`, uid as string), {
          head: dragNextId,
        });
      }

      if (!dragNextId) {
        await updateDoc(doc(db, `users`, uid as string), {
          tail: dragPrevId,
        });
      }

      if (!dropPrevId) {
        await updateDoc(doc(db, `users`, uid as string), {
          head: dragId,
        });
      }

      if (!dropNextId) {
        await updateDoc(doc(db, `users`, uid as string), {
          tail: dragId,
        });
      }

      if (dragPrevId) {
        await updateDoc(doc(db, `users/${uid}/order`, dragPrevId), {
          nextId: dragNextId,
        });
      }

      if (dragNextId) {
        await updateDoc(doc(db, `users/${uid}/order`, dragNextId), {
          prevId: dragPrevId,
        });
      }

      if (dropPrevId) {
        await updateDoc(doc(db, `users/${uid}/order`, dropPrevId), {
          nextId: dragId,
        });
      }

      if (dropNextId) {
        await updateDoc(doc(db, `users/${uid}/order`, dropNextId), {
          prevId: dragId,
        });
      }

      await updateDoc(doc(db, `users/${uid}/order`, dragId), {
        prevId: dropPrevId,
        nextId: dropNextId,
      });
      break;
    case 'DELETE':
      interface DeleteBody {
        head: string | null;
        tail: string | null;
        interviewId: string;
        prevId: string | null;
        nextId: string | null;
      }

      const {
        head: deleteHead,
        tail: deleteTail,
        interviewId: deleteInterviewId,
        prevId,
        nextId,
      }: DeleteBody = body;

      if (deleteHead === deleteInterviewId) {
        await updateDoc(doc(db, `users`, uid as string), {
          head: nextId,
        });
      }

      if (deleteTail === deleteInterviewId) {
        await updateDoc(doc(db, `users`, uid as string), {
          tail: prevId,
        });
      }

      if (prevId) {
        await updateDoc(doc(db, `users/${uid}/order`, prevId), {
          nextId,
        });
      }

      if (nextId) {
        await updateDoc(doc(db, `users/${uid}/order`, nextId), {
          prevId,
        });
      }

      const userQuestionsQuery = query(
        collection(
          db,
          `users/${uid}/interviews/${deleteInterviewId}/user_questions`
        )
      );
      const userQuestionsSnap = await getDocs(userQuestionsQuery);
      userQuestionsSnap.forEach(async (userQuestionDoc) => {
        const examOrderQuery = query(
          collection(
            db,
            `users/${uid}/interviews/${deleteInterviewId}/user_questions/${userQuestionDoc.id}/exam_order`
          )
        );
        const examOrderSnap = await getDocs(examOrderQuery);
        examOrderSnap.forEach(async (examOrderDoc) => {
          await deleteDoc(
            doc(
              db,
              `users/${uid}/interviews/${deleteInterviewId}/user_questions/${userQuestionDoc.id}/exam_order`,
              examOrderDoc.id
            )
          );
        });

        const groupsOrderQuery = query(
          collection(
            db,
            `users/${uid}/interviews/${deleteInterviewId}/user_questions/${userQuestionDoc.id}/groups_order`
          )
        );
        const groupsOrderSnap = await getDocs(groupsOrderQuery);
        groupsOrderSnap.forEach(async (groupsOrderDoc) => {
          await deleteDoc(
            doc(
              db,
              `users/${uid}/interviews/${deleteInterviewId}/user_questions/${userQuestionDoc.id}/groups_order`,
              groupsOrderDoc.id
            )
          );
        });

        const groupQuery = query(
          collection(
            db,
            `users/${uid}/interviews/${deleteInterviewId}/user_questions/${userQuestionDoc.id}/groups`
          )
        );
        const groupsSnap = await getDocs(groupQuery);
        groupsSnap.forEach(async (groupsDoc) => {
          const questionsQuery = query(
            collection(
              db,
              `users/${uid}/interviews/${deleteInterviewId}/user_questions/${userQuestionDoc.id}/groups/${groupsDoc.id}/questions_order`
            )
          );
          const questionsSnap = await getDocs(questionsQuery);
          questionsSnap.forEach(async (questionDoc) => {
            await deleteDoc(
              doc(
                db,
                `users/${uid}/interviews/${deleteInterviewId}/user_questions/${userQuestionDoc.id}/groups/${groupsDoc.id}/questions_order`,
                questionDoc.id
              )
            );
          });

          await deleteDoc(
            doc(
              db,
              `users/${uid}/interviews/${deleteInterviewId}/user_questions/${userQuestionDoc.id}/groups`,
              groupsDoc.id
            )
          );
        });

        const questionsQuery = query(
          collection(
            db,
            `users/${uid}/interviews/${deleteInterviewId}/user_questions/${userQuestionDoc.id}/questions`
          )
        );
        const questionsSnap = await getDocs(questionsQuery);
        questionsSnap.forEach(async (questionDoc) => {
          await deleteDoc(doc(db, 'questions', questionDoc.id));

          await deleteDoc(
            doc(
              db,
              `users/${uid}/interviews/${deleteInterviewId}/user_questions/${userQuestionDoc.id}/questions`,
              questionDoc.id
            )
          );
        });

        await deleteDoc(
          doc(
            db,
            `users/${uid}/interviews/${deleteInterviewId}/user_questions`,
            userQuestionDoc.id
          )
        );
      });

      await deleteDoc(doc(db, `users/${uid}/interviews`, deleteInterviewId));
      await deleteDoc(doc(db, `users/${uid}/order`, deleteInterviewId));
      break;
    default:
      break;
  }
  res.json(responseBody);
}
