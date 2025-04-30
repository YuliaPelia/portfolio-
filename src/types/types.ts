export type Props = {
    params: Promise<{ locale: string }>

}
export type Locale = 'en' | 'ua';

export interface ItemData {
    img: string;
    price: string;
    link: {
        title: string;
        link: string;
    };
}