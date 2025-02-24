import type { FC } from 'react';

interface MasterSingleTitleProps {
  title: string;
}

/**
 * MasterSingleTitle component to display a title and a horizontal rule.
 * @param title - The title to be displayed.
 * @returns JSX.Element representing the MasterSingleTitle component.
 */
const MasterSingleTitle: FC<MasterSingleTitleProps> = ({ title }) => {
  return (
    <div className="relative mx-auto mb-16 box-border flex shrink-0 flex-col max-lg:mb-8 max-sm:mb-6">
      <h1 className="text-center text-4xl font-light uppercase leading-9 text-gray-600 max-sm:leading-[100%]">
        {title} master
      </h1>
      <hr className="mt-5 h-px w-full border-solid border-gray-600" />
    </div>
  );
};

export default MasterSingleTitle;
