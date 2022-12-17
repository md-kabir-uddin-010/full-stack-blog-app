import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import PostTableList from "../../../components/dashboard/post/PostTableList";
import Footer from "../../../components/footer/Footer";
import Loding from "../../../components/loading/Loding";
import Navbar from "../../../components/navbar/Navbar";
import NotFound from "../../../components/notFoundPage/NotFound";
import { getAllPost } from "../../../redux/features/post/actions/postAction";
import {
  addToPopularPost,
  removePost,
} from "../../../redux/features/post/slice/postSlice";
import checkLogin from "../../../services/checkLogin";

export default function Posts({ data }) {
  const router = useRouter();
  const isPreview = router.isPreview;
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

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
      dispatch(getAllPost({ page, limit }));
    },
    [dispatch]
  );

  useEffect(() => {
    fatchPosts(page, limit);
    setIsUpdate(false);
  }, [page, isUpdate, fatchPosts, limit]);

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
    dispatch(removePost(id));
  };
  const handlePopularPost = (id) => {
    dispatch(addToPopularPost(id));
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
      <div className=" pt-6">
        <ToastContainer limit={1} />
        <div className=" mt-5 mb-10 flex items-center justify-between ms:items-start ms:justify-start ms:flex-col">
          <div className="">
            <Link
              href={"/admin/dashboard/post/new"}
              className=" bg-indigo-500 text-gray-50 px-4 py-1.5 rounded-md capitalize"
            >
              create post
            </Link>
          </div>

          <div className=" flex items-center ms:items-start ms:flex-col">
            <div className="capitalize text-lg font-medium text-gray-800">
              total post : {info && info.total_post}
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
                  <PostTableList
                    key={post.id}
                    data={post}
                    handleRemovePost={handleRemovePost}
                    handlePopularPost={handlePopularPost}
                  />
                );
              })}
          </ul>
        </div>
        {/* pagination  */}
        <div className=" flex items-center justify-center mt-20">
          {/* pagination  */}
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
    );
  } else {
    return (
      <div className="">
        <Navbar />
        <NotFound />
        <Footer />
      </div>
    );
  }
}

Posts.DashboardLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  return {
    props: {
      data: {
        data: "i am ssg",
      },
    },
  };
}
