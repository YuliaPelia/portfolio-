// import ServiceItem from './service-item';
import Item from './item';
import { ItemData } from '@/types/types';

export default function ServiceList({ items, classForItem }: { items: ItemData[], classForItem: string }) {
    return (
        <ul className="list">
            {items.map((item, index) => (
                <Item key={index} item={item} classForItem={classForItem} />
            ))}
        </ul>
    );
} 