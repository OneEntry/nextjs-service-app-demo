import { type FC, Suspense } from 'react';

import { getPageByUrl } from '@/app/api';
import { getDictionary } from '@/app/api/utils/dictionaries';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import BookingAnimations from '@/components/forms/booking-form/animations/BookingAnimations';
import BookingForm from '@/components/forms/BookingForm';

export const revalidate = 10;
export const dynamicParams = true;

/**
 * BookingPageLayout
 */
const BookingPageLayout: FC = async () => {
  const [dict] = ServerProvider('dict', await getDictionary());
  // get booking page by Url
  const { page } = await getPageByUrl('booking');

  return (
    <Suspense
      fallback={<div className={'bg-gradient-2 min-h-[100vh] min-w-full'} />}
    >
      <BookingAnimations className="flex flex-col justify-center">
        <div className="bg-gradient-2 flex min-h-[70vh] w-full px-5 py-10 text-white">
          <div className="mx-auto flex w-full max-w-screen-xs flex-col">
            <h1 className="title mb-6 self-center text-center text-2xl font-bold uppercase">
              {page?.localizeInfos?.title}
            </h1>
            <BookingForm dict={dict} />
          </div>
        </div>
      </BookingAnimations>
    </Suspense>
  );
};

export default BookingPageLayout;
