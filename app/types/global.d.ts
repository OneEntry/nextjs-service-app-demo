import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { IFilterParams } from 'oneentry/dist/products/productsInterfaces';

declare type LocalizeInfo = {
  content: string;
  menuTitle: string;
  title: string;
};

declare type PageProps = {
  params: { page: string; handle: string };
  searchParams?: {
    search?: string;
    page?: string;
    filters?: IFilterParams[];
  };
};

declare type SimplePageProps = {
  page?: IPagesEntity;
  dict: IAttributeValues;
};

declare type LoaderProps = {
  data?: Record<string, unknown>;
  limit?: number;
  offset?: number;
};

declare type MetadataParams = {
  params: { handle: string };
};

export type CartState = {
  quantity: number;
  id: number;
};

export type AnimationsProps = {
  children: ReactNode;
  className: string;
  index: number;
};

export type FormProps = { dict: IAttributeValues };

declare type TabLayoutProps = {
  dict: IAttributeValues;
  tabsState: {
    [tabKey]: {
      isActive: boolean;
      disabled: boolean;
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTabsState: any;
};

declare type IAppOrder = {
  formIdentifier?: string;
  paymentAccountIdentifier?: string;
  formData: Array<IOrdersFormData & { valid?: boolean }>;
  products: Array<IOrderProductData>;
};
