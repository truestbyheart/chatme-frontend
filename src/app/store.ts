import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from './comoponents/login/login.slice';
import messageReducer from './comoponents/home/messageSlice';
import userReducer from './comoponents/home/userSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    message: messageReducer,
    users: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
