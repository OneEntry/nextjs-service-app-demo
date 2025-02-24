'use client';

import type { FC } from 'react';

import StarsGroup from '@/components/shared/StarsGroup';

interface ReviewItem {
  title: string;
  text: string;
  rating: number;
}

const ReviewSlide: FC<{ item: ReviewItem }> = ({ item }) => {
  const { title, text, rating } = item;

  return (
    <div className="relative box-border flex w-[980px] max-w-full flex-col pb-7 max-lg:w-[75vw]">
      <div className="relative mx-auto mt-5 box-border h-auto text-center max-sm:mb-2.5">
        <h3 className="bg-white text-start text-xl font-bold not-italic text-neutral-600">
          {title}
        </h3>
      </div>
      <div className="mx-auto">
        <StarsGroup rating={rating} size={16} />
      </div>
      <div className="flex w-full px-4 text-center">
        <p className="text-neutral-800">{text}</p>
      </div>
    </div>
  );
};

export default ReviewSlide;
