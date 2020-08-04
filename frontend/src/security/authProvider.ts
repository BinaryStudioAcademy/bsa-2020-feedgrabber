import { createTokenProvider } from './tokenProvider';
import { useEffect, useState } from 'react';

const createAuthProvider = () => {
  const tokenProvider = createTokenProvider();

  const login = newTokens => tokenProvider.setToken(newTokens);

  const logout = () => tokenProvider.setToken(null);

  const useAuth = () => {
    const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

    useEffect(() => {
      const listener = (newIsLogged: boolean) => setIsLogged(newIsLogged);

      tokenProvider.subscribe(listener);

      return () => tokenProvider.unsubscribe(listener);
    }, []);

    return isLogged;
  };

  return { useAuth, login, logout };
};

export const { useAuth, login, logout } = createAuthProvider();
