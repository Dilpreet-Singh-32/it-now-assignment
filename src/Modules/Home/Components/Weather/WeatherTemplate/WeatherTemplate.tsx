import { FC } from 'react';
import moment from 'moment';

import './WeatherTemplate.css';
import { WeatherData } from 'src/Modules/Home/Interfaces';

interface Props {
  data: WeatherData;
}

const WeatherTemplate: FC<Props> = ({ data }) => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-md-4 col-sm-12 col-xs-12">
          <div className="card p-4">
            <div className="d-flex">
              <h6 className="flex-grow-1">{data.location.name}</h6>
              <h6>{moment(data.location.localtime).format('HH:MM')}</h6>
            </div>

            <div className="d-flex flex-column temp mt-5 mb-3">
              <h1 className="mb-0 font-weight-bold" id="heading">
                {' '}
                {data.current.temp_c}&deg; C{' '}
              </h1>
              <span className="small grey">{data.current.condition.text}</span>
            </div>

            <div className="d-flex">
              <div className="temp-details flex-grow-1">
                <p className="my-1">
                  <img src="https://i.imgur.com/B9kqOzp.png" height="17px" />

                  <span> {data.current.wind_kph} km/h </span>
                </p>

                <p className="my-1">
                  <i className="fa fa-tint mr-2" aria-hidden="true"></i>
                  <span> {data.current.humidity}% </span>
                </p>

                <p className="my-1">
                  <img src="https://i.imgur.com/wGSJ8C5.png" height="17px" />
                  <span> {data.forecast.forecastday[0].astro.sunset} </span>
                </p>
              </div>

              <div>
                <img src={data.current.condition.icon} width="100px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherTemplate;
