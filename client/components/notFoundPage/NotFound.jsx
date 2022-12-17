import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className=" w-full h-[90vh] flex items-center justify-center dark:bg-dark-primary">
      <div className="">
        <div className=" mb-4 capitalize text-center font-bold text-8xl md:text-6xl dark:text-white break-all">
          Oops!
        </div>
        <div className=" uppercase font-semibold text-center dark:text-gray-200 break-all">
          404 - page not found
        </div>
        <div className=" mt-2 text-center">
          <button
            type="button"
            className=" uppercase text-white bg-indigo-600 py-2 px-5 rounded-full outline-none border-none dark:text-gray-200 shadow-md break-all"
          >
            <Link href={"/"}>go to home page</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
