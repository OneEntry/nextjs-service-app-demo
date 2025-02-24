import type { FC } from 'react';

import Copyrights from './Copyrights';
import SalonsGrid from './SalonsGrid';
import SocialButtons from './SocialButtons';

/**
 * ContactInfo component
 * Displays contact information including salons, social media buttons, and copyrights.
 * @returns JSX.Element
 */
const ContactInfo: FC = () => {
  const contactsTitle = 'Contacts';

  return (
    <div className="flex flex-col max-md:w-full max-md:max-w-full max-sm:mb-0">
      <div className="mb-5 mt-1.5 text-lg font-bold max-md:max-w-full">
        {contactsTitle}:
      </div>
      {/* Column 1 */}
      <div className="flex justify-between gap-4 pb-10 max-md:mr-auto max-md:flex-wrap max-md:gap-5 max-md:pb-8 max-sm:gap-6">
        <SalonsGrid />
      </div>
      {/* Column 2 */}
      <div className="mt-6 flex w-[134px] max-w-full flex-col max-md:mt-5 max-sm:hidden">
        <h3 className="mb-3 text-sm font-bold">Follow us:</h3>
        <div className="mb-5 flex items-end justify-around gap-5">
          <SocialButtons />
        </div>
      </div>
      {/* Column 3 */}
      <div className="text-left text-base font-medium tracking-wide max-md:max-w-full max-sm:hidden">
        <Copyrights />
      </div>
    </div>
  );
};

export default ContactInfo;
