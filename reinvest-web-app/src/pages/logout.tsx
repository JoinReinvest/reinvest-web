import { NextPage } from 'next';
import { useAuth } from 'providers/AuthProvider';
import { useEffect } from 'react';

const Logout: NextPage = () => {
  const { actions } = useAuth();

  useEffect(() => {
    actions.signOut();
  });

  return <></>;
};

export default Logout;
