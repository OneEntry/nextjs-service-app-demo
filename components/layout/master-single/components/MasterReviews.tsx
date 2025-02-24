import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { FC } from 'react';

import ReviewsIcon from '@/components/icons/reviews';
import StarsGroup from '@/components/shared/StarsGroup';

interface MasterReviewsProps {
  master: IAdminEntity;
}

/**
 * MasterReviews component to display reviews and ratings for a master.
 * @param page - Page entity (currently unused).
 * @param master - Master entity containing various attributes.
 * @returns JSX.Element representing the MasterReviews component or null if page or master is missing.
 */
const MasterReviews: FC<MasterReviewsProps> = ({ master }) => {
  if (!master) {
    return null;
  }

  const { master_rating } = master.attributeValues;
  const rating = master_rating?.value ?? 0;

  return (
    <div className="flex items-end gap-3.5 self-start whitespace-nowrap text-neutral-600">
      <div className="flex items-center justify-between gap-1.5 text-xl leading-6">
        <StarsGroup rating={rating} size={20} />
        <div className="self-stretch">527</div>
      </div>
      <div className="mr-16 flex items-center gap-3.5">
        <div className="text-lg">Reviews</div>
        <div className="flex gap-2.5 leading-[100%]">
          <ReviewsIcon size={6} />
          <div className="text-xl leading-5">27</div>
        </div>
      </div>
    </div>
  );
};

export default MasterReviews;
