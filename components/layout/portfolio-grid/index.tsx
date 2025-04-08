/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { FC } from 'react';

import { getAdminsInfo, getPageById, getPagesByIds } from '@/app/api';
import getLqipPreview from '@/components/hooks/getLqipPreview';

import PortfolioGrid from './components/PortfolioGrid';

interface PortfolioGridLayoutProps {
  handle: any;
  searchData?: any;
}

/**
 * PortfolioGrid section
 * @returns React component
 */
const PortfolioGridLayout: FC<PortfolioGridLayoutProps> = async ({
  handle,
  searchData,
}) => {
  // masters
  const { admins } = await getAdminsInfo({ body: [], offset: 0, limit: 100 });
  const master = admins?.find(
    (admin: IAdminEntity) => admin.id === Number(handle),
  );

  // if no data in searchParams get first master service id
  const sId =
    searchData?.service || master?.attributeValues.services.value[0].id;

  const { page: service, isError } = await getPageById(sId as number);

  if (!master || isError) {
    return null;
  }

  const { master_portfolio } = master.attributeValues;
  const masterPortfolio = master_portfolio?.value || [];
  const ids = masterPortfolio?.map((v: { id: number }) => v.id);
  const parentIds = masterPortfolio?.map(
    (v: { parentId: number }) => v.parentId,
  );

  const { pages: childPages } = await getPagesByIds(ids);
  const { pages: parentPages } = await getPagesByIds(parentIds);

  const portfolioImages = await Promise.all(
    childPages?.flatMap((page) => {
      const isInService = parentPages?.find(
        (parent) =>
          Number(service?.id || 0) ===
          Number(parent.attributeValues.gallery_category?.value[0]?.id || 0),
      );
      if (isInService?.id === page.parentId || service === undefined) {
        return page.attributeValues.gallery_photos.value.map(
          async (imgSrc: { previewLink: string; downloadLink: string }) => {
            return {
              img: imgSrc.downloadLink,
              thumb: imgSrc.downloadLink,
              preview: await getLqipPreview(
                imgSrc.previewLink || imgSrc.downloadLink,
              ),
              alt: '...',
            };
          },
        );
      }
      return [];
    }) || [],
  );

  return (
    <div className="grid w-full grid-cols-6 gap-0 max-2xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
      <PortfolioGrid portfolioImages={portfolioImages} />
    </div>
  );
};

export default PortfolioGridLayout;
