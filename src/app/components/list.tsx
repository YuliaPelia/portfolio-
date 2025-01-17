import { fetchData } from "@/shared/api/fetchData"
import Item from "./item";
import { ItemData } from "@/types/types";
import { useEffect, useState } from "react";
export default function List() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData().then((data) => {
            setItems(data[0].list);
            console.log(data[0].list);
            
        });
    }, []);

    return (
        <ul>
            {items.map((item: ItemData, index: number) => (
                <Item  key={index} item={item} />
            ))}
        </ul>
    )
}