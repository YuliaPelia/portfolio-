
import Link from "next/link";
import Image from "next/image";
import { ItemData } from "@/types/types";
import { cn } from "@/lib/utils";

export default function Item({ item, classForItem }: { item: ItemData, classForItem: string }) {
    return (
        <li  className={cn(classForItem)}>
            <Link className="w-full h-full block"
                href={item?.link?.link}
            >
             <h3 className="item__link">
             {item?.link?.title}
             </h3>

                <div >
                <Image
                    className='item__img'
                    src={item?.img}
                    width={146}
                    height={146}
                    alt="sticker"
                />
            </div>

            <span className="item__price">{item?.price}</span>
            </Link>

        </li>
    )
}