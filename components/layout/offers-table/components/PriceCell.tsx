import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';

const PriceDisplay: FC<{
  product: IProductEntity;
  color: string;
}> = ({ product, color }) => {
  const price = product.price;
  const sale = product.attributeValues?.sale?.value;

  return (
    <div className="float-right flex w-auto flex-row gap-3 self-stretch text-right text-lg">
      <div className="whitespace-nowrap text-gray-400">{sale} $</div>
      <div className={'whitespace-nowrap font-bold'} style={{ color: color }}>
        {price} $
      </div>
    </div>
  );
};

export default PriceDisplay;
