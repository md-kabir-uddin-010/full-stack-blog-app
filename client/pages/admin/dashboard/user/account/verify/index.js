import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../../../../../components/footer/Footer";
import Loding from "../../../../../../components/loading/Loding";
import Navbar from "../../../../../../components/navbar/Navbar";
import NotFound from "../../../../../../components/notFoundPage/NotFound";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  resendOTP,
  signupVerify,
} from "../../../../../../redux/features/auth/actions/authAction";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../../../../../components/dashboard/dashboardForm/InputField";
import { decodePass } from "../../../../../../services/auth_service";
import checkLogin from "../../../../../../services/checkLogin";
import { useRef } from "react";

export default function Verify({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isResendOTP, setIsResendOTP] = useState(false);

  const router = useRouter();
  const isPreview = router.isPreview;

  let getUserInfo = null;
  if (typeof window !== "undefined") {
    getUserInfo =
      localStorage.getItem("info") && JSON.parse(localStorage.getItem("info"));
  }

  const dispatch = useDispatch();

  const { error, loading, success, message } = useSelector(
    (state) => state.auth
  );

  const initialValues = {
    token: "",
  };

  const handleSubmit = (value) => {
    setIsSubmit(true);
    const { token } = value;
    if (getUserInfo) {
      dispatch(signupVerify({ user_id: getUserInfo.id, token }));
    }
  };

  const validationSchema = Yup.object({
    token: Yup.string()
      .matches(/^\d+$/, "The field should have digits only")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits")
      .required("OTP code is required"),
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
    if (error && isResendOTP) {
      errorMessage(error);
    }

    if (success && message && isResendOTP) {
      successMessage(message);
    }

    if (error && isSubmit) {
      errorMessage(error);
    }
    if (success && isSubmit) {
      router.push("/admin/dashboard");
    }
  }, [success, isSubmit, router, error, isResendOTP, message]);

  const handleResend = () => {
    const userPass = decodePass();
    const userEmail = getUserInfo.email;
    if (userEmail && decodePass) {
      dispatch(resendOTP({ email: userEmail, password: userPass }));
      setIsSubmit(false);
      setIsResendOTP(true);
    }
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
      <div className=" w-full min-h-screen sm:px-10 ms:px-4 xs:px-1 flex items-center justify-center xs:flex-wrap transition-all">
        <ToastContainer limit={1} autoClose={4000} />
        <div className="">
          <div className=" py-9 w-[800px] h-auto lg:w-full ms:px-2 bg-gray-50 rounded-lg  shadow-md p-5">
            <p className=" text-center text-4xl font-extrabold text-gray-700 my-7 xs:text-sm">
              Signup Account Verification
            </p>
            <div className=" flex items-center justify-center">
              <div className="">
                <p className=" w-[400px] ms:w-full  text-gray-600 text-sm whitespace-pre-wrap">
                  <b>{getUserInfo && getUserInfo.email}</b> an OTP code has been
                  sent to your entered email
                </p>
                <p className=" text-gray-600  my-3 text-sm"></p>
                <div className="">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <div className="">
                        <InputField
                          type={"text"}
                          name={"token"}
                          label={"Enter your Code here"}
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
                          {loading && isSubmit ? "loading..." : "verify"}
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <div className=" flex items-center justify-center  gap-x-2 mt-3  xs:flex-col xs:justify-start">
                  <p className=" text-gray-600  text-sm">
                    {` Didn\'t receive the code\?`}
                  </p>
                  <button
                    onClick={handleResend}
                    disabled={loading ? true : false}
                    type="button"
                    className={` ${
                      loading ? "cursor-not-allowed" : " cursor-pointer"
                    } underline text-sm text-indigo-600`}
                  >
                    {loading && isResendOTP ? "loading..." : "Resend"}
                  </button>
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

Verify.noLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  return {
    props: {
      data: {},
    },
  };
}
