import { fetchData } from "@/shared/api/fetchData"
import Item from "./item";
import { ItemData } from "@/types/types";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

interface ListProps {
    classForItem: string;
}
export default function List({ classForItem }: ListProps) {
    const [items, setItems] = useState([]);
    const locale = useLocale();


    useEffect(() => {
        fetchData().then((data) => {

            if (locale === 'en') {
                setItems(data[0].en.list);

            } else {
                setItems(data[0].ua.list);

            }


        });
    }, [locale]);

    return (
        <ul className="list">
            {items.map((item: ItemData, index: number) => (
                <Item key={index} item={item} classForItem={classForItem} />
            ))}
        </ul>
    )
}