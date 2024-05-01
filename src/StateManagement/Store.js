import { rootReducer } from './Reducers';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: rootReducer
  });

