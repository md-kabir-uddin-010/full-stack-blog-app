import moment from "moment";
import Link from "next/link";
import React from "react";

export default function PopularCard({ href, data }) {
  return (
    <div className=" text-center">
      <div className="  px-3 xl:px-2 lg:px-1 py-4 ">
        <Link
          className="  capitalize font-semibold text-[17px] xl:text-[17px] lg:text-[16px] md:text-[18px] sm:text-base hover:text-sky-600  transition-all xs:break-all"
          href={href}
        >
          {data?.title}
        </Link>
        <p className="  text-[11px]  text-gray-500  sm:pt-1 ms:break-all ">
          {data && moment.utc(data.createdAt).format("MMMM Do YYYY")}
          {/* createdAt */}
        </p>
      </div>
    </div>
  );
}
