import type { IError } from 'oneentry/dist/base/utils';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';

import { CurrencyEnum, IntlEnum } from '@/app/types/enum';

// UsePrice
export const UsePrice = ({ amount }: { amount: number | string }): string => {
  const currency = CurrencyEnum['en' as keyof typeof CurrencyEnum];
  const intlEnum = IntlEnum['en' as keyof typeof IntlEnum];
  const formattedPrice = new Intl.NumberFormat(intlEnum, {
    style: 'currency',
    currency: currency,
  }).format(Number(amount));

  return formattedPrice;
};

// UseDate
export const UseDate = ({
  fullDate,
  format = 'en',
}: {
  fullDate: number | string | Date;
  format: string;
}) => {
  const d = new Date(fullDate);
  const year = new Intl.DateTimeFormat(format, {
    year: 'numeric',
  }).format(d);
  const month = new Intl.DateTimeFormat(format, {
    month: 'short',
  }).format(d);
  const day = new Intl.DateTimeFormat(format, {
    day: '2-digit',
  }).format(d);

  const date = day + '-' + month + '-' + year;

  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortArrayByPosition = (array: Record<any, any>) => {
  return array.sort(
    (a: { position: number }, b: { position: number }) =>
      a.position - b.position,
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortObjectFieldsByPosition = (obj: Record<any, any>) => {
  const entries = Object.entries(obj);
  entries.sort((a, b) => a[1].position - b[1].position);
  const sortedObj = {};
  for (const [key, value] of entries) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    sortedObj[key] = value;
  }
  return sortedObj;
};

// flatMenuToNested
export const flatMenuToNested = (
  data: [] | Array<IMenusPages>,
  pid: number | null,
) => {
  return data.reduce((r: IMenusPages[], element: IMenusPages) => {
    if (pid == element.parentId) {
      const object = { ...element };
      const children = flatMenuToNested(data, element.id);
      if (children.length) {
        object.children = children;
      }
      r.push(object);
    }
    return r;
  }, []);
};

// typeError checker
export function typeError(res: IError | unknown): res is IError {
  if ((res as IError)?.statusCode) {
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shuffleArray = (array: any[]) => {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};
