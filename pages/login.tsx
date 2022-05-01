import { useState, FormEventHandler, ChangeEvent, FormEvent } from 'react';

import { auth } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';

import useUser from '../hooks/useUser';

import Logo from '../components/Common/Logo/Logo';
import {
  LoginContainer,
  LoginTitleWrapper,
  LoginTitle,
  LoginInput,
  LoginButton,
  LoginGuideWrapper,
} from '../components/Login/Login.styled';

import { getInputValidityMessage } from '../utils/getInputValidityMessage';

const provider = new GoogleAuthProvider();

const Login = () => {
  useUser({ requiredValidConfirm: true });

  const [hasAccount, setHasAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleHasAccount = () => {
    setHasAccount(!hasAccount);
  };

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const noticeInvalidMessage = (e: FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    input.setCustomValidity(getInputValidityMessage(input.validity) || '');
  };

  const loginWithSocial = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        alert('존재하지 않는 회원입니다.');
      });
  };

  const loginWithEmailAndPassword: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.log({ error });
        alert('존재하지 않는 회원입니다.');
      });
  };

  const signupWithEmailAndPassword: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, {
          displayName: name,
        });

        alert('가입에 성공하셨습니다.');
        window.location.href = '/';
      })
      .catch((error) => {
        console.log({ error });
        alert('이미 존재하는 이메일 입니다.');
      });
  };

  return (
    <LoginContainer>
      <Logo />
      <form
        onSubmit={
          hasAccount ? loginWithEmailAndPassword : signupWithEmailAndPassword
        }
      >
        <LoginTitleWrapper>
          <LoginTitle>
            {hasAccount ? '이메일로 로그인' : '이메일로 회원가입'}
          </LoginTitle>
        </LoginTitleWrapper>
        <LoginInput
          required
          type="email"
          placeholder="이메일을 입력하세요."
          onChange={changeEmail}
        />
        <LoginInput
          required
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          type="password"
          placeholder="패스워드를 입력하세요."
          onChange={changePassword}
          onInvalid={noticeInvalidMessage}
        />
        {!hasAccount && (
          <LoginInput
            required
            type="text"
            pattern="^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$"
            placeholder="이름을 입력해주세요."
            onChange={changeName}
          />
        )}
        <LoginButton type="submit">
          {hasAccount ? '로그인' : '회원가입'}
        </LoginButton>
      </form>
      <LoginGuideWrapper>
        <span>{hasAccount ? '회원이 아니신가요?' : '계정이 있으신가요?'}</span>
        <button type="button" onClick={handleHasAccount}>
          {hasAccount ? '회원가입' : '로그인'}
        </button>
      </LoginGuideWrapper>
      <LoginTitleWrapper>
        <LoginTitle>소셜 계정으로 로그인</LoginTitle>
      </LoginTitleWrapper>
      <LoginButton onClick={loginWithSocial}>Continue with Google</LoginButton>
    </LoginContainer>
  );
};

export default Login;
