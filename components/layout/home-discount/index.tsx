import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

import BannerAnimations from './animations/BannerAnimations';
import BanerDescription from './components/BanerDescription';
import BanerImage from './components/BanerImage';
import BanerLink from './components/BanerLink';
import BanerPhone from './components/BanerPhone';
import BanerTitle from './components/BanerTitle';

interface HomeDiscountProps {
  block: IBlockEntity;
}

/**
 * HomeDiscount section component.
 *
 * @param props - The properties object.
 * @param props.block - The block data containing attributes for the section.
 * @returns JSX.Element representing the HomeDiscount section.
 */
const HomeDiscount: FC<HomeDiscountProps> = ({ block }) => {
  if (!block) {
    return;
  }
  return (
    <section className="flex items-center justify-center bg-white px-16 py-5 text-[#414253] max-md:px-5">
      <BannerAnimations className="flex w-[1065px] max-w-full flex-col justify-center overflow-hidden rounded-[50px] bg-fuchsia-500">
        <div className="relative flex min-h-[340px] w-full flex-col items-end overflow-hidden px-20 py-12 pt-8 text-center max-md:px-10">
          <BanerImage block={block} />
          <div className="relative ml-auto box-border flex shrink-0 flex-col items-center">
            <BanerTitle block={block} />
            <BanerLink block={block} />
            <BanerDescription block={block} />
            <BanerPhone block={block} />
          </div>
        </div>
      </BannerAnimations>
    </section>
  );
};

export default HomeDiscount;
