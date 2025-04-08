'use client';

import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';

interface ProductRowProps {
  currentId: number;
  product: IProductEntity;
  index: number;
  addProductToCart: (product: IProductEntity) => void;
}

/**
 * ProductRow
 * @param currentId
 * @param product
 * @param addProductToCart
 * @returns ProductRow
 */
const ProductRow: FC<ProductRowProps> = ({
  currentId,
  product,
  addProductToCart,
}) => {
  const { price, attributeValues, attributeSetIdentifier, localizeInfos, id } =
    product;
  const salePrice = attributeValues?.sale?.value;

  // Determine title based on whether it's a service set or not
  const title =
    attributeSetIdentifier === 'service_set'
      ? attributeValues.services?.value
          .map((p: { title: string }) => p.title)
          .join(' + ')
      : localizeInfos?.title;

  // Determine button text color class
  const isCurrentProduct = currentId === id;
  const textColorClass = isCurrentProduct ? 'text-fuchsia-500' : '';

  // Determine price text decoration class
  const priceTextClass = salePrice
    ? 'text-xs line-through leading-7'
    : 'text-gray-400';

  return (
    <div className="dropdown-item flex border-b border-b-[#d9dae1]">
      <button
        onClick={() => addProductToCart(product)}
        className={`flex w-full justify-between py-2 hover:text-fuchsia-500 focus:text-fuchsia-500 ${textColorClass}`}
      >
        <span className="text-left">{title}</span>
        <span className="flex flex-row gap-3 self-stretch">
          {salePrice && (
            <div className={`whitespace-nowrap ${priceTextClass}`}>
              {salePrice} $
            </div>
          )}
          <div className="whitespace-nowrap">{price} $</div>
        </span>
      </button>
    </div>
  );
};

export default ProductRow;
