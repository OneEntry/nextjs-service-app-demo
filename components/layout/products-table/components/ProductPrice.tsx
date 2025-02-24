import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';

// Define the ProductPrice functional component
const ProductPrice: FC<{ product: IProductEntity }> = ({ product }) => {
  // Safely extract the price, providing a default value if it's undefined
  const price = product?.price ?? 'N/A';

  return <span>{`${price}$`}</span>;
};

export default ProductPrice;
