import Link from 'next/link';
import type { FC } from 'react';

import LogoIcon from '../../shared/LogoIcon';

/**
 * Logo
 *
 * @returns JSX.Element
 */
const Logo: FC = () => {
  return (
    <Link
      href={'/'}
      prefetch={false}
      className="fade-in logo w-full focus:outline-none"
    >
      <LogoIcon className={'max-w-full'} fill={'#292A2C'} stroke={'#292A2C'} />
    </Link>
  );
};

export default Logo;
