import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { getCurrentTime } from "@/features/getCurrentTime";

export default function Hero() {

    const t = useTranslations('Hero');
    // const [greetingMessage, setGreetingMessage] = useState('');

    const time = getCurrentTime()
    console.log(time);
    let greeting = t('greeting.day');

    if (time >= 23 && time <= 4 || time === 0) {
        console.log('night');

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
                <Image className="hero__img" src="/image/sections/hero/girl-at-a-computer.webp" alt={t('alt')} width={195} height={195} priority />
                <div>
                    <h1 className="hero__title">{greeting}</h1>
                    <h2 className="hero__subtitle">{t('title')}</h2>
                    <p className="hero__description">{t('description.part1')} {t('description.part2')} {t('description.part3')}</p>

                </div>

                <div className="hero__btns">
                    <Link href="/contact" className="hero__order"> {t('link')}</Link>

                    <button className="hero__btn">{t('btn')}</button>
                </div>

            </div>
        </section>
    )
}