import { Auth } from '@aws-amplify/auth';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { URL } from '../constants/urls';

const Logout: NextPage = () => {
  useEffect(() => {
    const signOut = async () => {
      try {
        await Auth.signOut();
      } finally {
        redirect(URL.login);
      }
    };

    signOut();
  });

  return <></>;
};

export default Logout;
