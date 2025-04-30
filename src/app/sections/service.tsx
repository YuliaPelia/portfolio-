'use client'

import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import Loading from '../components/loading';
import ServiceList from '../components/service-list';

interface ListItem {
    link: {
        title: string;
        link: string;
    };
    img: string;
    price: string;
}

export default function Service({ items, error, loading }: { items: ListItem[], error: boolean, loading: boolean }) {
    const t = useTranslations('Service');




    if (loading) {
        return (
            <section className="py-[60px] overflow-hidden font-montserrat">
                <div className=" relative ">
                    <Loading />
                </div>
            </section>
        );
    }


    return (
        <section className="service" id='services'>
            <div className="container">
                <h2 className="service__title title">{t('title')}</h2>
                <p className="service__description description">{t('description')}</p>
                {error ? <div className='text-red-500 mt-5'>{t('error')}</div> : ""}
                <Suspense fallback={<Loading />}>
                    <ServiceList items={items} classForItem="service__item" />
                </Suspense>
            </div>
        </section>
    )
}