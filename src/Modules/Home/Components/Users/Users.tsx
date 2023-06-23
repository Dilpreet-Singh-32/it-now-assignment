import { FC, useState, useMemo } from 'react';
import { Header } from 'src/Modules/Core';

import './Users.css';
import { useAppSelector } from 'src/Redux';
import { InputControl } from 'src/Shared';

const Users: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const usersStore = useAppSelector((state) => state.users);
  const { users } = usersStore;

  const filteredUsers = useMemo(() => {
    if (!searchValue || searchValue === '') return users;

    return users.filter((x) =>
      x.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }, [searchValue, users.length]);

  return (
    <>
      <Header />

      <div className="search-box">
        <InputControl
          label="Search"
          value={searchValue}
          onChange={(value) => setSearchValue(value as string)}
        />
      </div>

      <table id="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>City</th>
            <th>PinCode</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((x) => (
            <tr key={x.id}>
              <td>{x.name}</td>
              <td>{x.email}</td>
              <td>{x.dob.toDateString()}</td>
              <td>{x.city}</td>
              <td>{x.pinCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
