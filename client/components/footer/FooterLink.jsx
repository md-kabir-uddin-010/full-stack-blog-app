import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function FooterLink({ text, href }) {
  const router = useRouter();
  return (
    <li className=" ">
      <Link
        className={`${
          router.pathname === href ? "text-blue-500" : "text-gray-600"
        }ms:w-full text-xs uppercase font-bold hover:text-blue-500 px-2`}
        href={href}
      >
        {text}
      </Link>
    </li>
  );
}
