import { Auth, CognitoUser } from '@aws-amplify/auth';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export enum ChallengeName {
  SMS_MFA = 'SMS_MFA',
}

interface AuthContextInterface {
  actions: {
    confirmSignIn: (authenticationCode: string) => Promise<CognitoUser | Error | null>;
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
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<CognitoUser | null>(null);

  const signIn = async (email: string, password: string, redirectTo?: string): Promise<CognitoUser | Error> => {
    try {
      setLoading(true);
      const user: CognitoUser = await Auth.signIn(email, password);

      if (user.challengeName !== ChallengeName.SMS_MFA) {
        router.push(redirectTo || URL.index);
      }

      setUser(user);

      return user;
    } catch (error) {
      return error as Error;
    } finally {
      setLoading(false);
    }
  };

  const confirmSignIn = async (authenticationCode: string) => {
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
    const currentUser = async () => {
      const notProtectedUrls = [URL.login, URL.register, URL.forgot_password, '/404', '/500', '/onboarding'];
      const pathWithoutQuery = [URL.logout, ...notProtectedUrls];

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
          return router.push(router.pathname);
        }

        return router.push({ pathname: URL.login, query: { redirectUrl: router.pathname } });
      }

      return null;
    };

    currentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if ((isProtectedPage && !user) || (!isProtectedPage && user)) {
    return <IconSpinner />;
  }

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
