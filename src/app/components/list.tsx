
import Item from "./item";
import { ItemData } from "@/types/types";


interface ListProps {
    classForItem: string;
    items: ItemData[]
}
export default function List({ classForItem, items }: ListProps) {


    return (
        <ul className="list">
            {items.map((item: ItemData, index: number) => (
                <Item key={index} item={item} classForItem={classForItem} />
            ))}
        </ul>
    )
}