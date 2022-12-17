import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Tooltip from "../../tooltip/Tooltip";

export default function DashbordLink({ link, text }) {
  const router = useRouter();

  return (
    <div
      className={`${
        router.asPath === link ? "bg-slate-100" : ""
      } my-5 py-2 px-3 flex items-center lg:block lg:my-3  lg:px-0 lg:pl-2  rounded-md hover:bg-slate-100 transition-all`}
    >
      <div className=" group relative w-6 h-6 ">
        <div className=" w-28 hidden lg:group-hover:block lg:absolute lg:top-0 lg:left-[50px]">
          <Tooltip text={text} />
        </div>
        <Link className=" w-full block text-[#1577f7b0]" href={link}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <rect width="9" height="9" x="2" y="2" fill="#6563ff" rx="1" />
            <rect width="9" height="9" x="2" y="13" fill="#b2b1ff" rx="1" />
            <rect width="9" height="9" x="13" y="2" fill="#b2b1ff" rx="1" />
            <rect width="9" height="9" x="13" y="13" fill="#b2b1ff" rx="1" />
          </svg>
        </Link>
      </div>
      <div className=" w-full ml-3 lg:hidden">
        <Link
          className=" w-full block font-medium capitalize text-lg  text-[#1577f7b0] "
          href={link}
        >
          {text}
        </Link>
      </div>
    </div>
  );
}
