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
  const { data, isSuccess, isLoading, refetch } = useGetUserProfile(getApiClient);

  const signIn = async (email: string, password: string, redirectTo?: string): Promise<CognitoUser | Error> => {
    try {
      setLoading(true);
      const user: CognitoUser = await Auth.signIn(email, password);

      if (user.challengeName !== ChallengeName.SMS_MFA) {
        setUser(user);
        router.push(redirectTo || URL.index);
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
  }, []);

  const confirmSignIn = async (authenticationCode: string, user: CognitoUser) => {
    const confirmedUser: CognitoUser = await Auth.confirmSignIn(user, authenticationCode, ChallengeName.SMS_MFA);

    setUser(confirmedUser);

    router.push(URL.index);

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
    if (isSuccess && data && !notProtectedUrls.includes(router.pathname) && (!data.isCompleted || data.accounts?.length === 0)) {
      router.push(URL.onboarding);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const currentUser = async () => {
      try {
        await Auth.currentSession();

        const user: CognitoUser = await Auth.currentAuthenticatedUser();

        setLoading(false);
        setUser(user);

        if (user && notProtectedUrls.includes(router.pathname)) {
          return router.push(URL.index);
        }
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

  if (((isProtectedPage && !user) || (!isProtectedPage && user) || isLoading) && router.pathname !== URL.logout) {
    return <IconSpinner />;
  }

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
