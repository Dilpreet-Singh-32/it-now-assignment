import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Users, Weather } from './Components';

const Home: FC = () => {
  return (
    <>
      <section>
        <Routes>
          <Route path="users" element={<Users />} />
          <Route path="weather" element={<Weather />} />
        </Routes>
      </section>
    </>
  );
};

export default Home;
