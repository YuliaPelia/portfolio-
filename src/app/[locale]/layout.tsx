// import type { Viewport } from 'next'

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { Montserrat, Inter } from "next/font/google";
import { getTranslations } from 'next-intl/server';
import { Props, Locale } from '@/types/types';
import BaseLayout from '../components/base-layout';
import { ThemeProvider } from '@/theme/Theme';
import ThemeHandler from '@/theme/ThemeHandler';
import '@/shared/api/fetchData';
import '@/styles/globals.scss';

const inter = Inter({
  // variable: "--font-inter",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  // variable: "--font-montserrat",
  subsets: ["latin"],
});


export async function generateMetadata({ params }: Props,

): Promise<Metadata> {

  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });


  // const previousImages = (await parent).openGraph?.images || []

  // console.log('previousImages',previousImages);



  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/image/favicon_io/favicon-16x16.png',
      apple: '/image/favicon_io/apple-touch-icon.png',
    },
    manifest: '/image/favicon_io/site.webmanifest',
    metadataBase: new URL(`https://portfolio-black-kappa-60.vercel.app/`),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `https://portfolio-black-kappa-60.vercel.app/`,
      siteName: 'Yulia Pelyachyk',

      images: [{
        url: locale === 'ua' ? '/image/OGP/fb.png' : '/image/OGP/fb-en.png',
        width: 1200,
        height: 630
      },
      {
        url: locale === 'ua' ? '/image/OGP/tw.png' : '/image/OGP/tw-en.png',
        width: 800,
        height: 600
      }],
    },
  }
}

// export const viewport: Viewport = {
//   themeColor: 'dark',
// }

// export const metadata: Metadata = {
//   title: "Portfolio",
//   description: "My portfolio",
// };
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;


  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }


  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${montserrat.className} ${inter.className} antialiased`} >
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeHandler>
              <BaseLayout>{children}</BaseLayout>
            </ThemeHandler>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}