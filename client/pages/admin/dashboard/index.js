import {
  faBell,
  faBlog,
  faCalendarDays,
  faCommenting,
  faComments,
  faEye,
  faTrashAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnalysisCard from "../../../components/dashboard/card/AnalysisCard";
import PopularPostList from "../../../components/dashboard/post/PopularPostList";
import Footer from "../../../components/footer/Footer";
import Loding from "../../../components/loading/Loding";
import Navbar from "../../../components/navbar/Navbar";
import NotFound from "../../../components/notFoundPage/NotFound";
import { getAllPopularPost } from "../../../redux/features/post/actions/postAction";
import { removePopularPost } from "../../../redux/features/post/slice/postSlice";
import checkLogin from "../../../services/checkLogin";

export default function Dashboard({ data }) {
  const router = useRouter();
  const isPreview = router.isPreview;
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch();
  const { info, loading, success } = useSelector((state) => state.post);

  let loggedin;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loggedin = checkLogin();
    if (!loggedin && isPreview) {
      router.push("/admin/dashboard/login");
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isPreview, router]);

  const fatchPosts = useCallback(
    (page, limit) => {
      dispatch(getAllPopularPost({ page, limit }));
    },
    [dispatch]
  );

  useEffect(() => {
    fatchPosts(page, limit);
  }, [page, fatchPosts, limit]);

  let pageCount;
  if (success) {
    pageCount = Math.ceil(Number(info.total_post) / limit);
  }

  const nextPage = () => {
    if (page < pageCount) {
      setPage((prev) => prev + 1);
    }
  };
  const previousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleRemovePost = (id) => {
    dispatch(removePopularPost(id));
  };

  if (isLoading || loading) {
    return (
      <>
        <Loding />
      </>
    );
  }

  if (isPreview) {
    return (
      <div>
        <div className=" pt-6">
          {/* analysis card   */}

          {info && (
            <div className=" flex items-center gap-x-10 gap-y-10 flex-wrap">
              <AnalysisCard
                total={info?.total_admins}
                name={"admin"}
                icon={faUser}
              />
              <Link href={`/admin/dashboard/posts`}>
                <AnalysisCard
                  total={info?.total_posts}
                  name={"posts"}
                  icon={faBlog}
                />
              </Link>
              <Link href={`/admin/dashboard/comments`}>
                <AnalysisCard
                  total={info?.total_comments}
                  name={"comments"}
                  icon={faComments}
                />
              </Link>
              <Link href={`/admin/dashboard/comments`}>
                <AnalysisCard
                  total={info?.total_notifications}
                  name={"notifications"}
                  icon={faBell}
                />
              </Link>
            </div>
          )}

          <div className=" mt-8">
            <Link
              href={"/admin/dashboard/post/new"}
              className=" bg-indigo-500 text-gray-50 px-4 py-1.5 rounded-md capitalize"
            >
              create post
            </Link>
          </div>
          {/* populer posts  */}
          <div className=" w-full mt-10">
            <div className=" my-5 flex items-center justify-between ms:items-start ms:justify-start ms:flex-col">
              <h2 className=" pb-8 text-lg font-medium tracking-widest capitalize">
                populer posts :
              </h2>
              <div className=" flex items-center ms:items-start ms:flex-col">
                <div className="capitalize text-lg font-medium text-gray-800">
                  total count : {info?.total_post}
                </div>
              </div>
            </div>
            {/* table  */}
            <div className="">
              {info && info?.posts?.length === 0 && (
                <p className=" capitalize text-center">no post found</p>
              )}
              <ul className="overflow-x-auto">
                {info &&
                  info?.posts?.map((post) => {
                    return (
                      <PopularPostList
                        key={post.id}
                        data={post}
                        handleRemovePost={handleRemovePost}
                      />
                    );
                  })}
              </ul>
            </div>
            {/* pagination  */}
            <div className=" flex items-center justify-center mt-20">
              {info?.total_post > 0 && (
                <div className=" w-96">
                  <button
                    onClick={previousPage}
                    className=" my-3 w-28 mx-6 bg-indigo-500 text-white py-1 px-2 rounded-sm hover:bg-indigo-600"
                    type="button"
                  >
                    previous
                  </button>
                  <button
                    onClick={nextPage}
                    className=" my-3 w-28 mx-6 bg-indigo-500 text-white py-1 px-2 rounded-sm hover:bg-indigo-600"
                    type="button"
                  >
                    next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <NotFound />
        <Footer />
      </div>
    );
  }
}

Dashboard.DashboardLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  return {
    props: {
      data: {},
    },
  };
}
