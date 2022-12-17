import { getServerSideSitemap } from "next-sitemap";
import { instance } from "../../utils/axios/axios_interceptor";

export async function getServerSideProps(context) {
  let info = [];
  try {
    const { data } = await instance.get(
      `/api/v1/get/all/popular/posts/without/limit`
    );
    info = data?.info?.posts
      ? data?.info?.posts?.map((post) => ({
          loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}/posts/${post?.slug}`,
          lastmod: `${post?.updatedAt}`,
          changefreq: "daily",
          priority: 0.7,
        }))
      : [];
  } catch (error) {
    info = [];
  }

  return getServerSideSitemap(context, info);
}

export default function Sitemap() {}
