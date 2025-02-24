import Image from 'next/image';
import type { FC, Ref } from 'react';
import { useImageSize } from 'react-image-size';
import { Item } from 'react-photoswipe-gallery';

interface PortfolioCardProps {
  item: string;
}

const PortfolioCard: FC<PortfolioCardProps> = ({ item }) => {
  const [imageSize] = useImageSize(item);
  if (!imageSize) {
    return;
  }
  return (
    <div className="gallery-card group cursor-pointer">
      <Item
        original={item}
        thumbnail={item}
        width={imageSize?.width}
        height={imageSize?.height}
      >
        {({ ref, open }) => (
          <Image
            width={320}
            height={480}
            ref={ref as Ref<HTMLImageElement>}
            onClick={open}
            src={item}
            alt="Gallery image"
            className="gallery-card-img relative h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-125"
          />
        )}
      </Item>
    </div>
  );
};

export default PortfolioCard;
