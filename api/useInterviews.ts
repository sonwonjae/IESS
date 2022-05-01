import { db } from '../firebase.js';
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

import { RootState } from '../store/index';

import { useSelector } from 'react-redux';

interface ResInterviews {
  head: string | null;
  tail: string | null;
  order: {
    [interviewId: string]: {
      prevId: string | null;
      nextId: string | null;
    };
  };
  interviews: Interviews;
}
const useInterviews = () => {
  const { user, isLoading } = useSelector((state: RootState) => state.account);
  const { head, tail, order, interviews } = useSelector(
    (state: RootState) => state.interviews
  );

  if (!user) return;

  const { uid } = user;

  const USERS_C = 'users';
  const ORDER_C = `users/${uid}/order`;
  const INTERVIEWS_C = `users/${uid}/interviews`;

  const getInterviews = async () => {
    const resInterviews: ResInterviews = {
      head: null,
      tail: null,
      order: {},
      interviews: {},
    };

    const endPointSnap = await getDoc(doc(db, USERS_C, uid));
    const endPoint = endPointSnap.data() as {
      head: string | null;
      tail: string | null;
    };

    if (endPoint) {
      resInterviews.head = endPoint.head;
      resInterviews.tail = endPoint.tail;
    }

    const interviewOrderSnap = await getDocs(query(collection(db, ORDER_C)));
    interviewOrderSnap.forEach(async (orderDoc) => {
      resInterviews.order[orderDoc.id] = orderDoc.data() as {
        prevId: string | null;
        nextId: string | null;
      };
    });

    const interviewsSnap = await getDocs(query(collection(db, INTERVIEWS_C)));
    interviewsSnap.forEach(async (interviewDoc) => {
      resInterviews.interviews[interviewDoc.id] =
        interviewDoc.data() as Interview;
    });

    return resInterviews;
  };

  const addInterview = async (interviewId: string, interview: Interview) => {
    if (!head) {
      await setDoc(doc(db, USERS_C, uid), {
        head: interviewId,
        tail: interviewId,
      });

      await setDoc(doc(db, ORDER_C, interviewId), {
        prevId: null,
        nextId: null,
      });
    } else if (tail) {
      await updateDoc(doc(db, ORDER_C, tail), {
        nextId: interviewId,
      });

      await setDoc(doc(db, ORDER_C, interviewId), {
        prevId: tail,
        nextId: null,
      });

      await updateDoc(doc(db, USERS_C, uid), {
        tail: interviewId,
      });
    }

    await setDoc(doc(db, INTERVIEWS_C, interviewId), interview);
  };

  const moveInterview = async (
    dragId: string,
    dropPrevId: string | null,
    dropNextId: string | null
  ) => {
    const { prevId: dragPrevId, nextId: dragNextId } = order[dragId];

    if (!dragPrevId) {
      await updateDoc(doc(db, USERS_C, uid), {
        head: dragNextId,
      });
    }

    if (!dragNextId) {
      await updateDoc(doc(db, USERS_C, uid), {
        tail: dragPrevId,
      });
    }

    if (!dropPrevId) {
      await updateDoc(doc(db, USERS_C, uid), {
        head: dragId,
      });
    }

    if (!dropNextId) {
      await updateDoc(doc(db, USERS_C, uid), {
        tail: dragId,
      });
    }

    if (dragPrevId) {
      await updateDoc(doc(db, ORDER_C, dragPrevId), {
        nextId: dragNextId,
      });
    }

    if (dragNextId) {
      await updateDoc(doc(db, ORDER_C, dragNextId), {
        prevId: dragPrevId,
      });
    }

    if (dropPrevId) {
      await updateDoc(doc(db, ORDER_C, dropPrevId), {
        nextId: dragId,
      });
    }

    if (dropNextId) {
      await updateDoc(doc(db, ORDER_C, dropNextId), {
        prevId: dragId,
      });
    }

    await updateDoc(doc(db, ORDER_C, dragId), {
      prevId: dropPrevId,
      nextId: dropNextId,
    });
  };

  const deleteInterview = async (interviewId: string) => {
    const { prevId, nextId } = order[interviewId];

    if (head === interviewId) {
      await updateDoc(doc(db, USERS_C, uid), {
        head: nextId,
      });
    }

    if (head === interviewId) {
      await updateDoc(doc(db, USERS_C, uid), {
        tail: prevId,
      });
    }

    if (prevId) {
      await updateDoc(doc(db, ORDER_C, prevId), {
        nextId,
      });
    }

    if (nextId) {
      await updateDoc(doc(db, ORDER_C, nextId), {
        prevId,
      });
    }

    const USER_QUESTIONS_C = `users/${uid}/interviews/${interviewId}/user_questions`;

    const userQuestionsQuery = query(collection(db, USER_QUESTIONS_C));
    const userQuestionsSnap = await getDocs(userQuestionsQuery);
    userQuestionsSnap.forEach(async (userQuestionDoc) => {
      const EXAM_ORDER_C = `${USER_QUESTIONS_C}/${userQuestionDoc.id}/exam_order`;
      const examOrderQuery = query(collection(db, EXAM_ORDER_C));
      const examOrderSnap = await getDocs(examOrderQuery);
      examOrderSnap.forEach(async (examOrderDoc) => {
        await deleteDoc(doc(db, EXAM_ORDER_C, examOrderDoc.id));
      });

      const GROUP_ORDER_C = `${USER_QUESTIONS_C}/${userQuestionDoc.id}/groups_order`;
      const groupsOrderQuery = query(collection(db, GROUP_ORDER_C));
      const groupsOrderSnap = await getDocs(groupsOrderQuery);
      groupsOrderSnap.forEach(async (groupsOrderDoc) => {
        await deleteDoc(doc(db, GROUP_ORDER_C, groupsOrderDoc.id));
      });

      const GROUPS_C = `${USER_QUESTIONS_C}/${userQuestionDoc.id}/groups`;
      const groupQuery = query(collection(db, GROUPS_C));
      const groupsSnap = await getDocs(groupQuery);
      groupsSnap.forEach(async (groupsDoc) => {
        const QUESTIONS_ORDER_C = `${GROUPS_C}/groups/${groupsDoc.id}/questions_order`;

        const questionsQuery = query(collection(db, QUESTIONS_ORDER_C));
        const questionsSnap = await getDocs(questionsQuery);
        questionsSnap.forEach(async (questionDoc) => {
          await deleteDoc(doc(db, QUESTIONS_ORDER_C, questionDoc.id));
        });

        await deleteDoc(doc(db, GROUPS_C, groupsDoc.id));
      });

      const QUESTIONS_C = `${USER_QUESTIONS_C}/${userQuestionDoc.id}/questions`;
      const questionsQuery = query(collection(db, QUESTIONS_C));
      const questionsSnap = await getDocs(questionsQuery);
      questionsSnap.forEach(async (questionDoc) => {
        await deleteDoc(doc(db, 'questions', questionDoc.id));
        await deleteDoc(doc(db, QUESTIONS_C, questionDoc.id));
      });

      await deleteDoc(doc(db, USER_QUESTIONS_C, userQuestionDoc.id));
    });

    await deleteDoc(doc(db, INTERVIEWS_C, interviewId));
    await deleteDoc(doc(db, ORDER_C, interviewId));
  };

  return { getInterviews, addInterview, moveInterview, deleteInterview };
};

export default useInterviews;
