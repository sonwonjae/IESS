// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../firebase.js';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  Query,
  getDoc,
  doc,
  startAt,
} from 'firebase/firestore';

const makeQueryConstraints = async ({
  searchKeyword,
  nextQuestionId = '',
}: {
  searchKeyword: string;
  nextQuestionId?: string;
}) => {
  const basicQueryConstraints = [
    where('isPrivate', '==', false),
    orderBy('created_by', 'desc'),
  ];
  if (searchKeyword) {
    basicQueryConstraints.push(
      where(
        'searchKeyword',
        'array-contains-any',
        (searchKeyword as string).split(' ')
      )
    );
  }

  if (nextQuestionId) {
    console.log('여기 왔니?');
    const lastVisible = await getDoc(doc(db, 'questions', nextQuestionId));
    basicQueryConstraints.push(startAt(lastVisible));
  }
  basicQueryConstraints.push(limit(11));

  return basicQueryConstraints;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    questions: Partial<Questions>;
    nextQuestionId: string;
  }>
) {
  let resQuestions: Partial<Questions> = {};
  let resNextQuestionId: string = '';
  let { method } = req;

  const searchKeyword = req.query.searchKeyword as string;
  const nextQuestionId = (req.query.nextQuestionId as string) || '';
  const collectionURL = `questions`;

  const getQuestionDocsByQuery = async (query: Query<DocumentData>) => {
    let index = 0;
    const documentSnapshots = await getDocs(query);
    documentSnapshots.forEach((doc) => {
      if (index < 10) {
        resQuestions[doc.id] = doc.data() as Question;
      }
      index++;
    });

    if (documentSnapshots.docs[10]) {
      resNextQuestionId = documentSnapshots.docs[10].id;
    } else {
      resNextQuestionId = '';
    }

    res.statusCode = 200;
  };

  switch (method) {
    case 'GET':
      await getQuestionDocsByQuery(
        query(
          collection(db, collectionURL),
          ...(await makeQueryConstraints({ searchKeyword, nextQuestionId }))
        )
      );
      break;
    case 'POST':
      break;
    default:
      break;
  }
  res.json({ questions: resQuestions, nextQuestionId: resNextQuestionId });
}
