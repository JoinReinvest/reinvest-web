import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

import { URL } from '../constants/urls';

const Logout: NextPage = () => {
  useEffect(() => {
    signOut({
      callbackUrl: URL.login,
    });
  });

  return <></>;
};

export default Logout;
