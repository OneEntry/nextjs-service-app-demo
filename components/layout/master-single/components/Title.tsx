import type { FC } from 'react';

import TitleAnimations from '@/app/animations/TitleAnimations';

interface MasterSingleTitleProps {
  title: string;
}

/**
 * MasterSingleTitle - component to display a title and a horizontal rule.
 * @param title - The title to be displayed.
 * @returns JSX.Element representing the MasterSingleTitle component.
 */
const MasterSingleTitle: FC<MasterSingleTitleProps> = ({ title }) => {
  return (
    <TitleAnimations className="relative mx-auto mb-16 box-border flex shrink-0 flex-col max-lg:mb-8 max-sm:mb-6">
      <h1 className="title text-center text-4xl font-light uppercase leading-9 text-gray-600 max-sm:leading-[100%]">
        {title} master
      </h1>
      <hr className="mx-auto mt-5 h-px w-full max-w-[150px] self-center border-solid border-gray-600" />
    </TitleAnimations>
  );
};

export default MasterSingleTitle;
