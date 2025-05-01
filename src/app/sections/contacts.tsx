import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from "next-intl";
import Form from '../components/form/form';
import formData from '@/form-data/form.json';
import type { FormFields } from '@/types/types';


export default function Contacts() {
    const t = useTranslations('Contacts');
    const locale = useLocale();
    const social = [
        {
            title: 'Instagram',
            link: 'https://www.instagram.com/yulchik.peekaboo/',
            icon: '/image/symbol-defs.svg#instagram'
        },
        {
            title: 'Telegram',
            link: 'https://t.me/yulchiksss',
            icon: '/image/symbol-defs.svg#telegram'
        },
        {
            title: 'Facebook',
            link: 'https://www.facebook.com/profile.php?id=100011394627498',
            icon: '/image/symbol-defs.svg#facebook'
        },
        {
            title: 'LinkedIn',
            link: 'https://www.linkedin.com/in/yulia-peliachyk-bba6a7251/',
            icon: '/image/symbol-defs.svg#linkedin'
        }
    ];

    const formFields = formData.inputsFieldsSection as FormFields;
    const crmParams = {
        productName: "GoITeens_Anime",
        productId: "550375000668179745",
        esputnikGroupsName: "GoITeens_Maluvannya_Anime",
        esputnikFormType: "Maluvannya_Anime",
        isModal: false,
        redirectUrl: "https://anime.goiteens.com/success",

        leelooHash: "",
    };

    return (
        <section className='contacts'>
            <div className="container">
                <h2 className='title'>{t('title')}</h2>
                <p className='description mt-6' dangerouslySetInnerHTML={{ __html: t('description') }}></p>
                <ul className="flex gap-4 mt-6">
                    {social.map(({ title, link, icon }) => (
                        <li key={title}>
                            <Link className='contacts__link' href={link} target="_blank" rel="noopener noreferrer">
                                <svg className='fill-light duration-200' width="40" height="40" aria-label={title}>
                                    <use href={icon}></use>
                                </svg>
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link href={`/${locale}/services/brief`} className="btn mt-10 block max-w-[300px]">
                    {t('order')}
                </Link>
                <div>
                    <h3 className='title text-center'>{t('form.title')}</h3>
                    <p className='description text-center' dangerouslySetInnerHTML={{ __html: t('form.description') }}></p>
                    <Form formFields={formFields} crmParams={crmParams} />
                </div>
            </div>
        </section>
    )
}