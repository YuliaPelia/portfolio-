import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Hero() {
    const t = useTranslations('Hero');
    return (
        <section className="hero">
            <div className="container">
                <Image className="hero__img" src="/image/sections/hero/girl-at-a-computer.webp" alt={t('alt')} width={195} height={195} priority />
                <div>
                    <h1 className="hero__title">{t('greeting.day')}</h1>
                    <h2 className="hero__subtitle">{t('title')}</h2>
                    <p className="hero__description">{t('description.part1')} {t('description.part2')} {t('description.part3')}</p>

                </div>

                <Link href="/contact" className="hero__order"> {t('link')}</Link>

                <button className="hero__btn">{t('btn')}</button>
            </div>
        </section>
    )
}