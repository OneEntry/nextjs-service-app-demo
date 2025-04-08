import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

/**
 * BanerTitle component.
 *
 * @param props.block - The block data containing attributes for the section.
 * @returns JSX.Element
 *
 */
const BanerTitle: FC<{
  block: IBlockEntity;
}> = ({ block }) => {
  const { title } = block.attributeValues;

  const [titlePrefix, ...titleSuffix] = title?.value.split('%') || ['', ''];

  return (
    <h2
      id="baner_title"
      className="relative mb-8 text-center text-4xl leading-[auto] tracking-wider text-white max-md:mb-4 max-md:max-w-full max-sm:text-2xl"
    >
      <span className="font-black">{titlePrefix} %</span>{' '}
      {titleSuffix.join('%')}
    </h2>
  );
};

export default BanerTitle;
