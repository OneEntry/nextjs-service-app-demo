import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import { getChildPagesByParentUrl } from '@/app/api';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import { shuffleArray } from '@/components/utils';

import GalleryCarousel from './components/GalleryCarousel';

/**
 * Gallery Feed section
 * @returns React component
 */
const GalleryFeed: FC<{ block: IBlockEntity }> = async ({ block }) => {
  const [dict] = ServerProvider('dict');

  // Fetch child pages for the gallery and their respective child pages concurrently
  const parentPagesResponse = await getChildPagesByParentUrl('gallery');
  const parentPages = parentPagesResponse?.pages || [];

  const galleryDataPromises = parentPages.map(fetchGalleryData);
  const galleryData = (await Promise.all(galleryDataPromises)).flat();

  const feedCards = shuffleArray(galleryData).slice(0, 10);

  return (
    <section className="flex w-screen flex-col justify-center py-5">
      <div className="flex w-full flex-col bg-white">
        <h2 className="mb-12 self-center text-4xl font-light uppercase leading-8 text-gray-600">
          {block?.localizeInfos?.title}
        </h2>
        <div className="flex flex-col gap-0">
          <div className="w-full min-w-full">
            <GalleryCarousel cards={feedCards} dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to fetch gallery data for a specific parent page
async function fetchGalleryData(parentPage: IPagesEntity) {
  const { pages: childPages } = await getChildPagesByParentUrl(
    parentPage.pageUrl,
  );
  return childPages?.flatMap(extractPhotosFromPage(parentPage)) || [];
}

// Helper function to extract photos from a page entity
function extractPhotosFromPage(parentPage: IPagesEntity) {
  return (page: IPagesEntity) => {
    const masterId = page.attributeValues?.master_id?.value[0]?.value;
    const photos = page?.attributeValues?.gallery_photos?.value || [];
    let link = `/masters/${masterId}`;
    const idx = parentPage.attributeValues.gallery_category.value[0].id;
    if (idx) {
      link += `?service=${idx}`;
    }
    return photos.map(
      (photo: { downloadLink: string; previewLink: string }) => ({
        name: page.attributeValues?.master_id?.value[0]?.title || '',
        link,
        img: photo.downloadLink,
        thumb: photo.previewLink || photo.downloadLink,
        spec: parentPage.localizeInfos,
      }),
    );
  };
}

export default GalleryFeed;
