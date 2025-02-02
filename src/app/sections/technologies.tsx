import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useTheme } from "@/theme/Theme";



export default function Technologies() {
    const t = useTranslations('Technologies');
    const { theme } = useTheme();

    return (
        <section className="technologies" id="technologies">
            <div className="container">
                <h2 className="technologies__title title">{t('title')}</h2>
                <ul className='technologies__list'>
                    <li className='technologies__item'>
                        <Image className='technologies__image' src={theme === 'light'? "https://res.cloudinary.com/dboiqigz3/image/upload/v1738492010/nextjs-icon_w0ihll.svg" : "https://res.cloudinary.com/dboiqigz3/image/upload/v1738493698/nextjs_pwtodr.png"} alt="technologies" width={170} height={170} />
                    </li>
                    <li className='technologies__item'>
                        <Image className='technologies__image' src="https://res.cloudinary.com/dboiqigz3/image/upload/v1738494441/icon_lqmdos.svg" alt="technologies" width={170} height={170} />
                    </li>
                    <li className='technologies__item'>
                        <Image className='technologies__image' src="https://res.cloudinary.com/dboiqigz3/image/upload/v1738493003/HTML-CSS-JS-Logo_xa0gyx.png" alt="technologies" width={170} height={170} />
                    </li>

                    <li className='technologies__item'>
                        <Image className='technologies__image' src="https://res.cloudinary.com/dboiqigz3/image/upload/v1738492246/Figma-logo_ndhd4k.svg" alt="technologies" width={170} height={170} />
                    </li>
                    <li className='technologies__item'>
                        <Image className='technologies__image' src="https://res.cloudinary.com/dboiqigz3/image/upload/v1738492456/Tailwind_CSS_Logo.svg_axvopc.png" alt="technologies" width={170} height={170} />
                    </li>
                    <li>
                        <Image className='technologies__image' src="https://res.cloudinary.com/dboiqigz3/image/upload/v1738493090/Jenkins_logo.svg_fdfhn8.png" alt="technologies" width={170} height={170} />
                    </li>
                </ul>
            </div>

        </section>
    )
}