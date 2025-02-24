import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';

const ProductTitle: FC<{ product: IProductEntity }> = ({ product }) => {
  // Safely access the title with a fallback in case it's undefined
  const title = product.localizeInfos?.title ?? 'Untitled Product';

  return <span>{title}</span>;
};

export default ProductTitle;
