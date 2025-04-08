import type { FC } from 'react';

import FormFieldAnimations from '@/components/forms/animations/FormFieldAnimations';
import Spinner from '@/components/shared/Spinner';

interface FormSubmitButtonProps {
  title: string;
  isLoading: boolean;
  index: number;
}

/**
 * Form submit button
 * @param title button title
 * @param isLoading loading state
 * @param index Index of element for animations stagger
 *
 * @returns Form submit button
 */
const FormSubmitButton: FC<FormSubmitButtonProps> = ({
  title,
  isLoading,
  index,
}) => {
  return (
    <FormFieldAnimations index={index} className="w-full">
      <button
        disabled={isLoading}
        type="submit"
        className="border-fuchsia-500hover:bg-fuchsia-600 relative h-[60px] w-full items-center justify-center rounded-[30px] bg-fuchsia-500 px-10 py-2.5 text-xl font-bold uppercase tracking-wide text-white transition-colors duration-300 focus-visible:outline-fuchsia-600 disabled:bg-[#a8a9b580] disabled:text-neutral-300"
      >
        {isLoading ? <Spinner /> : title}
      </button>
    </FormFieldAnimations>
  );
};

export default FormSubmitButton;
