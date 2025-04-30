import { useTranslations } from "next-intl"
import { Suspense } from "react";

import { useLocale } from "next-intl";
import Loading from '../components/loading';
import StepsList from '../components/steps-list';
import Link from "next/link";



interface Step {
    title: string;
    description: string;
}

export default function Work({ items, error, loading }: { items: Step[], error: boolean, loading: boolean }) {
    const t = useTranslations('Work');
    const locale = useLocale();



    if (loading) {
        return (
            <section className="py-[60px] overflow-hidden font-montserrat">
                <div className=" relative ">
                    <Loading />
                </div>
            </section>
        );
    }

    // if(error) {
    //     return(
    //         <div>{t('error')}</div>
    //     )
    // }

    return (
        <section className="work">
            <div className="container">
                <h2 className="work__title title">{t('title')}</h2>
                <p className="work__description description">{t('description')}</p>
                <Link href={`/${locale}/services/brief`} className="work__link">
                    {t('order')}
                </Link>
                {error ? <div className="text-red-500 mt-5" >{t('error')}</div> : ""}

                <Suspense fallback={<Loading />}>
                    <StepsList items={items} classForItem="work__item" />
                </Suspense>
            </div>
        </section>
    )
}