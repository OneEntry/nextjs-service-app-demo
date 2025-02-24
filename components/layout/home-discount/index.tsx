import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

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
  const {
    phone,
    phone_formatted,
    title,
    bg_image,
    button_link,
    button_text,
    description,
  } = block.attributeValues;

  const descrHtml = description?.value[0]?.htmlValue ?? '';
  const bgImageUrl = bg_image?.value[0]?.downloadLink ?? '';
  const [titlePrefix, ...titleSuffix] = title?.value.split('%') || ['', ''];

  return (
    <section className="flex items-center justify-center bg-white px-16 py-5 text-[#414253] max-md:px-5">
      <div className="flex w-[1065px] max-w-full flex-col justify-center overflow-hidden rounded-[50px] bg-fuchsia-500">
        <div className="relative flex min-h-[340px] w-full flex-col items-end overflow-hidden px-20 py-12 pt-8 text-center max-md:px-10">
          {bgImageUrl && (
            <Image
              fill
              loading="lazy"
              src={bgImageUrl}
              sizes="(min-width: 600px) 50vw, 100vw"
              className="absolute inset-0 size-full object-cover"
              alt="Background image"
            />
          )}
          <div className="relative ml-auto box-border flex shrink-0 flex-col items-center">
            <h2 className="relative mb-8 text-center text-4xl leading-[auto] tracking-wider text-white max-md:mb-4 max-md:max-w-full max-sm:text-2xl">
              <span className="font-black">{titlePrefix} %</span>{' '}
              {titleSuffix.join('%')}
            </h2>
            <Link
              href={button_link?.value || '#'}
              className="relative mb-6 self-center rounded-[40px] bg-white px-20 py-4 text-center text-2xl font-bold uppercase text-fuchsia-500 transition-colors duration-300 hover:bg-gray-100 hover:text-[#fb07ff] hover:shadow-lg focus:bg-gray-100 focus:outline-none max-sm:px-6 max-sm:text-sm"
            >
              {button_text?.value}
            </Link>
            <div className="relative mb-5 underline lg:text-xl">
              {parse(descrHtml)}
            </div>
            <Link
              href={`tel:${phone?.value || ''}`}
              className="relative text-4xl font-medium hover:text-[#ffffff] focus:text-[#ffffff] focus:outline-none max-sm:text-xl"
            >
              {phone_formatted?.value}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDiscount;
