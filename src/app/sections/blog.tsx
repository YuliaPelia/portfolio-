
import { Suspense } from 'react';

import { useTranslations } from 'next-intl';

import Loading from '../components/loading';
import Image from 'next/image';

interface BlogItem {
    title: string;
    img: string;
}

export default function Blog({ items, error, loading }: { items: BlogItem[], error: boolean, loading: boolean }) {

    const t = useTranslations('Blog');

    if (loading) {
        return (
            <section className="py-[60px] overflow-hidden font-montserrat">
                <div className=" relative ">
                    <Loading />
                </div>
            </section>
        );
    }



    return (
        <section className="blog" id="blog">
            <div className="container ">
                <h2 className="blog__title title">{t('title')}</h2>
                <p className="blog__description description">{t('description')}</p>




                {error ? <div className='text-red-500 mt-5' >{t('error')}</div> : ""}
                <Suspense fallback={<Loading />}>
                    <ul className='blog__list'>
                        {items.map((item, index) => (
                            <li className='blog__item' key={index}>
                                <a href="#" className='blog__item-link'>
                                    <h3 className='blog__item-title'>{item?.title}</h3>
                                    <Image className='blog__img' src={item?.img} alt={item?.title} width={100} height={100} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </Suspense>

            </div>
        </section>
    )
}

// export async function getStaticProps() {
//     const data = await fetchData();
//     return {
//         props: {
//             data
//         }
//     }
// }