import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import PhotoGallery from "../../../components/dashboard/card/PhotoGallery";
import UploadImageModal from "../../../components/dashboard/modal/UploadImageModal";
import Footer from "../../../components/footer/Footer";
import Loding from "../../../components/loading/Loding";
import Navbar from "../../../components/navbar/Navbar";
import NotFound from "../../../components/notFoundPage/NotFound";
import { getAllImages } from "../../../redux/features/gallery/action/galleryAction";
import { removeImage } from "../../../redux/features/gallery/slice/gallerySlice";
import checkLogin from "../../../services/checkLogin";

export default function Gallery({ data }) {
  const router = useRouter();
  const isPreview = router.isPreview;
  const [imageModal, setImageModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch();
  const { info, success } = useSelector((state) => state.gallery);

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
      dispatch(getAllImages({ page, limit }));
    },
    [dispatch]
  );

  useEffect(() => {
    fatchPosts(page, limit);
  }, [page, fatchPosts, limit]);

  let pageCount;
  if (success) {
    pageCount = Math.ceil(Number(info.total_images) / limit);
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

  const handleRemoveImage = (id) => {
    dispatch(removeImage(id));
  };

  if (isLoading) {
    return (
      <>
        <Loding />
      </>
    );
  }

  if (isPreview) {
    return (
      <div className=" relative">
        <ToastContainer limit={1} />
        <div className=" relative py-10">
          <h1 className="capitalize text-4xl font-semibold text-gray-700 text-center xs:text-base xs:whitespace-pre-wrap">
            photo gallery
          </h1>
          <div className=" flex items-center justify-between xs:flex-col">
            <div className=" text-2xl xs:text-base text-gray-700 capitalize">
              all images :{info?.total_images}
            </div>
            <div className="">
              <button
                onClick={() => setImageModal(!imageModal)}
                className=" capitalize bg-[#1877f2] text-white px-5 py-2 rounded-md"
              >
                upload image
              </button>
            </div>
          </div>
          {/* modal start */}
          <div
            className={` ${
              imageModal ? " block" : " hidden"
            } flex items-center justify-center fixed top-0 left-0  w-full h-screen bg-[#16121273] z-40  transition-all`}
          >
            <div className=" w-[768px] md:w-full mdl:mx-5 ms:mx-2 min-h-[66vh] bg-white rounded-xl">
              <div className=" text-right px-4 pt-4">
                <button
                  onClick={() => setImageModal(!imageModal)}
                  className=" w-8 h-8"
                >
                  <FontAwesomeIcon
                    className=" w-full h-full text-gray-700 hover:text-red-500"
                    icon={faXmark}
                  />
                </button>
              </div>
              <UploadImageModal setImageModal={setImageModal} />
            </div>
          </div>
          <div className="">
            {info && info?.images?.length === 0 && (
              <p className=" capitalize text-center">no image found</p>
            )}
          </div>

          {/* modal end */}
          <div className=" mt-10 flex items-center justify-center flex-wrap gap-5">
            {info &&
              info?.images?.map((image) => {
                return (
                  <PhotoGallery
                    key={image.id}
                    data={image}
                    handleRemoveImage={handleRemoveImage}
                  />
                );
              })}
          </div>
        </div>
        {/* pagination  */}
        <div className=" flex items-center justify-center mt-20">
          {info?.total_images > 0 && (
            <div className=" ">
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
      <div>
        <Navbar />
        <NotFound />
        <Footer />
      </div>
    );
  }
}

Gallery.DashboardLayout = function PageLayout(page) {
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
