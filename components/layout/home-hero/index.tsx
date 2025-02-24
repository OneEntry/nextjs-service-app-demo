import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

interface HomeHeroProps {
  block: IBlockEntity;
  dict: IAttributeValues;
}

/**
 * HomeHero section component.
 *
 * @param block - The block data containing attributes for the section.
 * @param dict - Additional dictionary attributes.
 * @returns JSX.Element representing the HomeHero section.
 */
const HomeHero: FC<HomeHeroProps> = ({ block }) => {
  const { attributeValues } = block;
  const { title, button_link, button_text, bg_image, text } = attributeValues;

  const description = text?.value[0]?.htmlValue ?? '';
  const heroImage = bg_image?.value[0]?.downloadLink ?? '';

  return (
    <section className="flex flex-col justify-center">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center px-5 max-md:max-w-full max-md:px-5">
        <div className="relative mx-auto flex min-h-[675px] w-full max-w-[1440px] flex-row items-end justify-between pb-16 pl-12 pr-36 max-lg:min-h-[480px] max-lg:px-5 max-md:min-h-[480px] max-md:max-w-full max-md:flex-wrap max-sm:mr-auto">
          <div className="relative mt-auto flex flex-col text-left font-black text-white max-xl:mr-auto max-md:mt-10 max-sm:mx-auto">
            <h1 className="mb-4 flex items-baseline justify-start text-[210px] leading-[220px] max-lg:text-[110px] max-lg:leading-4 max-md:text-9xl max-md:leading-4 max-sm:text-9xl">
              {title?.value} <span className="text-8xl leading-[70px]">%</span>
            </h1>
            {description && (
              <div className="text-7xl leading-[84px] tracking-wider max-lg:text-5xl max-md:mx-auto max-md:mt-10 max-md:text-4xl max-md:leading-10">
                {parse(description)}
              </div>
            )}
          </div>

          <Link
            href={button_link?.value || '#'}
            className="relative mb-6 ml-auto justify-center whitespace-nowrap bg-white px-10 py-1.5 text-xl uppercase leading-10 tracking-[3.98px] text-zinc-800 transition-all duration-300 ease-in-out hover:opacity-85 hover:backdrop-blur-md max-md:mt-10 max-md:px-5 max-sm:mx-auto"
          >
            {button_text?.value}
          </Link>
        </div>
      </div>

      <div className="bg-wrapper bg-gradient-1 absolute inset-0 size-full">
        {heroImage && (
          <Image
            fill
            alt={title?.value || 'Hero image'}
            src={heroImage}
            sizes="(min-width: 1600px) 50vw, 100vw"
            className="inset-0 mx-auto size-full max-w-[2000px] object-cover"
          />
        )}
      </div>
    </section>
  );
};

export default HomeHero;
