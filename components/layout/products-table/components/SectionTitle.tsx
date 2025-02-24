'use client';

import type { FC } from 'react';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title }) => (
  <div className="relative mx-auto mb-6 box-border flex shrink-0 flex-col max-lg:mb-6 max-sm:mb-5">
    <h1 className="self-center text-4xl font-light uppercase text-slate-600">
      {title}
    </h1>
    <hr className="mt-5 h-px w-full max-w-full shrink-0 border-solid border-slate-500" />
  </div>
);

export default SectionTitle;
