import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from './comoponents/login/login.slice';
import messageReducer from './comoponents/home/messageSlice';
import userReducer from './comoponents/home/userSlice';
import SignUpReducer from './comoponents/Signup/signup.slice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    message: messageReducer,
    users: userReducer,
    signup: SignUpReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
