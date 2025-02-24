import '@/app/globals.css';
import '@/app/styles/nav-menu.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import type { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '@/app/store/providers/AuthContext';
import { OpenDrawerProvider } from '@/app/store/providers/OpenDrawerContext';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import StoreProvider from '@/app/store/providers/StoreProvider';
import BottomMenu from '@/components/layout/bottom-menu';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import OffscreenModal from '@/components/layout/mobile-menu';
import Modal from '@/components/layout/modal';

import IntroAnimations from './animations/IntroAnimations';
import RegisterGSAP from './animations/RegisterGSAP';
import TransitionProvider from './animations/TransitionProvider';
import { getMenuByMarker } from './api';
import { getDictionary } from './api/utils/dictionaries';

// export const revalidate = 10;
// export const dynamicParams = true;

// Fonts settings
const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

/**
 * Homepage static metadata
 * @see {@link https://nextjs.org/docs/app/building-your-application/optimizing/metadata Next.js docs}
 * @param params page params
 */
export const metadata: Metadata = {
  title: 'OneEntry Beauty',
  description: 'OneEntry next-js Beauty description',
  openGraph: {
    type: 'website',
  },
};

/**
 * Root layout
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/layout Next.js docs}
 * @param params page params
 * @returns Root layout JSX.Element
 */
export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // Get dictionary and set to server provider
  const [dict] = ServerProvider('dict', await getDictionary());
  const { isError, menu } = await getMenuByMarker('main');

  if (isError || !menu) {
    return 'Menu error';
  }

  return (
    <html lang={'en_US'}>
      <body className={lato.className + ' flex flex-col min-h-screen'}>
        <RegisterGSAP />
        <StoreProvider>
          <AuthProvider>
            <OpenDrawerProvider>
              <Header menu={menu} />
              <TransitionProvider>
                <main className="flex flex-col overflow-hidden">
                  {children}
                </main>
              </TransitionProvider>
              <Footer dict={dict} />
              <BottomMenu dict={dict} />
              <Modal dict={dict} />
              <OffscreenModal menu={menu} />
            </OpenDrawerProvider>
          </AuthProvider>
        </StoreProvider>
        <IntroAnimations />
        <ToastContainer position="bottom-right" autoClose={2000} />
      </body>
    </html>
  );
}
