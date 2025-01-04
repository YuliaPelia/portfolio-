'use client';

import { useTranslations } from 'next-intl';

import { Header } from '../sections/header';
import { Footer } from '../sections/footer';
import { Provider } from 'react-redux';

import store from '@/store/store';
// import { getCurrentTheme } from '@/store/slices/theme';


export default function HomePage() {
    const t = useTranslations('HomePage');

    return (
        <Provider store={store}>
            <Header />
            <h1>{t('title')}</h1>
            {/* <Link href="/about">{t('about')}</Link> */}

            <Footer />
        </Provider>
    );
}