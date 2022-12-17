import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loding from "../components/loading/Loding";

export default function About() {
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
        <title>about us - w3blog</title>
        <meta name="keywords" content="about us ,w3blog" />
        <meta name="description" content="about us descriction w3blog" />
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
            <span className=" text-xs capitalize  break-all">about-us</span>
          </div>
          <h1 className=" mb-14 font-bold text-3xl capitalize break-all">
            about us
          </h1>
        </div>
        <div className="">
          <p className=" pb-8">
            Techworm is a carefully curated online technology news website
            covering everything under the umbrella of computers, mobile, and
            real-world technologies.
          </p>
          <p className=" pb-8">
            A decade ago, what was started by a passionate individual with a
            zeal for cyber-security molded into a greater avenue of delivering
            the 3 R’s of content – Reliability, Research, and Rounded.
          </p>
          <p className=" pb-8">
            You will find over 11,000 pieces of content published and polished
            by cyber security researchers, engineers, consultants, speakers, and
            professionals from other fields. The content’s purview ranges from
            How-Tos, cyber-security news, and in-depth reviews of the software
            and products.
          </p>
          <p className=" pb-8">
            Our focal point has been easy-to-follow, jargon-free articles that
            are quick to grasp—catering to a wide spectrum of users with varying
            levels of technical knowledge.
          </p>
        </div>
        <div className="">
          <h2 className="  mb-14 capitalize font-semibold text-3xl">
            growing trust
          </h2>
          <p className=" pb-8">
            Many technology websites have inspired us over the years with their
            flabbergasting content. At every step, they push us to amp up the
            benchmarks we set for ourselves.
          </p>
          <p className=" pb-8">
            Showcasing their trust in our content, they have referenced back to
            us for several of their pieces.
          </p>
        </div>
      </div>
    </div>
  );
}
