

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { Montserrat, Inter } from "next/font/google";

// type Props = {
//   params: Promise<{ locale: string }>
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }
type Locale = 'en' | 'ua' ;


const inter = Inter({
  // variable: "--font-inter",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  // variable: "--font-montserrat",
  subsets: ["latin"],
});


// export async function generateMetadata({ params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata>  {

//   const locale = (await params).locale
//   console.log('id',locale);
  
//   const previousImages = (await parent).openGraph?.images || []

//   console.log('previousImages',previousImages);
  
  

//   return {
//     title: '...',
//     metadataBase: new URL("http://localhost:3000/"),
//     openGraph: {
//       images: ['/image/OGP/fb.png', ...previousImages],
//     },
//   }
// }

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My portfolio",
};
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

          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
      </body>
    </html>
  );
}