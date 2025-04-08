import type { FC } from 'react';

import CardAnimations from '@/app/animations/CardAnimations';

const GalleryGridLoader: FC<{ handle: string }> = () => {
  return (
    <div className="grid w-full grid-cols-6 gap-0 max-2xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
      {Array.from({ length: 18 }).map((card, index) => {
        return (
          <CardAnimations
            className="group relative flex min-h-[320px] flex-col overflow-hidden max-md:min-h-[260px] max-xs:min-h-[240px] max-xs:min-w-[50vw]"
            index={index}
            key={index}
            loader={true}
          >
            <div className="group relative flex w-full flex-col justify-center">
              <figure className="relative flex min-h-[320px] w-full flex-col overflow-hidden bg-slate-100">
                <div className="gallery-card-img relative h-[320px] w-full object-cover duration-500 group-hover:scale-125 group-hover:transition-transform">
                  {/* <img src={card.preview} alt="..." /> */}
                </div>
              </figure>
            </div>
          </CardAnimations>
        );
      })}
    </div>
  );
};

export default GalleryGridLoader;
