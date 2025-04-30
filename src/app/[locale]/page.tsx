'use client';

import About from '../sections/about';
import Hero from '../sections/hero';
import Portfolio from '../sections/portfolio';
import Service from '../sections/service';
import Technologies from '../sections/technologies';
import Work from '../sections/work';
import Blog from '../sections/blog';
import { fetchData } from '@/shared/api/fetchData';
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react';


interface BlogItem {
    title: string;
    img: string;
}

interface ListItem {
    link: {
        title: string;
        link: string;
    };
    img: string;
    price: string;
}

interface Step {
    title: string;
    description: string;
}

interface Item {
    blogs: BlogItem[];
    list: ListItem[];
    options: Step[];
}

export default function HomePage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<Item>({blogs: [], list: [], options: []});
    const [error, setError] = useState<boolean>(false);
    const locale = useLocale();


    useEffect(() => {
        fetchData().then((data) => {
            if (locale === 'en') {
                setItems(data[0].en);
            } else {
                setItems(data[0].ua);
            }
            setLoading(false);
            console.log('items', data);

        }).catch(() => {
            setError(true);
            setLoading(false);
        });
    }, [locale]);




    return (
        // <Provider store={store} >
        // <Header />

        <>
            <Hero />
            <About />
            <Service items={items.list} error={error} loading={loading} />
            <Technologies />
            <Portfolio />
            <Work items={items.options} error={error} loading={loading} />
            <Blog items={items.blogs} error={error} loading={loading} />
        </>



        // </Provider>
    );
}

// export async function getStaticProps() {
//     const data = await fetchData();



//     return {
//         props: {
//             data: data,
//         },
//     };
// }