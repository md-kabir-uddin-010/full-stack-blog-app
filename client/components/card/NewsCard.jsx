import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NewsCard({ href, data }) {
  return (
    <div className=" w-[380px] min-h-[310px] 2xl:w-[360px] lg:w-[380px] mdl:w-[340px] sm:w-[380px] 400px:w-full pt-8 px-4 shadow-[0_0_4px_rgb(0,0,0,0.20)] rounded-lg">
      {/* title  */}
      <div className="">
        <Link
          className=" capitalize font-bold text-[20px] xl:text-[18px] lg:text-[16px] md:text-[18px] sm:text-[16px] ms:text-[14px] hover:text-sky-500  transition-all xs:break-all"
          href={href}
        >
          {data?.title}
        </Link>
      </div>
      {/* image  */}

      <div className=" my-3">
        {data?.thumbnail && (
          <Link href={href}>
            <Image
              className=" w-full h-full object-cover transition-all duration-[0.4s] rounded-lg overflow-hidden"
              width={300}
              height={200}
              src={data?.thumbnail}
              alt="thumbnail"
              priority
            />
          </Link>
        )}
      </div>

      {/* date  */}
      <div className=" sm:px-2 ms:px-2 ms:mx-auto">
        <p className=" text-[11px] text-gray-400 sm:pt-1 sm:break-all">
          {data && moment.utc(data.createdAt).format("MMMM Do YYYY")}
        </p>
      </div>
      {/* des  */}
      <div className=" my-2">
        <p className="">
          {data?.post_description && data.post_description.slice(0, 120)} ...
        </p>
      </div>
      <div className=" my-6">
        <Link
          className=" bg-[#000000] text-white px-4 py-2 rounded-sm overflow-hidden capitalize"
          href={href}
        >
          read more
        </Link>
      </div>
    </div>
  );
}
