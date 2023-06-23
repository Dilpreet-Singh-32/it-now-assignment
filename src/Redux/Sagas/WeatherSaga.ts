import { call, takeEvery, put } from 'redux-saga/effects';
import { fetchWeatherSuccess } from '../Slices/WeatherSlice';
import { WeatherData } from 'src/Modules/Home';

function* fetchWeather(action: any) {
  const response: Response = yield call(() =>
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_APP_API_KEY}&q=${action.payload}`
    )
  );

  const weather: WeatherData = yield response.json();
  yield put(fetchWeatherSuccess(weather));
}

export function* weatherSaga() {
  yield takeEvery('weather/fetchWeather', fetchWeather);
}
