/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IAuthProvidersEntity } from 'oneentry/dist/auth-provider/authProvidersInterfaces';
import type { IError } from 'oneentry/dist/base/utils';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { IFormsEntity } from 'oneentry/dist/forms/formsInterfaces';
import type {
  IBaseOrdersEntity,
  IOrderByMarkerEntity,
  IOrdersEntity,
} from 'oneentry/dist/orders/ordersInterfaces';
import type {
  IPagesEntity,
  IPositionBlock,
} from 'oneentry/dist/pages/pagesInterfaces';
import type {
  IAccountsEntity,
  ISessionEntity,
} from 'oneentry/dist/payments/paymentsInterfaces';
import type {
  IProductEntity,
  IProductsResponse,
} from 'oneentry/dist/products/productsInterfaces';
import type { IUserEntity } from 'oneentry/dist/users/usersInterfaces';

import { typeError } from '@/components/utils';

import { updateUserState } from '../server/users/updateUserState';
import { api } from './api';

interface BlockByMarkerProps {
  marker: string;
}

interface BlocksByPageUrlProps {
  pageUrl: string;
}

interface SingleOrderProps {
  marker: string;
  id: number;
  body: any;
}

export const RTKApi = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  keepUnusedDataFor: 300, // 5 минут по умолчанию
  tagTypes: [
    'Products',
    'Pages',
    'Blocks',
    'Forms',
    'Orders',
    'User',
    'Accounts',
    'Sessions',
  ],
  endpoints: (build) => ({
    /**
     * Get all blocks by page url.
     * @property {string} pageUrl - Marker of Block.
     */
    getBlocksByPageUrl: build.query<IPositionBlock[], BlocksByPageUrlProps>({
      queryFn: async ({ pageUrl }) => {
        const result = await api.Pages.getBlocksByPageUrl(pageUrl);
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IPositionBlock[] };
      },
      providesTags: ['Blocks'],
      keepUnusedDataFor: 600, // 10 минут для блоков
    }),
    /**
     * Get Products with filter
     * @property {IProductEntity[]} item - IProductEntity.
     */
    getProducts: build.query<IProductsResponse, { body: [] }>({
      queryFn: async ({ body }) => {
        const result = await api.Products.getProducts(body);
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IProductsResponse };
      },
      providesTags: ['Products'],
      keepUnusedDataFor: 300, // 5 минут для продуктов
    }),
    /**
     * Get Products By PageUrl
     * @property {IProductEntity[]} item - IProductEntity.
     */
    getProductsByPageUrl: build.query<IProductsResponse, { url: string }>({
      queryFn: async ({ url }) => {
        if (!url) {
          return { error: null };
        }
        const result = await api.Products.getProductsByPageUrl(url);
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IProductsResponse };
      },
      providesTags: ['Products'],
      keepUnusedDataFor: 300, // 5 минут для продуктов по URL
    }),
    /**
     * Get Products By Ids.
     * @property {IProductEntity[]} items - Array of IProductEntity.
     */
    getProductsByIds: build.query<IProductEntity[], { items: number[] }>({
      queryFn: async ({ items }) => {
        const getProductsByIds = async (ids: number[]) => {
          return await Promise.all(
            ids.map(async (id: number) => {
              const product = await api.Products.getProductById(id);
              if (!product || (product as IError).statusCode >= 400) {
                return undefined;
              } else {
                return product as IProductEntity;
              }
            }),
          ).then((results) => {
            return results.filter(
              (product): product is IProductEntity => product !== undefined,
            );
          });
        };

        const result = await getProductsByIds(items.map((item) => item)).then(
          (res) => res,
        );

        if (typeError(result)) {
          return { error: 'Data error' };
        }
        return { data: result };
      },
      providesTags: ['Products'],
      keepUnusedDataFor: 300, // 5 минут для продуктов по ID
    }),
    /**
     * Get Product By Id.
     * @property {IProductEntity} item - IProductEntity.
     */
    getProductById: build.query<IProductEntity, { id: number }>({
      queryFn: async ({ id }) => {
        if (!id) {
          return { error: null };
        }
        const result = await api.Products.getProductById(id);
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IProductEntity };
      },
      providesTags: ['Products'],
      keepUnusedDataFor: 300, // 5 минут для отдельного продукта
    }),
    /**
     * Get Page By Id.
     * @property {IProductEntity} item - IProductEntity.
     */
    getPageById: build.query<IPagesEntity, { id: number }>({
      queryFn: async ({ id }) => {
        if (!id) {
          return { error: null };
        }
        const result = await api.Pages.getPageById(id);

        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IPagesEntity };
      },
      providesTags: ['Pages'],
      keepUnusedDataFor: 600, // 10 минут для страниц
    }),
    /**
     * Get block by Marker.
     * @property {string} marker - Marker of Block.
     */
    getBlockByMarker: build.query<IBlockEntity, BlockByMarkerProps>({
      queryFn: async ({ marker }) => {
        const result = await api.Blocks.getBlockByMarker(marker);
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IBlockEntity };
      },
      providesTags: ['Blocks'],
      keepUnusedDataFor: 600, // 10 минут для блоков
    }),
    /**
     * Get all auth providers objects.
     */
    getAuthProviders: build.query<IAuthProvidersEntity[], string>({
      queryFn: async () => {
        const result = await api.AuthProvider.getAuthProviders();
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IAuthProvidersEntity[] };
      },
      keepUnusedDataFor: 3600, // 1 час для провайдеров авторизации
    }),
    /**
     * Get form by marker.
     * @property {string} marker - Marker of form.
     */
    getFormByMarker: build.query<IFormsEntity, { marker: string }>({
      queryFn: async ({ marker }) => {
        const result = await api.Forms.getFormByMarker(marker);
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IFormsEntity };
      },
      providesTags: ['Forms'],
      keepUnusedDataFor: 600, // 10 минут для форм
    }),
    /**
     * Getting the data of an authorized user.
     */
    getMe: build.query<IUserEntity, 'en_US'>({
      queryFn: async () => {
        const result = await api.Users.getUser();
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IUserEntity };
      },
      providesTags: ['User'],
      keepUnusedDataFor: 60, // 1 минута для данных пользователя
    }),
    /**
     * Get all payment accounts as an array.
     */
    getAccounts: build.query<IAccountsEntity[], object>({
      queryFn: async () => {
        const result = await api.Payments.getAccounts();
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IAccountsEntity[] };
      },
      providesTags: ['Accounts'],
      keepUnusedDataFor: 300, // 5 минут для аккаунтов
    }),
    /**
     * Retrieve one order storage object by marker.
     * @property {string} marker - Marker of the order object.
     */
    getOrderStorageByMarker: build.query<IOrdersEntity, { marker: string }>({
      queryFn: async ({ marker }) => {
        const result = await api.Orders.getOrderByMarker(marker);
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IOrdersEntity };
      },
      providesTags: ['Orders'],
      keepUnusedDataFor: 60, // 1 минута для заказов
    }),
    /**
     * Get a single payment session object by its identifier.
     * @property {number} id - Identifier of the retrieved payment session object.
     */
    getPaymentSessionById: build.query<ISessionEntity, { id: number }>({
      queryFn: async ({ id }) => {
        const result = await api.Payments.getSessionById(id);
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as ISessionEntity };
      },
      providesTags: ['Sessions'],
      keepUnusedDataFor: 60, // 1 минута для сессий
    }),
    /**
     * Getting a single order from the order storage object created by the user
     * @property {number} id - ID of the order object.
     * @property {string} marker - The text identifier of the order storage object.
     */
    getSingleOrder: build.query<IOrderByMarkerEntity, SingleOrderProps>({
      queryFn: async ({ id, marker }) => {
        const result = await api.Orders.getOrderByMarkerAndId(marker, id);
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IOrderByMarkerEntity };
      },
      providesTags: ['Orders'],
      keepUnusedDataFor: 60, // 1 минута для отдельных заказов
    }),
    /**
     * Update a single order from the order storage object created by the user
     * @property {number} id - ID of the order object.
     * @property {string} marker - The text identifier of the order storage object.
     * @property {any} data - Data of the order storage object.
     */
    updateOrderByMarkerAndId: build.query<IBaseOrdersEntity, SingleOrderProps>({
      queryFn: async ({ id, marker, body }) => {
        const result = await api.Orders.updateOrderByMarkerAndId(
          marker,
          id,
          body,
        );
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IBaseOrdersEntity };
      },
      providesTags: ['Orders'],
      keepUnusedDataFor: 60, // 1 минута для обновленных заказов
    }),
    /**
     * Update user state
     */
    updateUserState: build.mutation<boolean, { cart: object; user: any }>({
      queryFn: async ({ cart, user }) => {
        const result = await updateUserState({ cart, user });
        if (result === undefined) {
          return { data: false };
        }
        return { data: result };
      },
      invalidatesTags: ['User'],
    }),
    /**
     * Update order
     */
    updateOrder: build.mutation<IBaseOrdersEntity, SingleOrderProps>({
      queryFn: async ({ id, marker, body }) => {
        const result = await api.Orders.updateOrderByMarkerAndId(
          marker,
          id,
          body,
        );
        if (typeError(result)) {
          return { error: result };
        }
        return { data: result as IBaseOrdersEntity };
      },
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetBlockByMarkerQuery,
  useGetBlocksByPageUrlQuery,
  useGetFormByMarkerQuery,
  useGetAuthProvidersQuery,
  useLazyGetMeQuery,
  useGetAccountsQuery,
  useGetPageByIdQuery,
  useGetPaymentSessionByIdQuery,
  useLazyGetPaymentSessionByIdQuery,
  useGetOrderStorageByMarkerQuery,
  useGetSingleOrderQuery,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useGetProductsByPageUrlQuery,
  useGetProductsByIdsQuery,
  useUpdateOrderByMarkerAndIdQuery,
  useUpdateUserStateMutation,
  useUpdateOrderMutation,
} = RTKApi;
