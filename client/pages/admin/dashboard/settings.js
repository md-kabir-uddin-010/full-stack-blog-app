import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ChangePassword from "../../../components/dashboard/setting/ChangePassword";
import DeleteAccount from "../../../components/dashboard/setting/DeleteAccount";
import EditeProfile from "../../../components/dashboard/setting/EditeProfile";
import Footer from "../../../components/footer/Footer";
import Loding from "../../../components/loading/Loding";
import Navbar from "../../../components/navbar/Navbar";
import NotFound from "../../../components/notFoundPage/NotFound";
import checkLogin from "../../../services/checkLogin";

export default function Settings({ data }) {
  const router = useRouter();
  const isPreview = router.isPreview;
  const [editOpen, setEditOpen] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const { info } = useSelector((state) => state.auth);

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
      <div className=" relative pt-6">
        <ToastContainer limit={1} />
        <div className=" group relative  border w-96 rounded-lg mx-auto">
          <button
            onClick={() => {
              setChangePass(false);
              setEditOpen(true);
              setDeleteAccount(false);
            }}
            className=" hidden group-hover:block absolute top-2 right-2 w-6 h-6  transition-all"
          >
            <FontAwesomeIcon
              className=" w-full h-full text-gray-500  hover:text-black transition-colors"
              icon={faEdit}
            />
          </button>

          <button
            onClick={() => {
              setChangePass(false);
              setEditOpen(false);
              setDeleteAccount(true);
            }}
            className=" hidden group-hover:block absolute top-2 left-2 w-6 h-6  transition-all"
          >
            <FontAwesomeIcon
              className=" w-full h-full text-gray-500  hover:text-red-500 transition-colors"
              icon={faTrash}
            />
          </button>

          <div className=" my-10 text-center">
            <div className=" w-40 mx-auto ">
              <Image
                className=" w-40 h-40 object-fill bg-gray-200 rounded-full"
                width={160}
                height={160}
                src={info?.profile_picture}
                alt={"imge not found"}
              />
            </div>
            <div className=" mt-8">
              <p className="">{info?.name}</p>
              <p className="">{info?.email}</p>
            </div>
          </div>
          <div className=" text-right pr-4 pb-5">
            <button
              onClick={() => {
                setChangePass(true);
                setEditOpen(false);
                setDeleteAccount(false);
              }}
              className=" text-right capitalize hover:underline text-indigo-600"
            >
              change password
            </button>
          </div>
        </div>
        {editOpen && (
          <div className=" mt-6 w-full h-[85vh] absolute top-0 left-0 bg-[#F8FBFF]">
            <div className=" border px-2 pt-3 pb-6 rounded-lg w-96 mx-auto">
              <EditeProfile
                setChangePass={setChangePass}
                setEditOpen={setEditOpen}
              />
            </div>
          </div>
        )}
        {changePass && (
          <div className=" mt-6 w-full h-[85vh] absolute top-0 left-0 bg-[#F8FBFF]">
            <div className=" border px-2 pt-3 pb-6 rounded-lg w-96 mx-auto">
              <ChangePassword
                setChangePass={setChangePass}
                setEditOpen={setEditOpen}
              />
            </div>
          </div>
        )}
        {deleteAccount && (
          <div className=" mt-6 w-full h-[85vh] absolute top-0 left-0 bg-[#F8FBFF]">
            <div className=" border px-2 pt-3 pb-6 rounded-lg w-96 mx-auto">
              <DeleteAccount
                setChangePass={setChangePass}
                setEditOpen={setEditOpen}
                setDeleteAccount={setDeleteAccount}
              />
            </div>
          </div>
        )}
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

Settings.DashboardLayout = function PageLayout(page) {
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
