import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import MenuSection from './components/MenuSection';

/**
 * Footer section
 * @returns React component
 */
const Footer: FC<{ dict: IAttributeValues }> = async ({ dict }) => {
  return (
    <footer className="fade-in bg-gradient-1 max-w-full">
      <MenuSection dict={dict} />
    </footer>
  );
};

export default Footer;
