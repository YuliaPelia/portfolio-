import Image from "next/image";
import { useTranslations } from 'next-intl';


export default function About() {
    const t = useTranslations('About');

    return (
        <section className="about">
            <div className="container ">
                <h2 className="about__title title">{t('title')}</h2>
        <div className="about__content">
                <div>
                    <p className="about__description description">{t('description.part1')} <br /> <br /> {t('description.part2')} <br /> <br /> {t('description.part3')}</p>
                    <button className="about__btn btn">{t('btn')}</button>
                </div>

                <Image className="about__img" src="/image/sections/about/Me.webp" width={353} height={353} alt="about" />
            </div>
            </div>
        </section>
    )
}