import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC, Key } from 'react';

// import { Suspense } from 'react';
import { getBlocksByPageUrl, getPageByUrl } from '@/app/api';
import { getDictionary } from '@/app/api/utils/dictionaries';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import CatalogSection from '@/components/layout/catalog-grid';
import GalleryFeed from '@/components/layout/gallery-feed';
import HomeDiscount from '@/components/layout/home-discount';
import HomeHero from '@/components/layout/home-hero';
import MastersFeed from '@/components/layout/masters-feed';
import OffersFeed from '@/components/layout/offers-feed';
import ReviewsCarousel from '@/components/layout/reviews-carousel';
import { sortArrayByPosition } from '@/components/utils';

// export const revalidate = 10;
// export const dynamicParams = true;

const IndexPageLayout: FC = async () => {
  const [dict] = ServerProvider('dict', await getDictionary());
  const { page, isError } = await getPageByUrl('home');
  const { blocks } = await getBlocksByPageUrl({ pageUrl: page?.pageUrl || '' });
  if (isError || !page || !blocks) {
    return 'isError';
  }

  const sortedBlocks = sortArrayByPosition(blocks);

  return sortedBlocks?.map((block: IBlockEntity, index: Key) => {
    switch (block.identifier) {
      case 'home_hero':
        return <HomeHero key={index} block={block} dict={dict} />;
      case 'home_catalog':
        return (
          <div className="px-5 py-8">
            <CatalogSection key={index} block={block} />
          </div>
        );
      case 'home_gallery':
        return <GalleryFeed key={index} block={block} />;
      case 'home_offers_feed':
        return <OffersFeed key={index} block={block} dict={dict} />;
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
