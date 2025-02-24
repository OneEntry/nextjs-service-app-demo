import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {
  IOrderProductData,
  IOrdersFormData,
} from 'oneentry/dist/orders/ordersInterfaces';

import type { IAppOrder } from '@/app/types/global';

type InitialStateType = {
  order: IAppOrder;
  currency?: string;
  paymentMethods?: Array<{
    identifier: string;
  }>;
};

const initialState: InitialStateType = {
  order: {
    formData: [],
    products: [],
    formIdentifier: 'order',
  },
};

const orderReducer = createSlice({
  initialState,
  name: 'order',
  reducers: {
    createOrder(state, action: PayloadAction<IAppOrder>) {
      if (!state.order) {
        state.order = action.payload;
      }
    },
    removeOrder(state) {
      state.order = initialState.order;
    },
    addData(
      state,
      action: PayloadAction<IOrdersFormData & { valid?: boolean }>,
    ) {
      if (!state.order) {
        return;
      }
      const index = state.order.formData.findIndex(
        (item: { marker: string }) => item.marker === action.payload.marker,
      );

      if (index !== -1) {
        state.order.formData[index] = action.payload;
      } else {
        state.order.formData.push(action.payload);
      }
    },
    addProducts(state, action: PayloadAction<IOrderProductData[]>) {
      if (!state.order) {
        return;
      }
      state.order.products = action.payload;
    },
    addPaymentMethods(
      state,
      action: PayloadAction<
        Array<{
          identifier: string;
        }>
      >,
    ) {
      if (!state.paymentMethods) {
        state.paymentMethods = action.payload;
      }
    },
    addPaymentMethod(state, action: PayloadAction<string>) {
      if (!state.order) {
        return;
      }
      state.order.paymentAccountIdentifier = action.payload;
    },
    addOrderCurrency(state, action: PayloadAction<string>) {
      if (!state.order) {
        return;
      }
      state.currency = action.payload;
    },
  },
});

export const {
  removeOrder,
  createOrder,
  addData,
  addProducts,
  addPaymentMethods,
  addPaymentMethod,
  addOrderCurrency,
} = orderReducer.actions;

export default orderReducer.reducer;
