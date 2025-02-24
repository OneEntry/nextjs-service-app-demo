'use client';

import 'photoswipe/dist/photoswipe.css';

import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import { type FC, useEffect, useState } from 'react';
import { Gallery } from 'react-photoswipe-gallery';

import { shuffleArray } from '@/components/utils';

import GalleryCard from './components/GalleryCard';

interface PhotoDataProps {
  name: string;
  link: string;
  img: string;
  thumb: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any;
}

interface GalleryGridProps {
  dict: IAttributeValues;
  page: IPagesEntity;
  data: {
    masterId: string;
    photos: {
      previewLink: string;
      downloadLink: string;
    }[];
  }[];
  masters?: IAdminEntity[];
}

/**
 * GalleryGrid section
 * @returns React component
 */
const GalleryGrid: FC<GalleryGridProps> = ({ page, data, masters, dict }) => {
  const [galleryCards, setGalleryCards] = useState<Array<PhotoDataProps>>();

  // setGalleryCards
  useEffect(() => {
    const cardsData = data.flatMap((gallery) => {
      const master = masters?.find((m) => m.id === Number(gallery.masterId));
      if (!master) return [];
      console.log(gallery);

      const spec = page.attributeValues?.gallery_category?.value[0];
      const masterName = master.attributeValues?.master_name?.value || '';

      let link = `/masters/${master.id}`;
      if (spec?.id) {
        link += '?service=' + spec.id;
      }

      return gallery.photos.map((imgSrc) => ({
        name: masterName,
        link,
        img: imgSrc.downloadLink,
        thumb: imgSrc.previewLink || imgSrc.downloadLink,
        spec,
      }));
    });

    setGalleryCards(shuffleArray(cardsData.flat()));
  }, [data, masters, page]);

  return (
    <section className="flex w-full flex-col justify-center">
      <div className="mx-auto flex w-full flex-col">
        <div className="gradient-bg-line-20" />
        <div className="grid w-full grid-cols-6 gap-0 max-2xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          <Gallery>
            {galleryCards?.map((cardData, index) => (
              <GalleryCard key={index} dict={dict} cardData={cardData} />
            ))}
          </Gallery>
        </div>
      </div>
    </section>
  );
};

export default GalleryGrid;
