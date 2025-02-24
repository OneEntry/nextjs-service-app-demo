import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC, Key } from 'react';

const ServicesCell: FC<{ product: IProductEntity; color: string }> = ({
  product,
  color,
}) => {
  const services = product.attributeValues?.services?.value;

  return (
    <div className="relative box-border flex shrink-0 flex-row items-center">
      <div className={'mr-1.5 aspect-square w-2'} style={{ color: color }}>
        +
      </div>
      <div className="flex flex-col text-lg">
        {services?.map(
          (
            s: {
              title: string;
            },
            i: Key,
          ) => {
            return (
              <div
                key={i}
                className="leading-6 text-neutral-600 group-hover:text-fuchsia-500"
              >
                {s.title}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default ServicesCell;
