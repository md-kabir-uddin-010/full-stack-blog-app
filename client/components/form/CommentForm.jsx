import { Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { createComment } from "../../redux/features/comment/action/commentAction";
import Textarea from "./Textarea";
import TextField from "./TextField";

export default function CommentForm({ data, setIsUpdate }) {
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const { error, loading, success, message } = useSelector(
    (state) => state.comment
  );

  let initialValues = {
    name: "",
    email: "",
    comment: "",
  };

  const errorMessage = (text) => toast.error(text, { toastId: "error1" });
  const successMessage = (text) => toast.success(text, { toastId: "succes1" });

  useEffect(() => {
    if (error && isSubmit) {
      errorMessage(error);
    }
    if (success && message && isSubmit) {
      successMessage(message);
      setIsUpdate(true);
    }
  }, [error, success, isSubmit, message, setIsUpdate]);

  const handleSubmit = (values) => {
    const { name, email, comment } = values;
    if (data.id && data.slug && data.title) {
      setIsSubmit(true);
      dispatch(
        createComment({
          post_id: data.id,
          post_title: data.title,
          post_slug: data.slug,
          name,
          email,
          comment,
        })
      );
      initialValues = {
        name: "",
        email: "",
        comment: "",
      };
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(32).required("name is required"),
    email: Yup.string().email().required("email is required"),
    comment: Yup.string().min(2).max(500).required("comment is required"),
  });

  return (
    <div>
      <ToastContainer limit={1} autoClose={10000} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="pr-4 mt-10 grid grid-cols-2 lg:grid-cols-1 mdl:grid-cols-2 sm:grid-cols-1 gap-x-4">
            <TextField type={"text"} name={"name"} label={"name"} />
            <TextField type={"email"} name={"email"} label={"email"} />
          </div>
          <Textarea name={"comment"} label={"comment"} />
          <div className=" mt-10">
            <button
              className={`${
                loading ? " cursor-not-allowed" : ""
              } text-base font-medium text-white capitalize py-2 px-5 hover:bg-[#1559ED] bg-[#1877F2] rounded-md break-all whitespace-pre-wrap`}
              type="submit"
              disabled={loading ? true : false}
            >
              {loading ? "loading..." : "submit"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
