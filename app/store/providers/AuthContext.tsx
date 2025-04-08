/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import type { IUserEntity } from 'oneentry/dist/users/usersInterfaces';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

import { reDefine, useLazyGetMeQuery } from '@/app/api';
import { updateUserState } from '@/app/api/server/users/updateUserState';

import { useAppDispatch, useAppSelector } from '../hooks';
import { setCartVersion } from '../reducers/CartSlice';

type ContextProps = {
  isAuth: boolean;
  isLoading: boolean;
  userToken?: string;
  user?: IUserEntity;
  authenticate: () => void;
  refreshUser: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<ContextProps>({
  isAuth: false,
  isLoading: false,
  authenticate: () => {},
  refreshUser: () => {},
});

/**
 * Auth provider
 * @param children children ReactNode
 *
 * @returns AuthContext Provider
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUserEntity | undefined>();
  const [refetch, setRefetch] = useState<boolean>(false);
  const [refetchUser, setRefetchUser] = useState<boolean>(false);
  /**
   * Get user data from redux AppSelector
   */
  const cartVersion = useAppSelector((state) => state.cartReducer.version);
  const inCart = useAppSelector((state) => state.cartReducer);

  /**
   * Check user data loop
   */
  const [trigger, { isError }] = useLazyGetMeQuery({
    pollingInterval: isAuth ? 3000 : 0,
  });

  /**
   * Initialize authorization
   * @async
   */
  const onInit = async () => {
    const refresh = localStorage.getItem('refresh-token');

    if (!refresh) {
      setIsAuth(false);
      return;
    }
    await reDefine(refresh);
    await checkToken();
  };

  /**
   * Check refresh token
   * @async
   */
  const checkToken = async () => {
    trigger('en_US')
      .then(async (res) => {
        if ((res.isError && !res.isLoading) || !res.data?.id) {
          localStorage.setItem('refresh-token', '');
          setIsAuth(false);
        } else {
          setUser(res.data);
          setIsAuth(true);
        }
      })
      .catch(async () => {
        localStorage.setItem('refresh-token', '');
        setIsAuth(false);
      });
  };

  /**
   * Update user state on server
   * @async
   */
  const updateUser = async () => {
    await updateUserState({
      cart: inCart,
      user: user,
    });
  };

  // Update user data on auth
  useEffect(() => {
    if (!isAuth) {
      return;
    }
    updateUser();
  }, [isAuth, inCart]);

  // Load cart from user state
  useEffect(() => {
    if (!user?.state.cart || cartVersion > 0) {
      return;
    }
    // user.state.cart?.forEach((product: any) => {
    //   dispatch(addServiceToCart(product));
    // });
    dispatch(setCartVersion(1));
  }, [isAuth, user]);

  // Refetch
  useEffect(() => {
    setIsLoading(true);
    onInit().then(() => {
      setIsLoading(false);
    });
  }, [refetch]);

  // Refetch if error and has refresh-token
  useEffect(() => {
    const refresh = localStorage.getItem('refresh-token');
    if (isError && refresh) {
      setRefetch(true);
      localStorage.setItem('refresh-token', '');
      setIsAuth(false);
    }
  }, [isError]);

  // Check token on refetch
  useEffect(() => {
    if (isAuth) {
      checkToken();
    }
  }, [refetch, refetchUser]);

  const value = {
    isAuth,
    isLoading,
    user,
    authenticate: () => setRefetch(!refetch),
    refreshUser: () => setRefetchUser(!refetchUser),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
