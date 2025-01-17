'use client'

// import { useEffect } from 'react';
// import { setTheme } from '@/store/slices/theme';
import { Header } from '../sections/header';
import { Footer } from '../sections/footer';
import { Provider } from 'react-redux';
import store from '@/store/store';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    // useEffect(() => {
    //     // AOS.init({ duration: 1000,  once: true, });
    //     const savedTheme = localStorage.getItem('theme');
    //     if (savedTheme) {
    //         store.dispatch(setTheme(savedTheme as 'dark' | 'light'));
    //     }
    // }, []);

    return (
        <Provider store={store} >

            <Header />
            {children}
            <Footer />

        </Provider>
    )
}