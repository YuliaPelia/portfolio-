

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { Montserrat, Inter, Epilogue } from "next/font/google";



const inter = Inter({
  // variable: "--font-inter",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  // variable: "--font-montserrat",
  subsets: ["latin"],
});
const epilogue = Epilogue({
  // variable: "--font-epilogue",
  subsets: ["latin"],
})

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
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${montserrat.className} antialiased`} >

          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
      </body>
    </html>
  );
}