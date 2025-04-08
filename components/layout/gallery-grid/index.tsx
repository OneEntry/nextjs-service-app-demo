import { notFound } from 'next/navigation';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import {
  getAdminsInfo,
  getChildPagesByParentUrl,
  getPageByUrl,
} from '@/app/api';
import getLqipPreview from '@/components/hooks/getLqipPreview';

import GalleryGrid from './components/GalleryGrid';

interface GalleryGridProps {
  handle: string;
  dict: IAttributeValues;
}

/**
 * Gallery section
 * @returns GalleryGrid
 */
const Gallery: FC<GalleryGridProps> = async ({ handle, dict }) => {
  const { page, isError } = await getPageByUrl(handle);
  const { pages: childPages } = await getChildPagesByParentUrl(handle);
  const { admins } = await getAdminsInfo({ body: [], offset: 0, limit: 100 });

  const masters = admins?.filter(
    (master: IAdminEntity) => master.attributeValues?.master_name && master,
  );

  if (!childPages || !masters || !page || isError) {
    return notFound();
  }

  const data =
    childPages.map((page: IPagesEntity) => {
      return {
        masterId: page?.attributeValues?.master_id.value?.[0]?.value,
        photos: page?.attributeValues?.gallery_photos?.value,
      };
    }) || [];

  const cardsData = await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.flatMap(async (gallery: { masterId: number; photos: any[] }) => {
      const master = masters?.find((m) => m.id === Number(gallery.masterId));
      if (!master) {
        return [];
      }

      const spec = page.attributeValues?.gallery_category?.value[0];
      const masterName = master.attributeValues?.master_name?.value || '';

      let link = `/masters/${master.id}`;
      if (spec?.id) {
        link += '?service=' + spec.id;
      }

      // Map through photos and create card data with LQIP previews
      return await Promise.all(
        gallery.photos.map(async (imgSrc) => ({
          name: masterName,
          link,
          img: imgSrc.downloadLink,
          thumb: imgSrc.previewLink || imgSrc.downloadLink,
          preview: await getLqipPreview(
            imgSrc.previewLink || imgSrc.downloadLink,
          ),
          spec,
        })),
      );
    }),
  );

  return (
    <div className="grid w-full grid-cols-6 gap-0 max-2xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
      <GalleryGrid dict={dict} cardsData={cardsData.flat()} />
    </div>
  );
};

export default Gallery;
