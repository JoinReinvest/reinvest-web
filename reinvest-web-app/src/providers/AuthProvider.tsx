import { Auth, CognitoUser as PrimitiveCognitoUser } from '@aws-amplify/auth';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../services/getApiClient';
import { BannedView } from '../views/BannedView';

export enum ChallengeName {
  SMS_MFA = 'SMS_MFA',
}

interface CognitoUserAttributes {
  email: string;
}
interface CognitoUser extends PrimitiveCognitoUser {
  attributes?: CognitoUserAttributes;
}

interface AuthContextInterface {
  actions: {
    changeEmail: (newEmail: string) => Promise<string | Error | null>;
    changePassword: (oldPassword: string, newPassword: string) => Promise<string | Error | null>;
    confirmSignIn: (authenticationCode: string, user: CognitoUser) => Promise<CognitoUser | Error | null>;
    signIn: (email: string, password: string, redirectTo?: string) => Promise<CognitoUser | Error | null>;
    signOut: () => Promise<void>;
    verifyEmail: (authenticationCode: string, email: string) => Promise<string | Error | null>;
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changePassword: async () => {
      return null;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeEmail: async () => {
      return null;
    },
    verifyEmail: async () => {
      return null;
    },
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
  const { data, isSuccess, isLoading, refetch, isRefetching, error } = useGetUserProfile(getApiClient);

  const isBannedProfile = error instanceof Error && (error.message.includes('Profile is banned') || error.name === 'Profile is banned');

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

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      return Auth.changePassword(user, oldPassword, newPassword);
    } catch (error) {
      return error as Error;
    }
  };

  const changeEmail = async (newEmail: string) => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();

      return Auth.updateUserAttributes(currentUser, {
        email: newEmail,
      });
    } catch (error) {
      return error as Error;
    }
  };

  const verifyEmail = async (authenticationCode: string) => {
    try {
      await Auth.verifyCurrentUserAttributeSubmit('email', authenticationCode);

      return 'SUCCESS';
    } catch (error) {
      return error as Error;
    }
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
    return { user, loading, actions: { signIn, confirmSignIn, signOut, changePassword, changeEmail, verifyEmail } };
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
          if ((notProtectedUrls.includes(router.pathname) && router.pathname !== URL.login) || (router.pathname === URL.login && user)) {
            router.push(router.pathname === URL.login ? URL.index : router.asPath);
          } else {
            router.push(router.asPath);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isRefetching, isSuccess]);

  useEffect(() => {
    const currentUser = async () => {
      try {
        await Auth.currentSession();

        const user = await Auth.currentAuthenticatedUser();

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
    ((isProtectedPage && !user) || (!isProtectedPage && user) || isLoading || isRefetching) &&
    router.pathname !== URL.logout &&
    router.pathname !== URL.onboarding &&
    router.pathname !== URL.not_found &&
    router.pathname !== URL.login
  ) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <IconSpinner />
      </div>
    );
  }

  return isBannedProfile ? (
    <BannedView
      isOpen
      title="Your profile has been locked."
    />
  ) : (
    <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
