import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import Loading from '../components/loading';
import List from '../components/list';

export default function Service() {
    const t = useTranslations('Service');
    return (
        <section className="about">
            <div className="container">
                <h2 className="about__title title">{t('title')}</h2>
                <p className="description">{t('description')}</p>

                <Suspense fallback={<Loading />}>
                    <List />
                </Suspense>
            </div>
        </section>
    )
}