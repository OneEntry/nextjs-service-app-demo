import type { FC } from 'react';

import StarIcon from '@/components/icons/star';
import StarOpenIcon from '@/components/icons/star-o';

interface StarsGroupProps {
  rating: number;
  size: number;
}

const StarsGroup: FC<StarsGroupProps> = ({ rating, size }) => {
  const totalRating = 5;

  return (
    <div
      className="flex gap-0.5"
      aria-label={`Rating of ${rating} out of ${totalRating}`}
    >
      {Array.from({ length: totalRating }, (_, index) => {
        return index < rating ? (
          <StarIcon key={index} size={size} />
        ) : (
          <StarOpenIcon key={index} size={size} />
        );
      })}
    </div>
  );
};

export default StarsGroup;
