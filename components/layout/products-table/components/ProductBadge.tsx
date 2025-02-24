import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';

// Define the properties expected by the ProductBadge component
interface ProductBadgeProps {
  product: IProductEntity;
  color: string;
}

// Define the ProductBadge functional component
const ProductBadge: FC<ProductBadgeProps> = ({
  product: { attributeValues },
  color,
}) => {
  // Safely extract the badge title from the product's attribute values
  const badgeTitle = attributeValues?.type?.value?.[0]?.title ?? '';

  if (!badgeTitle) {
    return (
      <div className={'size-10 self-center font-medium leading-3 text-white'} />
    );
  }

  return (
    <div
      className={
        'size-10 justify-center self-center rounded-full text-center text-xs font-medium leading-3 px-1 py-2 text-white bg-' +
        color
      }
    >
      {badgeTitle}
    </div>
  );
};

export default ProductBadge;
