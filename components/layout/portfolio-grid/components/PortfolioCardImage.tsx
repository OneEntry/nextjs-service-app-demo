// import Image from 'next/image';
import { type FC, MouseEvent, type Ref, useEffect, useState } from 'react';
import { Item } from 'react-photoswipe-gallery';

import getImageSize from '@/components/hooks/getImageSize';
import Image from '@/components/shared/Image';
import Spinner from '@/components/shared/Spinner';

interface PortfolioCardProps {
  item: {
    img: string;
    thumb: string;
    preview: string;
    alt: string;
  };
}

const PortfolioCardImage: FC<PortfolioCardProps> = ({
  item: { img, thumb, preview, alt },
}) => {
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const fetchImageSize = async (img: string) => {
    try {
      const data = await getImageSize(img);
      setImageSize(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Get image size error:', error);
    }
  };

  useEffect(() => {
    if (imageSize) {
      return;
    }
    fetchImageSize(img);
  }, [imageSize, img]);

  return (
    <Item
      width={imageSize?.width}
      height={imageSize?.height}
      cropped
      original={img}
      thumbnail={thumb}
    >
      {({ ref, open }) => (
        <>
          <Image
            width={320}
            height={480}
            ref={ref as Ref<HTMLImageElement>}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e: any) => {
              if (imageSize) {
                open(e);
              }
            }}
            src={thumb}
            alt={alt}
            fetchPriority="high"
            placeholder="blur"
            blurDataURL={preview}
            className="gallery-card-img relative h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-125"
          />
          {!imageSize && <Spinner />}
        </>
      )}
    </Item>
  );
};

export default PortfolioCardImage;
