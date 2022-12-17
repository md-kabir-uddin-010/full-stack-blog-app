import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function LinkItem({ text, href, className, onClick }) {
  const router = useRouter();

  return (
    <li className={`${className ? className : ""} w-full`}>
      <Link
        onClick={onClick}
        href={href}
        className={` ${
          router.pathname === href || router.asPath === href
            ? "text-blue-500"
            : "text-gray-600"
        } flex-none py-5 block  text-xs font-bold px-4 uppercase  hover:text-blue-500 lg:hover:bg-gray-100 lg:w-full lg:py-3`}
      >
        {text}
      </Link>
    </li>
  );
}
