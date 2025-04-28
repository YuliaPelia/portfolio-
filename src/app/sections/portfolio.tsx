
import { useTranslations } from "next-intl"
export default function Portfolio() {
    const t = useTranslations('Portfolio');



    return (
        <section className="portfolio">
            <div className="container">
                <h2 className="portfolio__title title">{t('title')}</h2>
                <p className="portfolio__description">{t('description')}</p>
            </div>
        </section>
    )
}