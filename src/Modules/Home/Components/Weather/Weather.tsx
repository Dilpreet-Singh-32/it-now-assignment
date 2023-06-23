import { FC, useEffect, useState } from 'react';

import './Weather.css';
import { Header } from 'src/Modules/Core';
import { useAppDispatch, useAppSelector } from 'src/Redux';
import { WeatherTemplate } from './WeatherTemplate';
import { InputControl } from 'src/Shared';

const Weather: FC = () => {
  const dispatch = useAppDispatch();
  const [cityName, setCityName] = useState<string>('');
  const weatherStore = useAppSelector((state) => state.weather);
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationCoordinates>();

  useEffect(() => {
    getCurrentPositionAndShowWeather();
  }, []);

  const loadWeather = (query: string): void => {
    dispatch({
      type: 'weather/fetchWeather',
      payload: query,
    });
  };

  const getCurrentPositionAndShowWeather = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          loadWeather(
            `${position.coords.latitude},${position.coords.longitude}`
          );
          setCurrentLocation(position.coords);
        },
        (error) => {
          alert(error.message);
        }
      );
    }
  };

  const onClickSearch = (): void => {
    let query = '';

    if (cityName && cityName !== '') {
      query = cityName;
    } else {
      query = `${currentLocation?.latitude},${currentLocation?.longitude}`;
    }

    loadWeather(query);
  };

  return (
    <div>
      <Header />

      <div className="search-bar">
        <InputControl
          label="City"
          value={cityName}
          onChange={(value) => setCityName(value as string)}
        />

        <button className="btn btn-primary" onClick={onClickSearch}>
          Search
        </button>
      </div>

      {!weatherStore.isLoading && weatherStore.data && (
        <WeatherTemplate data={weatherStore.data} />
      )}
    </div>
  );
};

export default Weather;
