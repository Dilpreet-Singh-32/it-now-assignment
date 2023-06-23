import { FC } from 'react';
import { Routes, Route } from 'react-router';

import { Users, Weather } from './Modules/Home';
import { SignIn, SignUp } from './Modules/Auth';
import { Authorized, UnAuthorized } from './Modules/Core';

const App: FC = () => (
  <Routes>
    <Route path="auth/*" element={<UnAuthorized />}>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
    </Route>

    <Route path="/*" element={<Authorized />}>
      <Route path="" element={<Users />} />
      <Route path="weather" element={<Weather />} />
    </Route>
  </Routes>
);

export default App;
