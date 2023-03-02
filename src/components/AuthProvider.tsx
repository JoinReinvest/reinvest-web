import { createContext, ReactNode, useContext } from 'react';
import { Profile } from 'types/graphql';

interface AuthContext {
  user: Profile;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const AuthContext = createContext<AuthContext>({ user: {} });

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return <AuthContext.Provider value={{ user: {} }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
