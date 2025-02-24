import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import ContactInfo from './ContactInfo';
import Copyrights from './Copyrights';
import OpeningTime from './OpeningTime';
import SocialButtons from './SocialButtons';
import VerticalMenu from './VerticalMenu';

/**
 * Footer menu section
 * Displays various sections in the footer including contact info, menus, opening times, and social buttons.
 * @param dict - Dictionary containing text values for the section.
 * @returns JSX.Element
 */
const MenuSection: FC<{ dict: IAttributeValues }> = ({ dict }) => {
  const { opening_time_text, follow_us_text } = dict;

  return (
    <div className="mx-auto flex w-full max-w-[1440px] justify-between gap-10 px-5 py-16 text-black max-lg:flex-wrap max-lg:justify-center max-md:max-w-full max-sm:gap-0">
      {/* Contact Information */}
      <ContactInfo />

      {/* Main Content Section */}
      <div className="relative box-border flex shrink-0 flex-row gap-9 max-sm:w-full max-sm:flex-row max-sm:flex-wrap max-sm:gap-5">
        {/* Services Menu */}
        <VerticalMenu
          className="flex w-auto flex-col gap-5 px-2.5 max-md:mr-auto max-sm:mr-4 max-sm:w-[35%] max-sm:px-0"
          menuName="services"
          baseUrl="services"
        />

        {/* About Us Menu */}
        <VerticalMenu
          className="flex flex-col gap-5 px-2.5 max-md:mr-9 max-sm:mr-0 max-sm:w-6/12 max-sm:px-0"
          menuName="about_us"
          baseUrl=""
        />

        {/* Opening Times */}
        <div className="flex min-w-[262px] grow flex-col border border-solid border-black p-5 max-md:pb-5 max-sm:w-full max-sm:min-w-[200px]">
          <h3 className="mb-3.5 text-lg font-bold">
            {opening_time_text?.value}
          </h3>
          <div className="flex flex-col gap-2 whitespace-nowrap text-base leading-5">
            <OpeningTime />
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="hidden w-[134px] max-w-full flex-col max-sm:flex max-sm:w-full">
          <h3 className="mb-3 text-sm font-bold">{follow_us_text?.value}:</h3>
          <div className="mb-2 flex items-end justify-around gap-5 max-sm:justify-start">
            <SocialButtons />
          </div>
        </div>

        {/* Copyrights */}
        <div className="mb-4 hidden text-left text-base font-medium tracking-wide max-md:max-w-full max-sm:flex max-sm:text-left">
          <Copyrights />
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
