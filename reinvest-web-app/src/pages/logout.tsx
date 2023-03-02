import { Auth } from '@aws-amplify/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Logout: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    const signOut = async () => {
      try {
        await Auth.signOut();
      } finally {
        router.push('/login');
      }
    };
    signOut();
  });

  return <></>;
};

export default Logout;
