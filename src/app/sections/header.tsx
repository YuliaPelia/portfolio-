'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/slices/theme";
import { RootState } from "@/store/store";

import { useLocale } from "next-intl";



export function Header() {

    const locale = useLocale();
    console.log('locale', locale);


    const t = useTranslations('Header');
    const dispatch = useDispatch();
    const isDarkTheme = useSelector((state: RootState) => state.theme.isDarkTheme);
    const tNavList = useTranslations('Header.list');
    const keys = ['about', 'services', 'portfolio', 'blog', 'contact'] as const;

    return (
        <div>
            <header className="header">
                <div className="container">
                    <Link href="/">
                        <Image
                            src="/image/header/logo-dark.svg"
                            alt="Logo"
                            width={50}
                            height={50}
                            priority
                            className="header__logo"
                        />
                    </Link>


                    <div className="header__toggle ">
                        <div></div>
                        <div></div>
                        <div ></div>
                    </div>

                    <div className="header__menu header__menu--active">
                        <ul className='header__list xl:flex xl:flex-row xl:gap-6'>
                            {keys.map((key) => (
                                <li key={key}>

                                    <Link className='header__link ' href={tNavList(`${key}.link`)}>{tNavList(`${key}.title`)}</Link>
                                </li>
                            ))}
                        </ul>

                        <nav className="header__nav">
                            <div className="header__lang">
                                <Link className="active" href={'/en'} >EN</Link>
                                <Link href={'/ua'} >UK</Link>
                            </div>
                            <Link className="header__btn" href={`/${locale}/contact`}>{t('contact')}</Link>

                            <button className="header__theme" onClick={() => dispatch(toggleTheme())} >
                                {isDarkTheme ? '🌙 Dark' : '☀️ Light'}
                            </button>
                        </nav>
                    </div>


                </div>
            </header>
        </div>
    );
}