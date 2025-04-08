import Link from 'next/link';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

/**
 * BanerPhone component.
 *
 * @param props.block - The block data containing attributes for the section.
 * @returns JSX.Element
 */
const BanerPhone: FC<{
  block: IBlockEntity;
}> = ({ block }) => {
  const { phone, phone_formatted } = block.attributeValues;

  return (
    <Link
      id="baner_phone"
      href={`tel:${phone?.value || ''}`}
      className="relative text-4xl font-medium hover:text-[#ffffff] focus:text-[#ffffff] focus:outline-none max-sm:text-xl"
    >
      {phone_formatted?.value}
    </Link>
  );
};

export default BanerPhone;
