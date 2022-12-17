import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewPostById from "../../../../../components/dashboard/post/ViewPostById";
import Footer from "../../../../../components/footer/Footer";
import Loding from "../../../../../components/loading/Loding";
import Navbar from "../../../../../components/navbar/Navbar";
import NotFound from "../../../../../components/notFoundPage/NotFound";
import { getPostById } from "../../../../../redux/features/post/actions/postAction";
import checkLogin from "../../../../../services/checkLogin";

export default function ViewPost({ data }) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const isPreview = router.isPreview;

  const dispatch = useDispatch();
  const { info, loading } = useSelector((state) => state.post);
  const { postId } = router.query;

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
    (post_id) => {
      dispatch(getPostById({ post_id }));
    },
    [dispatch]
  );

  useEffect(() => {
    postId && fatchPosts(postId);
  }, [router, fatchPosts, postId]);

  if (isLoading && loading) {
    return (
      <>
        <Loding />
      </>
    );
  }

  if (isPreview) {
    return (
      <div className=" pt-6">
        {/* view post  */}
        {!info?.post && (
          <p className=" capitalize text-center">no post found</p>
        )}
        {info?.post && <ViewPostById data={info?.post} />}
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

ViewPost.DashboardLayout = function PageLayout(page) {
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
