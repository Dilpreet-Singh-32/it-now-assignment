import { FC, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { PageLoader, localStorageKeys } from 'src/Shared';
import { useAppSelector } from 'src/Redux';

const UnAuthorized: FC = () => {
  const navigate = useNavigate();
  const authStore = useAppSelector((state) => state.auth);
  const usersStore = useAppSelector((state) => state.users);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (authStore.isAuthenticated) {
      navigate('/home');
      return;
    }

    const savedUserId = localStorage.getItem(localStorageKeys.authUserId);

    if (
      savedUserId &&
      savedUserId !== '' &&
      usersStore.users.find((x) => x.id === Number(savedUserId))
    ) {
      navigate('/home');
      return;
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return <Outlet />;
};

export default UnAuthorized;
