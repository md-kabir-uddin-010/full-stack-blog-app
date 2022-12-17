import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import TableRow from "../../../components/dashboard/comment/TableRow";
import Footer from "../../../components/footer/Footer";
import Loding from "../../../components/loading/Loding";
import Navbar from "../../../components/navbar/Navbar";
import NotFound from "../../../components/notFoundPage/NotFound";
import { getAllComments } from "../../../redux/features/comment/action/commentAction";
import {
  approveCommentAndUpdateSate,
  removeComment,
} from "../../../redux/features/comment/slice/commentSlice";

import checkLogin from "../../../services/checkLogin";

export default function Comments({ data }) {
  const router = useRouter();
  const isPreview = router.isPreview;
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch();
  const { info, loading, success } = useSelector((state) => state.comment);

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
      dispatch(getAllComments({ page, limit }));
    },
    [dispatch]
  );

  useEffect(() => {
    fatchPosts(page, limit);
  }, [page, fatchPosts, limit]);

  let pageCount;
  if (success) {
    pageCount = Math.ceil(Number(info.total_comment) / limit);
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

  const handleRemoveComment = (id) => {
    dispatch(removeComment(id));
  };

  const handleApproveComment = (id) => {
    dispatch(approveCommentAndUpdateSate(id));
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
      <div className=" pt-10 ">
        <ToastContainer limit={1} />
        <div className="flex items-center justify-between xs:flex-col">
          <h1 className=" capitalize">all comments : </h1>
          <div className=" flex items-center ms:items-start ms:flex-col">
            <div className="capitalize text-lg font-medium text-gray-800">
              <p className=" capitalize">
                total comment : {info?.total_comment}
              </p>
            </div>
          </div>
        </div>
        {/* table  */}
        <div className=" overflow-auto">
          {!info?.comments && (
            <p className=" capitalize text-center">no post found</p>
          )}
          <table className=" mt-11 w-full border border-collapse">
            <thead>
              <tr>
                <th className=" border px-4 py-2 capitalize text-[#3f83f8]">
                  name
                </th>
                <th className=" border px-4 py-2 capitalize text-[#3f83f8]">
                  email
                </th>
                <th className=" border px-4 py-2 capitalize text-[#3f83f8]">
                  comment
                </th>
                <th className=" border px-4 py-2 capitalize text-[#3f83f8]">
                  post title
                </th>
                <th className=" border px-4 py-2 capitalize text-[#3f83f8]">
                  post slug
                </th>
                <th className=" border px-4 py-2 capitalize text-[#3f83f8]">
                  status
                </th>
                <th className=" border px-4 py-2 capitalize text-[#3f83f8]">
                  action
                </th>
                <th className=" border px-4 py-2 capitalize text-[#3f83f8]">
                  date
                </th>
              </tr>
            </thead>
            <tbody>
              {info?.comments?.map((comment) => (
                <TableRow
                  key={comment.id}
                  data={comment}
                  handleRemoveComment={handleRemoveComment}
                  handleApproveComment={handleApproveComment}
                />
              ))}
            </tbody>
          </table>
        </div>
        {/* pagination  */}
        <div className=" flex items-center justify-center mt-20">
          {info?.total_comment > 0 && (
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
        </div>{" "}
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

Comments.DashboardLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  return {
    props: {
      data: {},
    },
  };
}
