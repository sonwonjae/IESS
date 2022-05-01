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
  where,
  getDocs,
  deleteField,
} from 'firebase/firestore';

import { v5 } from 'uuid';

const makeKeywordsArray = (searchKeyword: string) => {
  const answer = new Set();

  for (const keyword of new Set(searchKeyword.split(' '))) {
    const keywordArray = keyword.split('');

    let wordLength = 2;

    while (wordLength <= keywordArray.length && wordLength <= 10) {
      for (let i = wordLength - 1; i < keywordArray.length; i++) {
        let word = '';

        for (let j = i; j > i - wordLength; j--) {
          word = keywordArray[j] + word;
        }

        answer.add(word);
      }

      wordLength++;
    }
  }

  return [...answer];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<UserQuestions>>
) {
  let responseBody: Partial<UserQuestions> = {};

  let { body, method } = req;
  const [uid, interviewId] = req.query.ids as string[];

  const collectionURL = `users/${uid}/questions`;
  const docRef = doc(db, collectionURL, interviewId);

  const getQuestionDocsInQuestionsCollection = async () => {
    const docSnap = await getDoc(docRef);

    responseBody = docSnap.exists() ? docSnap.data() : {};
    res.statusCode = 200;
  };

  switch (method) {
    case 'GET':
      await getQuestionDocsInQuestionsCollection();
      break;
    case 'POST':
      const questionId = v5(
        uid + interviewId + new Date().toISOString(),
        v5.URL
      );
      const userQuestion: UserQuestion = body;

      await setDoc(
        doc(db, collectionURL, interviewId),
        {
          [questionId]: userQuestion,
        },
        { merge: true }
      );

      await setDoc(
        doc(db, 'questions', questionId),
        {
          question: userQuestion.question,
          like: 0,
          write_by: uid,
          isPrivate: userQuestion.isPrivate,
          created_by: userQuestion.created_by,
          searchKeyword: makeKeywordsArray(userQuestion.question),
          liked_users: {},
        },
        { merge: true }
      );

      await getQuestionDocsInQuestionsCollection();
      break;
    case 'DELETE':
      const deleteQuestionId: string = body;
      await updateDoc(doc(db, collectionURL, interviewId), {
        [deleteQuestionId]: deleteField(),
      });
      await deleteDoc(doc(db, 'questions', deleteQuestionId));

      await getQuestionDocsInQuestionsCollection();
      break;
    default:
      break;
  }
  res.json(responseBody);
}
