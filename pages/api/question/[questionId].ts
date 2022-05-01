// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  increment,
  where,
  getDocs,
  deleteField,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

import { v5 } from 'uuid';

let lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Question>>
) {
  let responseBody: Partial<Question> = {};
  let {
    body,
    method,
    query: { questionId },
  } = req;

  const docRef = doc(db, 'questions', questionId as string);

  const getQuestionDocInQuestionsCollection = async () => {
    const docSnap = await getDoc(docRef);

    responseBody = docSnap.exists() ? docSnap.data() : {};
    res.statusCode = 200;
  };

  switch (method) {
    case 'GET':
      // await getQuestionDocInQuestionsCollection();
      break;
    case 'PATCH':
      const { isLike, uid }: Questions = body;
      const newLiked_User = `liked_users.${uid}`;

      // console.log({ isLike, uid });

      await updateDoc(docRef, {
        like: increment(isLike ? -1 : 1),
        [newLiked_User]: !isLike,
      });

      // await getQuestionDocInQuestionsCollection();
      break;
    default:
      break;
  }
  res.json(responseBody);
}
