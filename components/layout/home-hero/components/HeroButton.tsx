/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import type { FC } from 'react';

interface HomeHeroProps {
  attributeValues: any;
  buttonRef: any;
}

/**
 * HomeHero section component.
 *
 * @param attributeValues - The block data containing attributes for the section.
 * @param dict - Additional dictionary attributes.
 * @returns JSX.Element representing the HomeHero section.
 */
const HeroButton: FC<HomeHeroProps> = ({ attributeValues, buttonRef }) => {
  const { button_link, button_text } = attributeValues;

  return (
    <Link
      ref={buttonRef}
      href={button_link?.value || '#'}
      style={{
        opacity: 0,
      }}
      className="relative mb-6 ml-auto justify-center overflow-hidden whitespace-nowrap bg-white px-10 py-1.5 text-xl uppercase leading-10 tracking-[3.98px] text-zinc-800 transition-all duration-300 ease-in-out hover:opacity-85 hover:backdrop-blur-md max-md:mt-10 max-md:px-5 max-sm:mx-auto"
    >
      {button_text?.value}
    </Link>
  );
};

export default HeroButton;
