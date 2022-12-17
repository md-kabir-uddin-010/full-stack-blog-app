import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewsCard from "../components/card/NewsCard";
import PopularCard from "../components/card/PopularCard";
import Loding from "../components/loading/Loding";
import { instance } from "../utils/axios/axios_interceptor";

export default function Home({ info }) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  let { limit: uLimit, page: uPage } = router.query;

  let page = uPage ? Number(uPage) : 1;
  let limit = uLimit ? Number(uLimit) : 20;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  let pageCount;
  if (info) {
    pageCount = Math.ceil(info.total_post / limit);
  }

  const nextPage = () => {
    if (page < pageCount) {
      router.push(`/?limit=${limit}&page=${page + 1}`);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      router.push(`/?limit=${limit}&page=${page - 1}`);
    }
  };

  if (isLoading) {
    return (
      <>
        <Loding />
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>home page -w3blog</title>
        <meta name="description" content="home page description w3blog" />
        <meta name="keywords" content="home page,w3blog" />
        <link rel="canonical" href="https://localhost:4000" />
      </Head>
      <main>
        <div className="pt-40 w-[1239px] min-h-[120vh] xl:w-full lg:w-full mdl:w-full mx-auto xl:px-3 lg:px-2 lg:pt-40 md:px-2 md:pt-28 sm:px-1 sm:pt-32">
          <div className=" flex mdl:flex-col gap-x-4">
            <div className=" w-[850px] mdl:w-full lg:px-2  mdl:px-6 ms:px-2 ">
              <div className=" flex items-center justify-center gap-4 last:justify-start flex-wrap ms:flex-col ">
                {info && info?.posts?.length === 0 && (
                  <p className=" capitalize text-center">no post found</p>
                )}
                {info &&
                  info?.posts?.map((post) => (
                    <NewsCard
                      key={post.id}
                      href={`/posts/${post?.slug}`}
                      data={post}
                    />
                  ))}
              </div>
              {info && info?.posts?.length !== 0 && (
                <div className=" text-center my-10">
                  <button
                    type="button"
                    onClick={previousPage}
                    className=" w-28 mx-6 text-sm outline-none capitalize hover:text-white hover:bg-sky-500 py-1 px-2 text-gray-500 border"
                  >
                    previous
                  </button>
                  <button
                    type="button"
                    onClick={nextPage}
                    className=" w-28 mx-6 text-sm outline-none capitalize hover:text-white hover:bg-sky-500 py-1 px-2 text-gray-500 border"
                  >
                    next
                  </button>
                </div>
              )}
            </div>
            <div className=" w-[380px] h-[600px] overflow-hidden  mdl:w-full shadow-[0_0_6px_rgb(0,0,0,0.12)] rounded-lg mdl:mt-8">
              <div className=" w-full mt-5 py-4 ">
                <h2 className="  text-center pb-5 text-3xl text-gray-700 ms:text-2xl border-b ms:break-all">
                  Populer Posts
                </h2>
                <div className="">
                  {info && info?.popular_posts?.length === 0 && (
                    <p className=" capitalize text-center">no post found</p>
                  )}
                  {info &&
                    info?.popular_posts?.map((post) => (
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
  const { limit, page } = context.query;
  let info;
  try {
    const numberOfPostlimit = limit ? parseInt(limit) : 20;
    const numberOfPage = page ? parseInt(page) : 1;
    const { data } = await instance.get(
      `/api/v1/get/all/post/with/popular/post?limit=${numberOfPostlimit}&page=${numberOfPage}`
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
