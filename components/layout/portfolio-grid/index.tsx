import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import { getPagesByIds } from '@/app/api';

import PortfolioGrid from './components/PortfolioGrid';

interface PortfolioGridLayoutProps {
  master: IAdminEntity;
  service?: IPagesEntity;
}

/**
 * PortfolioGrid section
 * @returns React component
 */
const PortfolioGridLayout: FC<PortfolioGridLayoutProps> = async ({
  master,
  service,
}) => {
  const { master_portfolio } = master.attributeValues;
  const masterPortfolio = master_portfolio?.value || [];
  const ids = masterPortfolio?.map((v: { id: number }) => v.id);
  const parentIds = masterPortfolio?.map(
    (v: { parentId: number }) => v.parentId,
  );

  const { pages: childPages } = await getPagesByIds(ids);
  const { pages: parentPages } = await getPagesByIds(parentIds);

  const portfolioImages =
    childPages?.flatMap((page) => {
      const isInService = parentPages?.find(
        (parent) =>
          Number(service?.id || 0) ===
          Number(parent.attributeValues.gallery_category?.value[0]?.id || 0),
      );
      if (isInService?.id === page.parentId || service === undefined) {
        return page.attributeValues.gallery_photos.value.map(
          (photo: { downloadLink: string }) => photo.downloadLink,
        );
      }
      return [];
    }) || [];

  return (
    <section className="flex w-full flex-col justify-center">
      <div className="mx-auto flex w-full flex-col">
        <div className="gradient-bg-line-20"></div>
        <div className="grid w-full grid-cols-6 gap-0 max-2xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          <PortfolioGrid portfolioImages={portfolioImages} />
        </div>
      </div>
    </section>
  );
};

export default PortfolioGridLayout;
