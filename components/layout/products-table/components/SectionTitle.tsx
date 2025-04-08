import type { FC } from 'react';

import TitleAnimations from '@/app/animations/TitleAnimations';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title }) => (
  <TitleAnimations className="relative mx-auto mb-6 box-border flex shrink-0 flex-col max-lg:mb-6 max-sm:mb-5">
    <h1 className="title self-center text-4xl font-light uppercase text-slate-600">
      {title}
    </h1>
    <hr className="mx-auto mt-5 h-px w-full max-w-[150px] shrink-0 self-center border-solid border-slate-500" />
  </TitleAnimations>
);

export default SectionTitle;
