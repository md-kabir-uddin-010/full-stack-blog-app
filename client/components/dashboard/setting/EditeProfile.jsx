import { Form, Formik } from "formik";
import React, { useState } from "react";
import InputField from "../dashboardForm/InputField";
import * as Yup from "yup";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateInfo } from "../../../redux/features/auth/slice/authSlice";
import { toast, ToastContainer } from "react-toastify";
import axios_interceptor from "../../../utils/axios/axios_interceptor";

export default function EditeProfile({ setChangePass, setEditOpen }) {
  const [image, setImage] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.auth);

  const handleUpdate = (obj) => {
    dispatch(updateInfo(obj));
  };

  const initialValues = {
    name: info?.name || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
  });

  const handleImage = (e) => {
    const selectedFiles = e.target.files[0];
    setImage(selectedFiles);
    setSelectedImage(URL.createObjectURL(selectedFiles));
  };

  const errorMessage = (text) => toast.error(text, { toastId: "error1" });

  const handleSubmit = async (values) => {
    const { name } = values;
    setIsPending(true);

    const formData = new FormData();
    image && formData.append("name", name);
    image && formData.append("image", image);

    try {
      const { data } = await axios_interceptor.put(
        "/api/v1/upload/profile/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 1000 * 60 * 2,
        }
      );
      handleUpdate(data?.info);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      if (!error?.response) {
        errorMessage("Internal server error");
      } else if (error.response?.status === 422) {
        errorMessage(error.response.data.errors.message);
      } else if (error.response?.status === 406) {
        errorMessage(error.response.data.errors.message);
      } else {
        errorMessage("Internal server error");
      }
    }
  };

  const handleCancle = () => {
    setChangePass(false);
    setEditOpen(false);
  };

  return (
    <div>
      <ToastContainer limit={1} />
      <h1 className=" text-center font-bold border-b pb-6 text-4xl  ms:text-2xl ms:pb-4 xs:text-lg xs:pb-2 text-sky-500">
        Edit Profile
      </h1>
      <div className=" my-9 text-center">
        <div className=" w-40 mx-auto ">
          {!selectedImage ? (
            <Image
              className=" w-40 h-40 object-fill bg-gray-200 rounded-full"
              width={200}
              height={200}
              src={info?.profile_picture}
              alt={"profile picture"}
              priority
            />
          ) : (
            <Image
              className=" w-40 h-40 object-fill bg-gray-200 rounded-full"
              width={200}
              height={200}
              src={selectedImage}
              alt={"profile picture"}
              priority
            />
          )}
        </div>
      </div>
      <div className=" my-9">
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleImage}
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="">
            <InputField type={"text"} name={"name"} label={"name"} />
          </div>
          <div className=" mt-8 flex items-center justify-between">
            <button
              onClick={handleCancle}
              type="button"
              className=" bg-orange-400 px-4 py-2 text-white rounded-md capitalize"
            >
              cancle
            </button>
            <button
              className=" cursor-pointer bg-indigo-400 px-4 py-2 text-white rounded-md capitalize"
              type="submit"
              disabled={isPending ? true : false}
            >
              {isPending ? "loading..." : "update"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
