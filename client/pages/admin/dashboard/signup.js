import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InputField from "../../../components/dashboard/dashboardForm/InputField";
import Footer from "../../../components/footer/Footer";
import Loding from "../../../components/loading/Loding";
import Navbar from "../../../components/navbar/Navbar";
import NotFound from "../../../components/notFoundPage/NotFound";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import { toast, ToastContainer } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../redux/features/auth/actions/authAction";
import { endcodePass } from "../../../services/auth_service";
import { instance } from "../../../utils/axios/axios_interceptor";
import checkLogin from "../../../services/checkLogin";
import { useRef } from "react";

export default function Signup({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  const [passToText, setPassToText] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const isPreview = router.isPreview;

  const {
    info,
    error,
    loading,
    success,
    message,
    access_token,
    refresh_token,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2)
      .max(64)
      .matches(/^[0-9A-Za-z\s\-]+$/, {
        message:
          "Only lowercase ,uppercase, letters, numbers, and hypen (-) are allowed",
        excludeEmptyString: false,
      })
      .required("name is required"),
    email: Yup.string().email().required("email is required"),
    password: Yup.string()
      .min(16)
      .max(64)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        {
          message:
            "password must have lower and uppercase letters number and special characters ",
          excludeEmptyString: false,
        }
      )
      .required("password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "confirm password does not match")
      .required("confirm password is required"),
  });

  const handleSubmit = (values) => {
    const { name, email, password } = values;
    dispatch(signup({ name, email, password }));
    endcodePass(password);
    setIsSubmit(true);
  };

  let loggedin;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loggedin = checkLogin();
    if (loggedin) {
      router.push("/admin/dashboard");
      setIsLoading(true);
    }
    if (loggedin) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [router]);

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
        router.push("/admin/dashboard/user/account/verify");
      }, 5000);
    }
  }, [success, isSubmit, router, error, message]);

  if (loggedin) {
    return (
      <>
        <Loding />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Loding />
      </>
    );
  }

  if (isPreview) {
    return (
      <div className="  w-full h-screen sm:px-10 ms:px-4 xs:px-1 flex items-center justify-center transition-all">
        <ToastContainer limit={1} autoClose={4000} />
        <div className=" px-6 py-6 flex-none w-[600px] min-h-[400px] sm:w-full ms:px-3 xs:px-2 shadow-md border rounded-md">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <h1 className=" text-center font-bold border-b pb-6 text-4xl  ms:text-2xl ms:pb-4 xs:text-lg xs:pb-2 text-sky-500">
                Signup From
              </h1>
              <div className="">
                <InputField type={"text"} name={"name"} label={"name"} />
                <InputField type={"email"} name={"email"} label={"email"} />
                <div className=" relative">
                  <InputField
                    type={passToText ? "text" : "password"}
                    name={"password"}
                    label={"password"}
                  />
                  <div className=" absolute top-0 right-2">
                    <button
                      onClick={() => setPassToText(!passToText)}
                      type="button"
                      className=""
                    >
                      {passToText ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </button>
                  </div>
                </div>
                <InputField
                  type={passToText ? "text" : "password"}
                  name={"confirm_password"}
                  label={"confirm password"}
                />
              </div>
              <div className=" mt-8 text-center">
                <button
                  type="submit"
                  className="  capitalize text-lg cursor-pointer w-full bg-sky-500 hover:bg-sky-600 transition-colors px-2 py-2 rounded-md text-white"
                  disabled={loading ? true : false}
                >
                  {loading ? "loading..." : "sign up"}
                </button>
              </div>
              <div className=" mt-8 text-center">
                <p className="">
                  Already have an account ?{" "}
                  <Link
                    className=" underline text-indigo-500"
                    href={"/admin/dashboard/login"}
                  >
                    login
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
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

Signup.noLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  return {
    props: {
      data: {},
    },
  };
}
