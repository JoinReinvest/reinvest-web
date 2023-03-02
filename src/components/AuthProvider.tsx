import { Auth, CognitoUser } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

interface AuthContextInterface {
  actions: {
    signin: (email: string, password: string) => Promise<CognitoUser | Error | null>;
  };
  loading: boolean;
  user: CognitoUser | null;
}

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  loading: true,
  actions: {
    signin: async () => {
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

  const signin = async (email: string, password: string): Promise<CognitoUser | Error> => {
    try {
      const user = await Auth.signIn(email, password);
      setUser(user);
      router.push('/');

      return user;
    } catch (error) {
      return error as Error;
    }
  };

  const ctx = useMemo(() => {
    return { loading, user, actions: { signin } };
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
