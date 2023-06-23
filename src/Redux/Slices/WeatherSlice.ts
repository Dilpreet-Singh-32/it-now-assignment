import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WeatherData } from 'src/Modules/Home';

export interface WeatherStoreState {
  isLoading: boolean;
  data?: WeatherData;
}

const initialState: WeatherStoreState = {
  isLoading: false,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeather: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<WeatherData>) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchWeatherFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchWeather, fetchWeatherSuccess, fetchWeatherFailed } =
  weatherSlice.actions;
