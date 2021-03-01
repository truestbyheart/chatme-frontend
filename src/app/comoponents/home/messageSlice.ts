import { createSlice } from '@reduxjs/toolkit';
import { IMessageStructure } from '../../../helper/rest.api';

interface IMessages {
    messages: IMessageStructure[];
    from: string;
    to: string;
    isLoading: boolean;
    error: string;
}

const initialState: IMessages = {
    messages: [],
    from: '',
    to: '',
    isLoading: false,
    error: ''
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        gettingMessages: (state) => {
            state.isLoading = true;
        },
        retrivedMessages: (state, { payload }) => {
            state.isLoading = false;
            state.messages = [...state.messages, ...payload];
        },
        receivedMessage:(state, {payload}) => {
            state.isLoading = false;
            state.messages.push(payload);
        },
        failedToGetMessages: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    }
});

const { reducer, actions } = messageSlice;

export const { gettingMessages, retrivedMessages, receivedMessage, failedToGetMessages } = actions;

export default reducer;
