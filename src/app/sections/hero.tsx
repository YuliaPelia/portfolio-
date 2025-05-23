

import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { getCurrentTime } from "@/features/getCurrentTime";
import { useLocale } from "next-intl";

export default function Hero() {
    const locale = useLocale();
    const t = useTranslations('Hero');


    const time = getCurrentTime()

    let greeting = t('greeting.day');

    if (time >= 23 && time <= 4 || time === 0) {


        greeting = t('greeting.night')
    }
    if (time < 12 && time > 4) {
        greeting = t('greeting.morning')
    }
    if (time > 12 && time < 18) {
        greeting = t('greeting.day')
    }
    if (time > 18 && time < 23) {
        greeting = t('greeting.evening')
    }

    return (
        <section className="hero">
            <div className="container">
                <Image className="hero__img" src="https://res.cloudinary.com/dboiqigz3/image/upload/v1746024824/girl-at-a-computer_2_zzwlwi.webp" alt={t('alt')} width={195} height={195} priority />
                <div>
                    <h1 className="hero__title">{greeting}</h1>
                    <h2 className="hero__subtitle">{t('title')}</h2>
                    <p className="hero__description">{t('description.part1')} {t('description.part2')} {t('description.part3')}</p>

                </div>

                <div className="hero__btns">
                    <Link href={`/${locale}/contact`}  className="hero__order"> {t('link')}</Link>

                    <button className="hero__btn">{t('btn')}</button>
                </div>

            </div>
        </section>
    )
}