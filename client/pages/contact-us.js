import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loding from "../components/loading/Loding";

export default function Contact() {
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
    <div className=" pt-40 w-full min-h-screen">
      <Head>
        <title>contact us - w3blog</title>
        <meta name="keywords" content="contact us ,w3blog" />
        <meta name="description" content="contact us descriction w3blog" />
      </Head>
      <div className=" w-[1139px] mx-auto xl:w-full xl:px-9 sm:px-6 ms:px-3">
        <div className="">
          <div className=" flex items-center pb-3 xs:flex-wrap break-all">
            <Link
              href={"/"}
              className=" text-xs capitalize bg-black text-white hover:text-gray-300  rounded-[3px] p-[3px] break-all"
            >
              home
            </Link>
            <span className=" ml-1">
              <svg
                className="fill-current h-4 w-4 -rotate-90  text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
            <span className=" text-xs capitalize  break-all">contact-us</span>
          </div>
          <h1 className=" mb-14 font-bold text-3xl capitalize break-all">
            contact us
          </h1>
        </div>
        <div className="">
          <p className=" pb-8">
            We hope that you are enjoying Lists For All, but if you need
            anything extra from us, please feel free to reach out to us. Our
            goal is to provide the best lists of resources on the internet, and
            if there is a way that we can improve that or if you need something
            else from us, please don’t hesitate to shoot us an email at
            Kyle@ListsForAll.com.
          </p>
          <p className=" pb-8">
            Because of the large number of emails that we receive, please be
            patient with us as we do our best to reply to you in a timely
            fashion. Also, if you have a business inquiry, please make sure to
            note that in your email.
          </p>
          <p className=" pb-8">We look forward to hearing from you!</p>
        </div>
      </div>
    </div>
  );
}
