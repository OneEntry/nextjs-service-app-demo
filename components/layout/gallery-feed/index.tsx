/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import TitleAnimations from '@/app/animations/TitleAnimations';
import { getChildPagesByParentUrl } from '@/app/api';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import getLqipPreview from '@/components/hooks/getLqipPreview';
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
      <div className="flex w-full flex-col">
        <TitleAnimations
          delay={0.5}
          className="mx-auto mb-12 flex w-auto flex-col gap-4"
        >
          <h2 className="title self-center text-4xl font-light uppercase leading-8 text-gray-600">
            {block?.localizeInfos?.title}
          </h2>
          <hr className="relative mb-2.5 h-px w-full max-w-[150px] self-center border-b border-solid border-b-gray-600" />
        </TitleAnimations>
        <div className="flex flex-col gap-0">
          <GalleryCarousel cards={feedCards} dict={dict} />
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
  return Promise.all(
    childPages?.flatMap(extractPhotosFromPage(parentPage)) || [],
  );
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
      async (photo: { previewLink: any; downloadLink: any }) => {
        const imgSrc = photo.previewLink || photo.downloadLink;
        const preview = await getLqipPreview(imgSrc);

        return {
          name: page.attributeValues?.master_id?.value[0]?.title || '',
          link,
          img: photo.downloadLink,
          thumb: photo.previewLink || photo.downloadLink,
          preview,
          spec: parentPage.localizeInfos,
        };
      },
    );
  };
}

export default GalleryFeed;
