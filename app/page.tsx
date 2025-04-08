import dynamic from 'next/dynamic';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC, Key } from 'react';

import { getBlocksByPageUrl, getPageByUrl } from '@/app/api';
import { getDictionary } from '@/app/api/utils/dictionaries';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import { sortArrayByPosition } from '@/components/utils';

const HomeHero = dynamic(() => import('@/components/layout/home-hero'), {
  ssr: true,
});
const CatalogSection = dynamic(
  () => import('@/components/layout/catalog-grid'),
  { ssr: true },
);
const GalleryFeed = dynamic(() => import('@/components/layout/gallery-feed'), {
  ssr: true,
});
const HomeDiscount = dynamic(
  () => import('@/components/layout/home-discount'),
  { ssr: true },
);
const ReviewsCarousel = dynamic(
  () => import('@/components/layout/reviews-carousel'),
  { ssr: true },
);
const MastersFeed = dynamic(() => import('@/components/layout/masters-feed'), {
  ssr: true,
});
const OffersFeed = dynamic(() => import('@/components/layout/offers-feed'), {
  ssr: true,
});

// export const revalidate = 10;
// export const dynamicParams = true;

const IndexPageLayout: FC = async () => {
  // set dict
  ServerProvider('dict', await getDictionary());
  // get page
  const { page, isError } = await getPageByUrl('home');
  // get page blocks
  const { blocks } = await getBlocksByPageUrl({ pageUrl: page?.pageUrl || '' });
  if (isError || !page || !blocks) {
    return 'isError';
  }

  const sortedBlocks = sortArrayByPosition(blocks);

  return sortedBlocks?.map((block: IBlockEntity, index: Key) => {
    switch (block.identifier) {
      case 'home_hero':
        return <HomeHero key={index} block={block} />;
      case 'home_catalog':
        return (
          <div className="px-5 py-8" key={index}>
            <CatalogSection block={block} />
          </div>
        );
      case 'home_gallery':
        return <GalleryFeed key={index} block={block} />;
      case 'home_offers_feed':
        return <OffersFeed key={index} block={block} />;
      case 'home_discounts':
        return <HomeDiscount key={index} block={block} />;
      case 'home_masters':
        return <MastersFeed key={index} block={block} />;
      case 'reviews_carousel':
        return <ReviewsCarousel key={index} block={block} />;
      default:
        break;
    }
  });
};

export default IndexPageLayout;
