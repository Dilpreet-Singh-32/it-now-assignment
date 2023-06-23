import { FC, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { useAppSelector } from 'src/Redux';
import { PageLoader, localStorageKeys } from 'src/Shared';

const Authorized: FC = () => {
  const navigate = useNavigate();
  const authStore = useAppSelector((state) => state.auth);
  const usersStore = useAppSelector((state) => state.users);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (authStore.isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const savedUserId = localStorage.getItem(localStorageKeys.authUserId);

    if (
      savedUserId &&
      savedUserId !== '' &&
      usersStore.users.find((x) => x.id === Number(savedUserId))
    ) {
      setIsLoading(false);
      return;
    }

    navigate('/auth/sign-in');
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return <Outlet />;
};

export default Authorized;
