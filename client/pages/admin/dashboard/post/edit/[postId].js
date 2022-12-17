import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../../../../components/footer/Footer";
import Loding from "../../../../../components/loading/Loding";
import Navbar from "../../../../../components/navbar/Navbar";
import NotFound from "../../../../../components/notFoundPage/NotFound";
import EditPost from "../../../../../components/dashboard/post/EditPost";
import checkLogin from "../../../../../services/checkLogin";
import { useRef } from "react";

export default function Edit({ data }) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const isPreview = router.isPreview;

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

  if (isLoading) {
    return (
      <>
        <Loding />
      </>
    );
  }

  if (isPreview) {
    return (
      <div className=" pt-6">
        <div className=" text-4xl text-center font-bold capitalize text-gray-700 xs:text-lg py-4">
          edit post
        </div>
        <div className="px-10 lg:px-2">
          <EditPost />
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

Edit.DashboardLayout = function PageLayout(page) {
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
