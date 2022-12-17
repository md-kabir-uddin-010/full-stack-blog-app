import React from "react";
import FooterLink from "./FooterLink";

export default function Footer() {
  const copyright = process.env.NEXT_PUBLIC_COPYRIGHT_YEAR;
  const copyrightNow = new Date().getFullYear();

  return (
    <div className=" bg-[#F2F5F7]  py-6 mt-6">
      <div className=" w-[1280px] mx-auto xl:w-full xl:px-4 sm:px-1 grid grid-cols-12 lg:justify-items-center lg:grid-cols-1 lg:items-center ms:items-start">
        <div className=" col-span-8 ms:col-span-1">
          <ul className=" flex items-center ms:flex-col">
            <FooterLink href={"/about-us"} text={"about us"} />
            <FooterLink href={"/contact-us"} text={"contact us"} />
            <FooterLink href={"/privacy-policy"} text={"privacy policy"} />
          </ul>
        </div>
        <div className=" col-span-4 ms:col-span-1 text-gray-500 break-all">
          <div className=" ">
            <span className=" capitalize xs:block">copyright &copy;</span>
            <span className=" px-1 xs:block">
              {Number(copyright) === copyrightNow
                ? copyright
                : `${copyright} - ${copyrightNow}`}
            </span>
            <span className=" px-1 xs:block">
              {process.env.NEXT_PUBLIC_DOMAIN}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
