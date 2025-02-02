import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import Loading from '../components/loading';
import List from '../components/list';



export default function Service() {

    
    const t = useTranslations('Service');
    return (
        <section className="service">
            <div className="container">
                <h2 className="service__title title">{t('title')}</h2>
                <p className="service__description description">{t('description')}</p>

                <Suspense fallback={<Loading />}>
                    <List classForItem="service__item" />
                </Suspense>
            </div>
        </section>
    )
}