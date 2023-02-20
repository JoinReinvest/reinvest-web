import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export const useCheckAuthorization = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push({
      pathname: '/login',
    });
  }
};
