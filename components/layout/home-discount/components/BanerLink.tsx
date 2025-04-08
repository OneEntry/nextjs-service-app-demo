import Link from 'next/link';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

/**
 * BanerLink component.
 *
 * @param props.block - The block data containing attributes for the section.
 * @returns JSX.Element
 */
const BanerLink: FC<{
  block: IBlockEntity;
}> = ({ block }) => {
  const { button_link, button_text } = block.attributeValues;

  return (
    <Link
      href={button_link?.value || '#'}
      id="baner_link"
      className="relative mb-6 self-center rounded-[40px] bg-white px-20 py-4 text-center text-2xl font-bold uppercase text-fuchsia-500 transition-colors duration-300 hover:bg-gray-100 hover:text-[#fb07ff] hover:shadow-lg focus:bg-gray-100 focus:outline-none max-sm:px-6 max-sm:text-sm"
    >
      {button_text?.value}
    </Link>
  );
};

export default BanerLink;
