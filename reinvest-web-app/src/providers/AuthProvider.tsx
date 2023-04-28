import { Auth, CognitoUser } from '@aws-amplify/auth';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../services/getApiClient';

export enum ChallengeName {
  SMS_MFA = 'SMS_MFA',
}

interface AuthContextInterface {
  actions: {
    confirmSignIn: (authenticationCode: string, user: CognitoUser) => Promise<CognitoUser | Error | null>;
    signIn: (email: string, password: string, redirectTo?: string) => Promise<CognitoUser | Error | null>;
    signOut: () => Promise<void>;
  };
  loading: boolean;
  user: CognitoUser | null;
}

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  loading: true,
  actions: {
    signIn: async () => {
      return null;
    },
    confirmSignIn: async () => {
      return null;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    signOut: async () => {},
  },
});

interface AuthProviderProps {
  children: ReactNode;
  isProtectedPage: boolean;
}

export const AuthProvider = ({ children, isProtectedPage }: AuthProviderProps) => {
  const notProtectedUrls = [URL.login, URL.register, URL.forgot_password, URL.not_found, URL.internal_server_error];
  const pathWithoutQuery = [URL.logout, ...notProtectedUrls];
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<CognitoUser | null>(null);
  const { data, isSuccess, isLoading, refetch, isRefetching } = useGetUserProfile(getApiClient);

  const signIn = async (email: string, password: string): Promise<CognitoUser | Error> => {
    try {
      setLoading(true);

      const user: CognitoUser = await Auth.signIn(email, password);

      if (user.challengeName !== ChallengeName.SMS_MFA) {
        setUser(user);

        await refetch();
      }

      return user;
    } catch (error) {
      return error as Error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmSignIn = async (authenticationCode: string, user: CognitoUser) => {
    const confirmedUser: CognitoUser = await Auth.confirmSignIn(user, authenticationCode, ChallengeName.SMS_MFA);

    setUser(confirmedUser);

    await refetch();

    return confirmedUser;
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } finally {
      router.push(URL.login);
    }
  };
  const ctx = useMemo(() => {
    return { user, loading, actions: { signIn, confirmSignIn, signOut } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user]);

  useEffect(() => {
    if (isSuccess && data && !isRefetching) {
      if (data.accounts?.length === 0) {
        router.push(URL.onboarding);
      } else {
        const query = router.query;
        const { redirectUrl } = query;

        if (redirectUrl) {
          router.push(redirectUrl as string);
        } else {
          if (notProtectedUrls.includes(router.pathname)) {
            router.push(URL.index);
          }

          router.push(router.pathname || URL.index);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isRefetching, isSuccess]);

  useEffect(() => {
    const currentUser = async () => {
      try {
        await Auth.currentSession();

        const user: CognitoUser = await Auth.currentAuthenticatedUser();

        setLoading(false);
        setUser(user);
      } catch (err) {
        setLoading(false);
        setUser(null);

        if (pathWithoutQuery.includes(router.pathname)) {
          return router.push(router.asPath);
        }

        return router.push({ pathname: URL.login, query: { redirectUrl: router.pathname } });
      }

      return null;
    };

    currentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    ((isProtectedPage && !user) || (!isProtectedPage && user) || isLoading || (isRefetching && !data)) &&
    router.pathname !== URL.logout &&
    router.pathname !== URL.onboarding &&
    router.pathname !== URL.not_found
  ) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <IconSpinner />
      </div>
    );
  }

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
