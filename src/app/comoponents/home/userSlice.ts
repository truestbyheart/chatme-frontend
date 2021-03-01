import { createSlice } from '@reduxjs/toolkit';

interface IUsers {
    users: string[];
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
            state.users = [...state.users, ...payload];
        },
        failedToGetUsers: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    }
});

const { reducer, actions } = userSlice;

export const { gettingUsers, retrivedUsers, failedToGetUsers } = actions;

export default reducer;
