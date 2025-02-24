import Image from 'next/image';
import type { FC, Ref } from 'react';
import { useImageSize } from 'react-image-size';
import { Item } from 'react-photoswipe-gallery';

interface CardImageProps {
  cardData: {
    name: string;
    img: string;
    thumb: string;
  };
}

const CardImage: FC<CardImageProps> = ({ cardData: { name, img, thumb } }) => {
  const [imageSize] = useImageSize(img);
  if (!imageSize) {
    return;
  }
  return (
    <Item
      cropped
      original={img}
      thumbnail={thumb}
      width={imageSize?.width}
      height={imageSize?.height}
    >
      {({ ref, open }) => (
        <Image
          width={320}
          height={480}
          ref={ref as Ref<HTMLImageElement>}
          onClick={(e) => {
            open(e);
          }}
          src={img}
          alt={name}
          className="gallery-card-img relative h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-125"
        />
      )}
    </Item>
  );
};

export default CardImage;
