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
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
       loginPending: (state) =>{
            state.isLoading = true
       },
       loginSuccess: (state) => {
           state.isLoading = false;
           state.isAuth = true;
           state.error = ''
       },
       loginFailure: (state, { payload }) => {
           state.isLoading = false;
           state.error = payload;
       }
    }
})

const { reducer, actions } = loginSlice;

export const { loginPending, loginSuccess, loginFailure } = actions;

export default reducer;