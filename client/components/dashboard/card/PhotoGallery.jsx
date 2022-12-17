import { faCopy, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import axios_interceptor from "../../../utils/axios/axios_interceptor";

export default function PhotoGallery({ data, handleRemoveImage }) {
  const errorMessage = (text) => toast.error(text, { toastId: "error1" });
  const successMessage = (text) => toast.success(text, { toastId: "succes1" });

  const linkRef = useRef(null);
  const handleCopy = () => {
    const linkUrl = linkRef.current.innerText;
    window?.navigator.clipboard.writeText(linkUrl);
    successMessage("copy success");
  };
  const handleDeleteImage = async (image_id) => {
    const confirm = window?.confirm("Are you confirm delete this image");
    if (!confirm) return;
    try {
      const { data } = await axios_interceptor.delete(
        `/api/v1/delete/upload/image/${image_id}`
      );
      handleRemoveImage(image_id);
      successMessage("image delete succesfull");
    } catch (error) {
      errorMessage("image delete faild");
    }
  };

  return (
    <div className="">
      <div className=" w-56 xs:w-full border rounded-md overflow-hidden ">
        <div className=" group  relative w-full h-44">
          {data && (
            <Image
              width={200}
              height={200}
              className=" z-0 w-full h-full object-cover"
              src={data?.image_url}
              alt={"imge not found"}
              priority
            />
          )}
          <div className="absolute top-2 right-2">
            <button
              onClick={() => handleDeleteImage(data?.id)}
              className=" hidden group-hover:block hover:bg-red-100 hover:text-red-500 rounded-sm p-1 w-8 h-8 transition-colors"
            >
              <FontAwesomeIcon className=" w-full h-full" icon={faTrashAlt} />
            </button>
          </div>
        </div>
        <div className=" w-full px-3 py-2 flex items-center justify-between   xs:flex-col">
          <p
            ref={linkRef}
            className="no-scrollbar  flex-none w-40 overflow-x-auto whitespace-nowrap"
          >
            {data?.image_url}
          </p>
          <div className=" flex-none">
            <button onClick={handleCopy} className=" w-5 h-5">
              <FontAwesomeIcon
                className=" w-full h-full text-gray-600 hover:text-black transition-all"
                icon={faCopy}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
