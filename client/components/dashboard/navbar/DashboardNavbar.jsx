import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function DashboardNavbar() {
  const { info } = useSelector((state) => state.auth);
  const { info: notification } = useSelector((state) => state.post);
  return (
    <nav className=" flex justify-between items-center ms:flex-col">
      <div className=" relative w-full pr-24 xl:pr-3">
        <label
          className="absolute top-3 left-0  w-4 h-4  px-4"
          htmlFor="search"
        >
          <FontAwesomeIcon className="w-4 h-4 text-gray-500" icon={faSearch} />
        </label>
        <input
          className=" w-full max-w-7xl block outline-none border-none placeholder:capitalize  pl-10 py-2 rounded-lg shadow-sm"
          type="text"
          name="search"
          id="search"
          placeholder=" search for statistics"
        />
      </div>
      <div className=" w-72 xl:w-64 lg:w-40 ms:w-full xs:flex-wrap ms:py-3 flex-none">
        <div className=" w-full flex items-center justify-center lg:justify-start ms:justify-start xs:flex-wrap">
          <div className=" relative mr-10 lg:mr-5 ">
            <Link href={"/admin/dashboard/comments"} className=" w-4 h-4">
              <FontAwesomeIcon
                className="w-5 h-5 text-gray-500"
                icon={faBell}
              />
            </Link>
            <span className=" text-center align-middle w-4 h-4 rounded-full bg-red-400 text-white absolute -top-2 -right-2 text-[10px]">
              {notification?.total_notifications}
            </span>
          </div>
          <div className=" flex items-center gap-x-5 sm:gap-x-2 xs:flex-wrap">
            <div className="">
              <Link href={"/admin/dashboard/settings"}>
                {info?.profile_picture && (
                  <Image
                    width={40}
                    height={40}
                    className=" w-10 h-10 rounded-full"
                    src={info?.profile_picture}
                    alt={"profile picture"}
                    priority
                  />
                )}
              </Link>
            </div>
            <div className=" whitespace-nowrap">{info?.name}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
