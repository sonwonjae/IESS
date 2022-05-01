import { RootState } from './../store/index';

import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setAccount, startLoading } from '../store/slices/accountSlice';

const useUser = ({
  requiredValidConfirm,
}: { requiredValidConfirm?: boolean } = {}) => {
  const { user, isLoading } = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && user) return;

    let isMounted = true;
    dispatch(startLoading());

    onAuthStateChanged(auth, (user) => {
      if (!isMounted) return;

      if (requiredValidConfirm) {
        const isLoginPage = window.location.pathname === '/login';
        console.log({ user, isLoginPage });
        if (!user && !isLoginPage) window.location.href = '/login';
        if (user && isLoginPage) window.location.href = '/';

        if (user) dispatch(setAccount(user));
        return;
      }

      dispatch(setAccount(user));
    });

    return () => {
      isMounted = false;
    };
  }, [isLoading]);

  return { user, isLoading };
};

export default useUser;
