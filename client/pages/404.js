import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loding from "../components/loading/Loding";

export default function NotFound() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <>
        <Loding />
      </>
    );
  }
  return (
    <div className=" w-full h-[90vh] flex items-center justify-center dark:bg-dark-primary">
      <Head>
        <title>404 - w3blog</title>
        <meta name="keywords" content="404 ,w3blog" />
        <meta name="description" content="404 descriction w3blog" />
      </Head>
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
