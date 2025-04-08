import parse from 'html-react-parser';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

/**
 * BanerDescription component.
 *
 * @param block - The block data containing attributes for the section.
 * @returns JSX.Element
 */
const BanerDescription: FC<{
  block: IBlockEntity;
}> = ({ block }) => {
  const { description } = block.attributeValues;

  const descrHtml = description?.value[0]?.htmlValue ?? '';

  return (
    <div id="baner_descr" className="relative mb-5 underline lg:text-xl">
      {descrHtml && parse(descrHtml)}
    </div>
  );
};

export default BanerDescription;
