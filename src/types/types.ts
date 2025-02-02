export type Props = {
    params: Promise<{ locale: string }>

}
export type Locale = 'en' | 'ua';

export interface ItemData {
    id: number;
    title: string;
    description: string;
    img: string;
    link: {
        title: string;
        link: string;
    };

    price: string;
}