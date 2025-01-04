'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/slices/theme";
import { RootState } from "@/store/store";

import { useLocale } from "next-intl";
import { useState, useEffect, useRef } from "react";



export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const locale = useLocale();
    const t = useTranslations('Header');
    const dispatch = useDispatch();
    const isDarkTheme = useSelector((state: RootState) => state.theme.isDarkTheme);
    const tNavList = useTranslations('Header.list');
    const keys = ['about', 'services', 'portfolio', 'blog', 'contact'] as const;
    const headerMenuRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLDivElement>(null);

    const switchLang = (e: React.MouseEvent<HTMLDivElement>) => {

        if (locale === 'en') {
            return e.target instanceof HTMLElement &&
                e.target.classList.contains('header__lang--en')
                ? e.target.classList.add('active')
                : e.target instanceof HTMLElement &&
                e.target.classList.remove('active');
        } else {
            return e.target instanceof HTMLElement &&
                e.target.classList.contains('header__lang--ua')
                ? e.target.classList.add('active')
                : e.target instanceof HTMLElement &&
                e.target.classList.remove('active');
        }
    };

    useEffect(() => {
        const lang = document.querySelectorAll('.header__lang a');

        lang.forEach((item) => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `/${locale}`) {
                item.classList.add('active');
            }
        })


    }, [locale]);



    const headerMenu = headerMenuRef.current;
    const toggle = toggleRef.current;


    useEffect(() => {
        const isMenuOpen = JSON.parse(localStorage.getItem('isMenuOpen') || 'false');
        setIsMenuOpen(isMenuOpen);
    
        if (isMenuOpen) {
            headerMenuRef.current?.classList.add('header__menu--active');
            toggleRef.current?.classList.add('header__toggle--active');
        }
    }, [headerMenu]);
    

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        console.log(!isMenuOpen);
        localStorage.setItem('isMenuOpen', JSON.stringify(!isMenuOpen));

        toggle?.classList.toggle('header__toggle--active');
        headerMenu?.classList.toggle('header__menu--active');

    };

    return (
        <div className="bg-inherit">
            <header className="header">
                <div className="container">
                    <Link className="header__logo--link" href="/">
                        <Image
                            src={isDarkTheme ? "/image/header/logo-light.svg": "/image/header/logo-dark.svg"}
                            alt="Logo"
                            width={50}
                            height={50}
                            priority
                            className="header__logo"
                        />
                    </Link>

                    <div ref={toggleRef} className="header__toggle " onClick={toggleMenu}>
                        <div></div>
                        <div></div>
                        <div ></div>
                    </div>

                    <div className="header__menu" ref={headerMenuRef}>
                        <ul className='header__list xl:flex xl:flex-row xl:gap-6'>
                            {keys.map((key) => (
                                <li key={key}>

                                    <Link className='header__link ' href={`/${locale}/${tNavList(`${key}.link`)}`}>{tNavList(`${key}.title`)}</Link>
                                </li>
                            ))}
                        </ul>

                        <nav className="header__nav">
                            <div onClick={switchLang} className="header__lang">
                                <Link className="header__lang--en" href={'/en'} >EN</Link>
                                <Link className="header__lang--ua" href={'/ua'} >UA</Link>
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