import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Footer from "../../../../../../components/footer/Footer";
import Loding from "../../../../../../components/loading/Loding";
import Navbar from "../../../../../../components/navbar/Navbar";
import NotFound from "../../../../../../components/notFoundPage/NotFound";
import { toast, ToastContainer } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../../../../../redux/features/auth/actions/authAction";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../../../../../components/dashboard/dashboardForm/InputField";
import checkLogin from "../../../../../../services/checkLogin";
import { useRef } from "react";

export default function ForgetPassword({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  const router = useRouter();
  const isPreview = router.isPreview;

  const dispatch = useDispatch();

  const { error, loading, success, message } = useSelector(
    (state) => state.auth
  );

  const initialValues = {
    email: "",
  };

  const handleSubmit = (value) => {
    const { email } = value;
    dispatch(forgetPassword({ email }));
    setIsSubmit(true);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("email is required"),
  });

  let loggedin;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loggedin = checkLogin();
    if (loggedin && isPreview) {
      router.push("/admin/dashboard");
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isPreview, router]);

  const errorMessage = (text) => toast.error(text, { toastId: "error1" });
  const successMessage = (text) => toast.success(text, { toastId: "succes1" });

  useEffect(() => {
    if (error && isSubmit) {
      errorMessage(error);
    }
    if (success && message && isSubmit) {
      successMessage(message);
    }
    if (success && isSubmit) {
      setTimeout(() => {
        router.push("/admin/dashboard/user/password/set");
      }, 5000);
    }
  }, [success, isSubmit, router, error, message]);

  if (isLoading) {
    return (
      <>
        <Loding />
      </>
    );
  }

  if (isPreview) {
    return (
      <div className=" w-full min-h-screen sm:px-10 ms:px-4 xs:px-1 flex items-center justify-center xs:flex-wrap transition-all">
        <ToastContainer limit={1} autoClose={4000} />
        <div className="">
          <div className=" py-9 w-[800px] h-auto lg:w-full ms:px-2 bg-gray-50 rounded-lg  shadow-md p-5">
            <p className=" text-center text-4xl font-extrabold text-gray-700 my-7 xs:text-sm">
              Forget Password
            </p>
            <div className=" flex items-center justify-center">
              <div className=" w-[400px] sm:w-full">
                <div className="">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <div className=" w-full">
                        <InputField
                          type={"email"}
                          name={"email"}
                          label={"email"}
                        />
                      </div>
                      <div className=" text-center mt-8">
                        <button
                          className={` ${
                            loading ? "cursor-not-allowed" : " cursor-pointer"
                          } font-bold my-7 text-xl w-48 h-14 xs:w-full bg-white shadow-md rounded-full`}
                          type="submit"
                          disabled={loading ? true : false}
                        >
                          {loading && isSubmit ? "loading..." : "send"}
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
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

ForgetPassword.noLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  return {
    props: {
      data: {},
    },
  };
}
