import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { FC, Key } from 'react';

import TitleAnimations from '@/app/animations/TitleAnimations';

import SpecialistCard from './components/SpecialistCard';

interface ItemProps {
  title: string;
  cards: IAdminEntity[];
  specialization: {
    id: string;
    title: string;
    pageUrl: string;
  };
}

interface MastersGridProps {
  mastersData: ItemProps[];
}

/**
 * MastersGrid
 *
 * @param dict
 * @param mastersData
 * @returns MastersGrid
 */
const MastersGrid: FC<MastersGridProps> = async ({ mastersData }) => {
  return mastersData?.map((item: ItemProps, index: Key) => {
    if (item.cards.length < 1) {
      return;
    }
    return (
      <section
        key={index}
        className="mx-auto flex w-[1600px] max-w-full flex-col items-center px-5 pt-10"
      >
        <TitleAnimations
          delay={0.5}
          className="relative mx-auto mb-10 box-border flex shrink-0 flex-col"
        >
          <h2 className="title mb-5 text-center text-4xl font-light uppercase leading-10 text-[#414253] max-md:max-w-full">
            {item?.title}
          </h2>
          <hr className="relative mb-2.5 h-px w-full max-w-[150px] self-center border-b border-solid border-b-gray-600" />
        </TitleAnimations>
        <div className="mb-16 flex flex-row flex-wrap justify-center gap-16 self-stretch max-md:max-w-full max-md:gap-5">
          {item.cards?.map((card: IAdminEntity, index: number) => {
            return (
              <SpecialistCard
                key={index}
                item={card}
                index={index}
                specialization={item.specialization}
              />
            );
          })}
        </div>
      </section>
    );
  });
};

export default MastersGrid;
