import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { chatmeApi } from './Helpers/rest.api';

export const store = configureStore({
  reducer: {
    [chatmeApi.reducerPath]: chatmeApi.reducer
  },
  // eslint-disable-next-line @typescript-eslint/no-shadow
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatmeApi.middleware)
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
