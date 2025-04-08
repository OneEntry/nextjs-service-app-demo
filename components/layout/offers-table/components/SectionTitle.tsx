import { type FC } from 'react';

import TitleAnimations from '@/app/animations/TitleAnimations';

const SectionTitle: FC<{ title: string; color: string }> = ({
  title,
  color,
}) => {
  return (
    <TitleAnimations
      className={
        'mx-auto mb-6 box-border flex shrink-0 flex-col max-lg:mb-6 max-sm:mb-5'
      }
    >
      <h2
        className={'title self-center text-4xl font-light uppercase'}
        style={{ color: color }}
      >
        {title}
      </h2>
      <hr
        className="mx-auto mt-5 h-px w-full max-w-[150px] shrink-0 self-center border-solid border-slate-500"
        style={{ borderColor: color }}
      />
    </TitleAnimations>
  );
};

export default SectionTitle;
