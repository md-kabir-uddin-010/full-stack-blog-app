import { Form, Formik } from "formik";
import React, { useState } from "react";
import InputField from "../dashboardForm/InputField";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios_interceptor from "../../../utils/axios/axios_interceptor";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function DeleteAccount({
  setChangePass,
  setEditOpen,
  setDeleteAccount,
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { refresh_token } = useSelector((state) => state.auth);

  const initialValues = {
    password: "",
  };
  const errorMessage = (text) => toast.error(text, { toastId: "error1" });

  const handleSubmit = async (values) => {
    setIsPending(true);
    const { password } = values;
    if (!refresh_token) return;
    try {
      const { data } = await axios_interceptor.post(
        "/api/v1/user/account/delete",
        {
          refresh_token: refresh_token,
          password: password,
        },
        {
          timeout: 1000 * 60 * 2,
        }
      );
      setIsPending(false);
      localStorage.clear();
      router.replace("/admin/dashboard/signup");
    } catch (error) {
      setIsPending(false);
      if (error?.response?.status === 422) {
        errorMessage(error.response.data.errors.message);
      } else if (error?.response?.status === 409) {
        errorMessage(error.response.data.errors.message);
      } else if (error?.response?.status === 401) {
        errorMessage(error.response.data.errors.message);
      } else if (error?.response?.status === 404) {
        errorMessage(error.response.data.errors.message);
      } else {
        errorMessage("Internal server error");
      }
    }
  };

  const validationSchema = Yup.object({
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
  const handleCancle = () => {
    setChangePass(false);
    setEditOpen(false);
    setDeleteAccount(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <h1 className=" text-center font-bold border-b pb-6 text-4xl  ms:text-2xl ms:pb-4 xs:text-lg xs:pb-2 text-sky-500">
            Change Password
          </h1>
          <div className="">
            <InputField type={"text"} name={"password"} label={"password"} />
          </div>
          <div className=" mt-10 flex items-center justify-between">
            <button
              onClick={handleCancle}
              type="button"
              className=" bg-orange-400 px-4 py-2 text-white rounded-md capitalize"
            >
              cancle
            </button>
            <button
              className=" cursor-pointer bg-red-400 px-4 py-2 text-white rounded-md capitalize"
              type="submit"
              disabled={isPending ? true : false}
            >
              {isPending ? "loading..." : "delete"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
