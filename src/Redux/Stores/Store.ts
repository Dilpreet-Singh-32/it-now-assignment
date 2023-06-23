import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { authSlice, usersSlice } from '../Slices';
import { weatherSlice } from '../Slices/WeatherSlice';
import { weatherSaga } from '../Sagas';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    weather: weatherSlice.reducer,
  },
  middleware: [saga],
});

saga.run(weatherSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
