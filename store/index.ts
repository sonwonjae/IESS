import { configureStore, Store } from '@reduxjs/toolkit';
import { Context, createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';

import { Account } from './slices/accountSlice';

import reducer from './slices';

const makeStore = (context: Context) =>
  configureStore({
    reducer,
    middleware: [logger],
    devTools: process.env.NODE_ENV !== 'production',
  });

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});

export type RootState = {
  account: Account;
};
