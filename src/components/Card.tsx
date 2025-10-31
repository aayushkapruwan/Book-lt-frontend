import React from "react";
import Link from "next/link";

interface CardProps {
    title: string;
    location: string;
    details: string;
    price: number;
    id: string;
    url: string;
}

function Card({ title, location, details, price, id, url }: CardProps) {
    return (

        <div className="relative w-[280px] h-85 bg-[#F0F0F0] rounded-xl ">
            <div className="w-full h-[54.48%]">
                <img src={url} className="w-full h-full rounded-t-xl" alt="" />
            </div>
            <div className="flex  w-full flex-col items-center justify-end">
                <div className="w-[88.57%] mx-2 flex justify-between mt-2 mb-3">
                    <p className="font-medium text-[16px] leading-5 tracking-[0]  ">{title}</p>
                    <p className="w-auto bg-[#D6D6D6] h-auto rounded-sm font-medium text-[11px] leading-4 font-serif px-2 py-1 tracking-[0]">{location}</p>
                </div>
                <div className="w-[88.57%] absolute bottom-9 text-[#6C6C6C] font-serif font-normal text-[12px] leading-4 tracking-[0] mb-3">{details}</div>
                <div className="w-[88.57%] absolute bottom-3 flex justify-between  ">
                    <div className="flex gap-1.5 justify-center items-center">
                        <p className=" font-normal text-[12px] leading-4 text-[#161616] tracking-[0]">From</p>
                        <p className=" font-medium text-[20px] leading-6 text-[#161616] tracking-[0]">{price}</p>
                    </div>
                    <Link href={`experience/${id}`} className="bg-[#FFD643] rounded-sm  opacity-100"><button className="  px-2 py-1.5 ">  View Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
