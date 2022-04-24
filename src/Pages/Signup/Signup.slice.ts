import { createSlice } from '@reduxjs/toolkit';

interface ILogin {
  isLoading: boolean;
  isAuth: boolean;
  error: string | any;
}

const initialState: ILogin = {
  isLoading: false,
  isAuth: false,
  error: ''
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    signUpPending: (state) => {
      state.isLoading = true;
    },
    signUpSuccess: (state) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = '';
    },
    signUpFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    }
  }
});

const { reducer, actions } = loginSlice;

export const { signUpPending, signUpSuccess, signUpFailure } = actions;

export default reducer;
