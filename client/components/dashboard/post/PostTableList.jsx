import {
  faAdd,
  faCalendarDays,
  faCommenting,
  faEdit,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import axios_interceptor from "../../../utils/axios/axios_interceptor";

export default function PostTableList({
  data,
  handleRemovePost,
  handlePopularPost,
}) {
  const errorMessage = (text) => toast.error(text, { toastId: "error1" });

  const deletePost = async (post_id) => {
    const confirm = window.confirm("Are you confirm delete this post");
    if (!confirm) return;
    try {
      const { data } = await axios_interceptor.delete(
        `/api/v1/delete/post/${post_id}`,
        { popular: true }
      );
      handleRemovePost(post_id);
    } catch (error) {
      if (error?.response?.status === 404) {
        errorMessage(error.response.data.errors.message);
      } else {
        errorMessage("post delete faild");
      }
    }
  };

  const handlePopuler = async (post_id) => {
    const confirm = window.confirm("Are you confirm add to popular this post");
    if (!confirm) return;
    try {
      const { data } = await axios_interceptor.put(
        `/api/v1/edit/popular/post/${post_id}`,
        { popular: true }
      );
      handlePopularPost(post_id);
    } catch (error) {
      if (error?.response?.status === 409) {
        errorMessage(error.response.data.errors.message);
      } else {
        errorMessage("create popular post faild");
      }
    }
  };

  return (
    <li className=" border-b  hover:rounded-md">
      <div className=" lg:w-max group py-2 flex  items-center justify-between hover:bg-slate-100 rounded-lg ">
        <div className="flex-none mx-2 flex-nowrap">
          <p className="text-gray-700  whitespace-nowrap">
            {data && data.title}
          </p>
        </div>
        <div className=" flex-none ml-20 whitespace-nowrap">
          <div className=" flex items-center">
            <div className="mx-4 ">
              <Link
                href={`/admin/dashboard/post/edit/${data.id}`}
                className="w-5 h-5  capitalize px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FontAwesomeIcon
                  className="w-5 h-5 text-[#3F83F8] hover:text-indigo-400  transition-colors"
                  icon={faEdit}
                />
              </Link>
            </div>
            <div className="mx-4 ">
              <Link
                href={`/admin/dashboard/post/view/${data.id}`}
                className="w-5 h-5  capitalize px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FontAwesomeIcon
                  className="w-5 h-5 text-[#3F83F8] hover:text-indigo-400 transition-colors"
                  icon={faEye}
                />
              </Link>
            </div>
            <div className="mx-4 ">
              <button
                onClick={() => handlePopuler(data.id)}
                className="w-5 h-5  capitalize px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FontAwesomeIcon
                  className="w-5 h-5 text-[#3F83F8] hover:text-indigo-400  transition-colors"
                  icon={faAdd}
                />
              </button>
            </div>
            <div className="mx-4">
              <button
                onClick={() => deletePost(data.id)}
                className="w-5 h-5  capitalize px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FontAwesomeIcon
                  className="w-5 h-5 text-[#3F83F8] hover:text-red-400 transition-colors"
                  icon={faTrashAlt}
                />
              </button>
            </div>
            <div className="mx-2  w-28 text-center ">
              {/* published */}
              {data && data.popular ? (
                <span className="px-3 py-1 bg-green-500 capitalize rounded-md text-white">
                  popular
                </span>
              ) : (
                <span className="px-3 py-1 bg-orange-400 capitalize rounded-md text-white">
                  none
                </span>
              )}
            </div>
            <div className="mx-2  w-28 text-center ">
              {/* published */}
              {data && data.publish ? (
                <span className="px-3 py-1 bg-green-500 capitalize rounded-md text-white">
                  published
                </span>
              ) : (
                <span className="px-3 py-1 bg-orange-400 capitalize rounded-md text-white">
                  draft
                </span>
              )}
            </div>
            {/* comments  */}
            <div className="mx-2 flex items-center">
              <div className="text-gray-700 mx-2">{data && data.comments}</div>
              <div className=" w-4 h-4">
                <FontAwesomeIcon
                  className="text-[#3F83F8]  w-full h-full"
                  icon={faCommenting}
                />
              </div>
            </div>
            <div className="mx-2 flex items-center">
              <div className="text-gray-700 mx-2">{data && data.views}</div>
              <div className=" w-4 h-4">
                <FontAwesomeIcon
                  className=" text-[#3F83F8]  w-full h-full"
                  icon={faEye}
                />
              </div>
            </div>
            <div className="mx-2 flex items-center">
              <div className="text-gray-700 mx-2">
                <span className=" mx-3">
                  created :{" "}
                  {data && moment.utc(data.createdAt).format("DD/MM/YYYY")}
                </span>
                <span className=" mx-3">
                  updated :{" "}
                  {data && moment.utc(data.updatedAt).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className=" w-4 h-4">
                <FontAwesomeIcon
                  className=" text-[#3F83F8] w-full h-full"
                  icon={faCalendarDays}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
