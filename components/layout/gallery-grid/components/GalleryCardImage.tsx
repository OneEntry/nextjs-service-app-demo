// import Image from 'next/image';
import type { FC, Ref } from 'react';
import { useEffect, useState } from 'react';
import { Item } from 'react-photoswipe-gallery';

import getImageSize from '@/components/hooks/getImageSize';
import Image from '@/components/shared/Image';
import Spinner from '@/components/shared/Spinner';

interface CardImageProps {
  cardData: {
    name: string;
    img: string;
    thumb: string;
    preview: string;
  };
  index: number;
}

const CardImage: FC<CardImageProps> = ({
  cardData: { name, img, thumb, preview },
}) => {
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [fetched, setFetched] = useState(false);

  const fetchImageSize = async (img: string) => {
    try {
      const data = await getImageSize(img);
      setImageSize(data);
      setFetched(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Get image size error:', error);
      setFetched(false);
    }
  };

  useEffect(() => {
    if (fetched && imageSize) {
      return;
    }
    fetchImageSize(img);
  }, [img, fetched, imageSize]);

  return (
    <Item
      width={imageSize?.width}
      height={imageSize?.height}
      original={img}
      thumbnail={thumb}
    >
      {({ ref, open }) => (
        <>
          <Image
            // width={320}
            // height={480}
            ref={ref as Ref<HTMLImageElement>}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e: any) => {
              if (imageSize) {
                open(e);
              }
            }}
            src={thumb}
            alt={name}
            placeholder="blur"
            blurDataURL={preview}
            fetchPriority="high"
            className="gallery-card-img relative h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-125"
          />
          {!imageSize && <Spinner />}
        </>
      )}
    </Item>
  );
};

export default CardImage;
