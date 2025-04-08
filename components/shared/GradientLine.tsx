import type { FC } from 'react';

import LineAnimations from '@/app/animations/LineAnimations';

const GradientLine: FC<{ className?: string }> = async ({
  className = 'h-[50px] sm:h-[60px] lg:h-[80px] xl:h-[90px] 2xl:h-[100px]',
}) => {
  return (
    <LineAnimations
      className={'bg-gradient-1 ' + className}
      delay={0}
    ></LineAnimations>
  );
};

export default GradientLine;
