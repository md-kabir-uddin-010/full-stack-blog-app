import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function DropdownLInk({ text, href, className }) {
  const router = useRouter();

  return (
    <li className={className}>
      <Link
        href={href}
        className={` ${
          router.pathname === href || router.asPath === href
            ? "text-blue-500"
            : "text-gray-600"
        } py-3 block ho text-xs font-bold px-4 uppercase hover:text-blue-500 hover:bg-gray-100`}
      >
        {text}
      </Link>
    </li>
  );
}
