import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Header.css';
import { logOut, useAppDispatch } from 'src/Redux';

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = (): void => {
    dispatch(logOut());
    navigate('/auth/sign-in');
  };

  return (
    <header className="header">
      <ul>
        <li>
          <Link to="/">Users</Link>
        </li>
        <li>
          <Link to="/weather">Weather</Link>
        </li>
      </ul>

      <button className="btn btn-danger" onClick={logout}>
        Log Out
      </button>
    </header>
  );
};

export default Header;
