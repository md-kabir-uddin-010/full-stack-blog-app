import { Form, Formik } from "formik";
import React, { useState } from "react";
import InputField from "../dashboardForm/InputField";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios_interceptor from "../../../utils/axios/axios_interceptor";
import { useSelector } from "react-redux";

export default function ChangePassword({ setChangePass, setEditOpen }) {
  const { refresh_token } = useSelector((state) => state.auth);

  const initialValues = {
    current_password: "",
    password: "",
    confirm_password: "",
  };

  const errorMessage = (text) => toast.error(text, { toastId: "error1" });
  const successMessage = (text) => toast.success(text, { toastId: "succes1" });

  const handleSubmit = async (values) => {
    const { current_password, password } = values;
    if (!refresh_token) return;
    try {
      const { data } = await axios_interceptor.put(
        "/api/v1/user/password/change",
        {
          refresh_token,
          current_password,
          new_password: password,
        }
      );
      data?.message && successMessage(data?.message);
    } catch (error) {
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
    current_password: Yup.string().required("current password is required"),
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
  const handleCancle = () => {
    setChangePass(false);
    setEditOpen(false);
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
            <InputField
              type={"text"}
              name={"current_password"}
              label={"current password"}
            />
            <InputField type={"text"} name={"password"} label={"password"} />
            <InputField
              type={"text"}
              name={"confirm_password"}
              label={"confirm password"}
            />
          </div>
          <div className=" mt-10 flex items-center justify-between">
            <button
              onClick={handleCancle}
              type="button"
              className=" bg-orange-400 px-4 py-2 text-white rounded-md capitalize"
            >
              cancle
            </button>
            <input
              className=" cursor-pointer bg-indigo-400 px-4 py-2 text-white rounded-md capitalize"
              type="submit"
              value="update"
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
