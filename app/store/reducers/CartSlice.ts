/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';

type InitialStateType = {
  serviceId: number;
  servicesData: {
    id: number;
    salon?: IPagesEntity;
    service?: IPagesEntity;
    product?: IProductEntity;
    master?: IAdminEntity;
    date?: Date;
  }[];
  tabsState: any;
  transitionId: number;
  version: number;
};

const initialState: InitialStateType = {
  serviceId: 0,
  servicesData: [
    {
      id: 0,
      salon: {} as IPagesEntity,
      service: {} as IPagesEntity,
      product: {} as IProductEntity,
      master: {} as IAdminEntity,
      date: {} as Date,
    },
  ],
  tabsState: {
    salons: {
      isActive: true,
      disabled: false,
      data: null,
    },
    services: {
      isActive: false,
      disabled: false,
      data: null,
    },
    products: {
      isActive: false,
      disabled: false,
      data: null,
    },
    masters: {
      isActive: false,
      disabled: false,
      data: null,
    },
    calendar: {
      isActive: false,
      disabled: false,
      data: null,
    },
    signin: {
      isActive: false,
      disabled: false,
      data: null,
    },
    payment: {
      isActive: false,
      disabled: false,
      data: null,
    },
  },
  transitionId: 0,
  version: 0,
};

export const cartSlice = createSlice({
  name: 'cart-slice',
  initialState,
  reducers: {
    addServiceToCart(
      state,
      action: PayloadAction<{
        id: number;
        salon?: IPagesEntity;
        service?: IPagesEntity;
        product?: IProductEntity;
        master?: IAdminEntity;
        date?: Date;
      }>,
    ) {
      if (state.servicesData.length < 1) {
        state.servicesData.push(action.payload);
      }
      state.servicesData = state.servicesData.map((service) => {
        if (action.payload.id === service.id) {
          return {
            ...service,
            ...action.payload,
          };
        } else {
          return service;
        }
      });
    },
    removeAllServices(state) {
      state.servicesData = initialState.servicesData;
    },
    setCartTransition(state, action: PayloadAction<{ productId: number }>) {
      state.transitionId = action.payload.productId;
    },
    setCartVersion(state, action: PayloadAction<number>) {
      state.version = action.payload;
    },
    setTabsState(state, action: PayloadAction<{ key: any; value: any }>) {
      const tabsState = state.tabsState;
      const key = action.payload.key;
      state.tabsState = {
        ...tabsState,
        [key]: {
          ...tabsState[key],
          isActive: action.payload.value,
        },
      };
    },
    setTabsData(state, action: PayloadAction<{ key: any; value: any }>) {
      const tabsState = state.tabsState;
      const key = action.payload.key;
      state.tabsState = {
        ...tabsState,
        [key]: {
          ...tabsState[key],
          data: action.payload.value,
        },
      };
    },
  },
});

export const {
  addServiceToCart,
  removeAllServices,
  setCartTransition,
  setCartVersion,
  setTabsState,
  setTabsData,
} = cartSlice.actions;

/**
 * Get transition - get product id for animations
 * @param state slice state
 * @returns transitionId
 */
export const getTransition = (state: {
  cartReducer: {
    transitionId: number;
  };
}) => state.cartReducer;

/**
 * Select cart data
 * @param state slice state
 * @returns productsData
 */
export const selectCartData = (state: {
  cartReducer: { servicesData: any[] };
}) => state.cartReducer.servicesData;

/**
 * Select cart total price
 * @param state slice state
 * @returns
 */
export const selectCartTotal = (state: {
  cartReducer: {
    serviceId: any;
    servicesData: any;
  };
}) => {
  const sId = state.cartReducer.serviceId;
  const product = state.cartReducer.servicesData[sId]?.product;
  const price = product?.price;
  // salePrice === oldPrice
  const salePrice = product.attributeValues?.sale?.value;

  return price || salePrice;
};

/**
 * Select ServiceId
 * @param state slice state
 * @returns productsData
 */
export const selectServiceId = (state: {
  cartReducer: { serviceId: number };
}) => state.cartReducer.serviceId;

/**
 * Select TabsState
 * @param state slice state
 * @returns productsData
 */
export const selectTabsState = (
  key: string,
  state: { cartReducer: { tabsState: any } },
) => state.cartReducer.tabsState[key];

/**
 * Select TabsState
 * @param state slice state
 * @returns productsData
 */
export const selectTabsData = (
  key: string,
  state: { cartReducer: { tabsState: any } },
) => state.cartReducer.tabsState[key].data;

export default cartSlice.reducer;
