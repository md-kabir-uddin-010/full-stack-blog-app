import { faCloudUploadAlt, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addImage } from "../../../redux/features/gallery/slice/gallerySlice";
import axios_interceptor from "../../../utils/axios/axios_interceptor";

export default function UploadImageModal({ setImageModal }) {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [isPendig, setIsPending] = useState(false);

  const dispatch = useDispatch();

  const handleAddImage = (obj) => {
    dispatch(addImage(obj));
  };

  useEffect(() => {}, []);

  const dragOver = (e) => e.preventDefault();
  const dragLeave = (e) => e.preventDefault();
  const dragEnter = (e) => e.preventDefault();

  const fileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
    setImageURL(URL.createObjectURL(file));
  };

  const handleImage = (e) => {
    let img = e.target.files[0];
    setImage(img);
    if (img) {
      setImageURL(URL.createObjectURL(img));
    }
  };

  const errorMessage = (text) => toast.error(text, { toastId: "error1" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    try {
      const { data } = await axios_interceptor.post(
        `/api/v1/upload/post/image`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      handleAddImage(data?.info);
      setIsPending(false);
      setImageModal(false);
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

  return (
    <div className=" w-full h-full">
      <form onSubmit={handleSubmit}>
        <div
          onDragOver={dragOver}
          onDragLeave={dragLeave}
          onDragEnter={dragEnter}
          onDrop={fileDrop}
          className=" w-96 mx-auto"
        >
          <label className="" htmlFor="files">
            <div className=" cursor-pointer  hover:bg-indigo-100 pt-10 pb-16 mx-auto w-96  border-2 border-dashed rounded-lg border-indigo-400 bg-indigo-50 transition-all">
              <p className=" mx-auto w-24 h-24">
                <FontAwesomeIcon
                  className=" w-full h-full text-indigo-500"
                  icon={faCloudUploadAlt}
                />
              </p>

              <p className=" w-full h-full flex items-center justify-center text-gray-500">
                Drag & drop your files here or Click to browse files
              </p>
            </div>
            <input
              className=" hidden"
              type="file"
              name="files"
              id="files"
              onChange={handleImage}
              accept="image/*"
            />
          </label>
        </div>
        <div className=" my-7 text-center">
          <button
            className=" capitalize px-6 py-2 bg-indigo-500 text-white rounded-md"
            type="submit"
            disabled={isPendig ? true : false}
          >
            {isPendig ? "loading..." : "upload"}
          </button>
        </div>
      </form>
      <div className="">
        <h2 className=" text-center my-4 capitalize font-semibold text-gray-500 text-xl">
          preview image
        </h2>

        <div className=" grid grid-cols-1   justify-items-center">
          {imageURL && (
            <div className="relative  w-60 h-60 border rounded-md m-3 overflow-hidden">
              <div className="">
                <Image
                  width={300}
                  height={200}
                  className=" w-full h-full object-cover"
                  src={imageURL}
                  alt="no imge found"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
