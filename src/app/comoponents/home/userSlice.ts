import { createSlice } from '@reduxjs/toolkit';
import { IUserDetails } from '../../../helper/rest.api';

interface IUsers {
    users: IUserDetails[];
    isLoading: boolean;
    error: string;
}

const initialState: IUsers = {
    users: [],
    isLoading: false,
    error: ''
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        gettingUsers: (state) => {
            state.isLoading = true;
        },
        retrivedUsers: (state, { payload }) => {
            state.isLoading = false;
            state.users = [ ...payload];
        },
        newUser: (state, { payload }) => {
            state.isLoading = false;
            state.users.push(payload);
        },
        failedToGetUsers: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    }
});

const { reducer, actions } = userSlice;

export const { gettingUsers, retrivedUsers, failedToGetUsers, newUser } = actions;

export default reducer;
