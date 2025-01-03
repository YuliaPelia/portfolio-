'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/slices/theme";
import { RootState } from "@/store/store";


export function Header() {

    const t = useTranslations('Header');
    const dispatch = useDispatch();
    const isDarkTheme = useSelector((state: RootState) => state.theme.isDarkTheme);


    return (
        <header className="header">
            <div className="container">
                <Link href="/">
                    <Image
                        src="/image/header/logo-dark.svg"
                        alt="Logo"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>

                <div >
                        <div>
                            <Link  href={'/'} locale="en">EN</Link>
                            <Link  href={'/'} locale="uk">UK</Link>
                        </div>
                        <Link href={'/contact'}>{t('contact')}</Link>

                        <button onClick={() => dispatch(toggleTheme())} >
                            {isDarkTheme ? '🌙 Dark' : '☀️ Light'}
                        </button>
                    </div>
            </div>
        </header>
    );
}