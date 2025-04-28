import { useTranslations } from "next-intl"
import { Suspense } from "react";
import { fetchData } from "@/shared/api/fetchData"
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import Loading from '../components/loading';
import StepsList from '../components/steps-list';
import Link from "next/link";



interface Step {
    title: string;
    description: string;
}

export default function Work() {
    const t = useTranslations('Work');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const [steps, setSteps] = useState<Step[]>([]);
    const locale = useLocale();


    useEffect(() => {
        fetchData().then((data) => {
            if (locale === 'en') {
                setSteps(data[0].en.options);


            } else {
                setSteps(data[0].ua.options);

            }
            if (data[0].en.options.length === 0 || data[0].ua.options.length === 0) {
                setError(true);
                console.log('error');

            }


            setLoading(false);

        })
            .catch(() => {
                setLoading(false);
                setError(true)
                console.log(error);

            })
    }, [locale, error]);

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
                    <StepsList items={steps} classForItem="work__item" />
                </Suspense>
            </div>
        </section>
    )
}