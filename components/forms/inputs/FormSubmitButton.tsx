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
        className="btn btn-lg btn-primary relative w-full"
      >
        {isLoading ? <Spinner /> : title}
      </button>
    </FormFieldAnimations>
  );
};

export default FormSubmitButton;
