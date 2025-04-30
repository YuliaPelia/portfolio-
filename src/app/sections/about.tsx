import Image from "next/image";
import { useTranslations } from 'next-intl';


export default function About() {
    const t = useTranslations('About');

    return (
        <section className="about" id="about">
            <div className="container ">
                <h2 className="about__title title">{t('title')}</h2>
                <div className="about__content">
                    <div>
                        <p className="about__description description"><span>{t('description.part1')}<br /> <br  /> {t('description.part2')}</span> <br /> <br /> <span>{t('description.part3')}</span></p>
                        <button className="about__btn btn">{t('btn')}</button>
                    </div>

                    <Image className="about__img" src="https://res.cloudinary.com/dboiqigz3/image/upload/v1746024070/IMG_8107_1_2_jjep4g.webp" width={353} height={353} alt="about" />
                </div>
            </div>
        </section>
    )
}