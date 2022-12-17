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
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/features/auth/actions/authAction";
import { toast, ToastContainer } from "react-toastify";
import { endcodePass } from "../../../services/auth_service";
import { instance } from "../../../utils/axios/axios_interceptor";
import checkLogin from "../../../services/checkLogin";
import { useRef } from "react";

export default function Login({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  const [passToText, setPassToText] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const router = useRouter();
  const isPreview = router.isPreview;

  const dispatch = useDispatch();

  const { info, error, loading, success, message } = useSelector(
    (state) => state.auth
  );

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    const { email, password } = values;
    dispatch(login({ email, password }));
    endcodePass(password);
    setIsSubmit(true);
  };

  const validationSchema = Yup.object({
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
  });

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
      if (!info.verifyed) {
        setTimeout(() => {
          router.push("/admin/dashboard/user/account/verify");
        }, 5000);
      } else {
        setTimeout(() => {
          router.push("/admin/dashboard/user/login/verify");
        }, 5000);
      }
    }
  }, [success, isSubmit, error, router, info, message]);

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
      <div className=" w-full h-screen sm:px-10 ms:px-4 xs:px-1 flex items-center justify-center transition-all">
        <ToastContainer limit={1} autoClose={4000} />
        <div className=" px-6 py-6 flex-none w-[600px] min-h-[400px] sm:w-full ms:px-3 xs:px-2 shadow-md border rounded-md">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <h1 className=" text-center font-bold border-b pb-6 text-4xl  ms:text-2xl ms:pb-4 xs:text-lg xs:pb-2 text-sky-500">
                Login From
              </h1>
              <div className="">
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
              </div>
              <div className=" mt-5 text-right">
                <Link
                  href={"/admin/dashboard/user/password/reset"}
                  className=" underline capitalize text-indigo-600"
                >
                  forget password
                </Link>
              </div>
              <div className=" mt-8 text-center">
                <button
                  type="submit"
                  className="  capitalize text-lg cursor-pointer w-full bg-sky-500 hover:bg-sky-600 transition-colors px-2 py-2 rounded-md text-white"
                  disabled={loading ? true : false}
                >
                  {loading ? "loading..." : "login"}
                </button>
              </div>
              <div className=" mt-8 text-center">
                <p className="">
                  Create new account ?{" "}
                  <Link
                    className=" underline text-indigo-500"
                    href={"/admin/dashboard/signup"}
                  >
                    sign up
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

Login.noLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  return {
    props: {
      data: {},
    },
  };
}
