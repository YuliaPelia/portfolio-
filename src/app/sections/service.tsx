'use client'

import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import Loading from '../components/loading';
import List from '../components/list';
import { useState, useEffect } from 'react';
import { fetchData } from "@/shared/api/fetchData"
import { useLocale } from "next-intl";



export default function Service() {
    const t = useTranslations('Service');
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState([]);
    const [error, setError] = useState<boolean>(false);
    const locale = useLocale();


    useEffect(() => {
        fetchData().then((data) => {
            if (locale === 'en') {
                setItems(data[0].en.list);
            } else {
                setItems(data[0].ua.list);
            }
            setLoading(false);
        }).catch(() => {
            setError(true);
            setLoading(false);
        });
    }, [locale]);

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
                {error ? <div className='text-red-500 mt-5' >{t('error')}</div> : ""}
                <Suspense fallback={<Loading />}>
                    <List items={items} classForItem="service__item" />
                </Suspense>
            </div>
        </section>
    )
}