import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import PopularCard from "../../components/card/PopularCard";
import CommentForm from "../../components/form/CommentForm";
import Loding from "../../components/loading/Loding";
import { instance } from "../../utils/axios/axios_interceptor";

export default function PostSlug({ info }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  const open_graph =
    info?.post?.open_graph && JSON.parse(info?.post?.open_graph);
  const twitter_card =
    info?.post?.twitter_card && JSON.parse(info?.post?.twitter_card);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <>
        <Loding />
      </>
    );
  }

  return (
    <div className=" w-full min-h-screen">
      <Head>
        {info?.post?.title !== "" && <title>{info?.post?.title}</title>}
        {info?.post?.description !== "" && (
          <meta
            name="description"
            content={`${info?.post?.description} w3blog`}
          />
        )}
        {info?.post?.title !== "" && (
          <meta name="keywords" content={`${info?.post?.keyword} w3blog`} />
        )}
        <link rel="canonical" href="https://localhost:4000" />
        {/* //open gtaph */}
        {open_graph.type && (
          <meta property="og:type" content={`${open_graph.type}`} />
        )}
        {open_graph.title && (
          <meta property="og:title" content={`${open_graph.title}`} />
        )}
        {open_graph.site_name && (
          <meta property="og:site_name" content={`${open_graph.site_name} `} />
        )}
        {open_graph.site_url && (
          <meta property="og:url" content={`${open_graph.site_url} `} />
        )}
        {open_graph.image && (
          <meta property="og:image" content={`${open_graph.image}`}></meta>
        )}
        {open_graph.description && (
          <meta
            property="og:description"
            content={`${open_graph.description}`}
          />
        )}
        {/* //twitter card */}
        {twitter_card.card && (
          <meta name="twitter:card" content={`${twitter_card.card}`} />
        )}
        {twitter_card.site && (
          <meta name="twitter:site" content={`${twitter_card.site}`} />
        )}
        {twitter_card.title && (
          <meta name="twitter:title" content={`${twitter_card.title} `} />
        )}
        {twitter_card.description && (
          <meta
            name="twitter:description"
            content={`${twitter_card.description}`}
          />
        )}
        {twitter_card.image && (
          <meta name="twitter:image" content={`${twitter_card.image}`} />
        )}
        {info?.post?.schema && info?.post?.schema !== "" && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.parse(info?.post?.schema) }}
          ></script>
        )}
      </Head>

      <main>
        <div className=" pt-40 w-[1239px] min-h-[120vh] xl:w-full lg:w-full mdl:w-full mx-auto xl:px-3 lg:px-2 lg:pt-40 md:px-2 md:pt-28 sm:px-1 sm:pt-32 ">
          <div className=" mb-8 lg:px-10 mdl:px-8 ms:px-2">
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
              <span className=" text-xs capitalize text-gray-400 break-all">
                {info?.post?.category}
              </span>
            </div>
            <h1 className=" font-bold text-3xl lg:text-2xl ms:text-xl uppercase break-all whitespace-pre-wrap">
              {info?.post?.category}
            </h1>
          </div>

          <div className=" flex lg:flex-col gap-x-5 lg:px-10 mdl:px-2 ms:px-0 ">
            <div className="  w-[850px] lg:w-full pt-6 xl:px-3 lg:px-2  mdl:w-full  mdl:px-6 ms:px-2  ms:pt-0  shadow-[0_0_6px_rgb(0,0,0,0.12)] rounded-lg px-3 lg:shadow-none">
              {/* main post  */}
              <div className="">
                <div className="">
                  {info?.post?.thumbnail && (
                    <Image
                      className=" w-full h-full object-cover transition-all duration-[0.4s] rounded-lg overflow-hidden"
                      width={800}
                      height={400}
                      src={info?.post?.thumbnail}
                      alt="thumbnail"
                      priority
                    />
                  )}
                </div>
                <div className=" mt-4">
                  <h1 className=" my-3 text-3xl ms:text-xl">
                    {" "}
                    {info?.post?.title}
                  </h1>
                </div>
                <div className=" mb-20">
                  {!info && (
                    <p className=" capitalize text-center">no post found</p>
                  )}
                  {info && info?.post && (
                    <div
                      className=" whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: JSON.parse(info?.post?.post),
                      }}
                    ></div>
                  )}
                </div>
                {/* comment section  */}
                <div className="  my-10">
                  <div className="">
                    <div className=" my-11">
                      <h2 className=" text-3xl lg:text-2xl ms:text-xl font-bold capitalize whitespace-pre-wrap">
                        one comment
                      </h2>
                      <hr className=" mt-10" />
                    </div>
                    <h2 className=" pb-3 text-xl font-bold break-all whitespace-pre-wrap">
                      Leave a Reply
                    </h2>
                    <p className=" flex ms:flex-col text-xs text-gray-500 break-all">
                      <span className="">
                        Your email address will not be published.
                      </span>
                      <span className="">
                        Required fields are marked{" "}
                        <span className=" text-red-500">*</span>
                      </span>
                    </p>
                  </div>
                  <div className="">
                    {/* comment form */}
                    {info && (
                      <CommentForm
                        data={info?.post}
                        post_id={info?.post?.id}
                        post_slug={info?.post?.slug}
                        poss_title={info?.post?.title}
                        setIsUpdate={setIsUpdate}
                      />
                    )}
                    {/* comments  */}
                    <div className="">
                      <hr className=" mt-20 px-4" />
                    </div>
                    <div className=" w-full max-h-96 overflow-y-auto">
                      {info &&
                        info?.comments?.map((comment) => {
                          return (
                            <div
                              key={comment.id}
                              className=" px-4 ms:px-2 xs:px-0 my-10 w-full flex gap-4 xs:flex-col"
                            >
                              <div className=" w-full border rounded-md px-4 py-2 xs:px-1">
                                <div className=" pt-2 w-full ">
                                  <h2 className=" text-xl capitalize font-semibold text-gray-800 break-all">
                                    {comment?.name}
                                  </h2>
                                  <p className=" text-[11px] text-gray-600 break-all">
                                    {comment &&
                                      moment
                                        .utc(comment.createdAt)
                                        .format("MMMM Do YYYY")}
                                  </p>
                                </div>
                                <div className=" pt-3 text-gray-800">
                                  <p className=" ml-4 ms:ml-0 xs:break-all">
                                    {comment?.comment}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-[380px]  h-[600px] overflow-hidden pb-2 lg:w-[80%] lg:mx-auto ms:w-full lg:shadow-none shadow-[0_0_6px_rgb(0,0,0,0.12)] rounded-lg lg:mt-6 mdl:mt-8">
              <div className=" w-full mt-5 py-4 ">
                <h2 className="  text-center pb-5 text-3xl text-gray-700 ms:text-2xl border-b ms:break-all">
                  Recent Posts
                </h2>
                {/* resent post  */}
                <div className="">
                  {info && info?.recent_post?.length === 0 && (
                    <p className=" capitalize text-center">no post found</p>
                  )}
                  {info &&
                    info?.recent_post?.map((post) => (
                      <PopularCard
                        key={post.id}
                        href={`/posts/${post?.slug}`}
                        data={post}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { post_slug } = context.query;

  let info;
  try {
    const { data } = await instance.get(
      `/api/v1/get/post/by/slug/${post_slug}`
    );
    info = data.info;
  } catch (error) {
    info = {};
  }
  return {
    props: {
      info,
    },
  };
}
