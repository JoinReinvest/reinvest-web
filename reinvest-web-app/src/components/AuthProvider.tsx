import { Auth, CognitoUser } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export enum ChallengeName {
  SMS_MFA = 'SMS_MFA',
}

interface AuthContextInterface {
  actions: {
    confirmSignIn: (authenticationCode: string) => Promise<CognitoUser | Error | null>;
    signIn: (email: string, password: string) => Promise<CognitoUser | Error | null>;
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
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<CognitoUser | null>(null);

  const signIn = async (email: string, password: string): Promise<CognitoUser | Error> => {
    try {
      const user: CognitoUser = await Auth.signIn(email, password);

      if (user.challengeName !== ChallengeName.SMS_MFA) {
        router.push('/');
      }

      setUser(user);

      return user;
    } catch (error) {
      return error as Error;
    }
  };

  const confirmSignIn = async (authenticationCode: string) => {
    const confirmedUser: CognitoUser = await Auth.confirmSignIn(user, authenticationCode, ChallengeName.SMS_MFA);

    setUser(confirmedUser);
    router.push('/');

    return confirmedUser;
  };

  const ctx = useMemo(() => {
    return { loading, user, actions: { signIn, confirmSignIn } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user]);

  useEffect(() => {
    const currentUser = async () => {
      try {
        const user: CognitoUser = await Auth.currentAuthenticatedUser();
        setLoading(false);
        setUser(user);
      } catch (err) {
        setLoading(false);
        setUser(null);
      }
    };
    currentUser();
  }, []);

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
