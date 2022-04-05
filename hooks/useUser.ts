import { RootState } from './../store/index';

import { auth } from '../firebase';
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
        if (!user && !isLoginPage) window.location.href = '/login';
        if (user && isLoginPage) window.location.href = '/';
        return;
      }

      dispatch(setAccount(user));
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, isLoading };
};

export default useUser;
