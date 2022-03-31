import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { app, auth, createUserWithEmailAndPassword } from '../src/firebase';

const Home: NextPage = () => {
  return (
    <Link href="/interview-list">
      <a>면접 연습하기</a>
    </Link>
  );
};

export default Home;
