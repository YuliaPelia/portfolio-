
import Link from "next/link";
import Image from "next/image";
import { ItemData } from "@/types/types";

export default function Item({ item,  }: { item: ItemData, }) {
    return (
        <li  className="relative">
            <Link
                href={item?.link?.link}
            >
                {item?.link?.title}
            </Link>
            <div >
                <Image
                    className="w-full h-full object-cover object-top"
                    src={item?.img}
                    width={146}
                    height={146}
                    alt="sticker"
                />
            </div>
        </li>
    )
}