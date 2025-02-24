import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC, Key } from 'react';

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
  dict: IAttributeValues;
  mastersData: ItemProps[];
}

/**
 * MastersGrid
 * @param dict
 * @param mastersData
 * @returns MastersGrid
 */
const MastersGrid: FC<MastersGridProps> = async ({ dict, mastersData }) => {
  return mastersData?.map((item: ItemProps, index: Key) => {
    if (item.cards.length < 1) {
      return;
    }
    return (
      <section
        key={index}
        className="mx-auto flex w-[1600px] max-w-full flex-col items-center px-5 pt-10"
      >
        <div className="relative mx-auto mb-10 box-border flex shrink-0 flex-col">
          <h2 className="mb-5 text-center text-4xl font-light uppercase leading-10 text-[#414253] max-md:max-w-full">
            {item?.title}
          </h2>
          <div className="mx-auto min-h-px w-[150px] max-w-full shrink-0 border-b border-solid border-neutral-600"></div>
        </div>
        <div className="mb-16 flex flex-row flex-wrap justify-center gap-16 self-stretch max-md:max-w-full max-md:gap-5">
          {item.cards?.map((card: IAdminEntity, i: Key) => {
            return (
              <SpecialistCard
                key={i}
                dict={dict}
                item={card}
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
