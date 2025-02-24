import type { FC } from 'react';

import { socialData } from '@/components/data';
import * as icons from '@/components/icons';

const SocialButtons: FC = async () => {
  return socialData.map((item, i) => {
    const Icon = icons[item.icon as keyof typeof icons];
    return (
      <a key={i} href={item.link} className="size-6 focus:outline-none">
        <Icon size={6} />
      </a>
    );
  });
};

export default SocialButtons;
