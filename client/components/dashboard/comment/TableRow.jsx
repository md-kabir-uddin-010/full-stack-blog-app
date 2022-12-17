import moment from "moment/moment";
import React from "react";
import { toast } from "react-toastify";
import axios_interceptor from "../../../utils/axios/axios_interceptor";

export default function TableRow({
  data,
  handleRemoveComment,
  handleApproveComment,
}) {
  const errorMessage = (text) => toast.error(text, { toastId: "error1" });

  //delete comment
  const deleteComment = async (comment_id) => {
    const confirm = window.confirm("Are you confirm delete this comment");
    if (!confirm) return;
    try {
      const { data } = await axios_interceptor.delete(
        `/api/v1/comment/delete/${comment_id}`
      );
      handleRemoveComment(comment_id);
    } catch (error) {
      errorMessage("comment delete faild");
    }
  };

  //approve comment
  const approveComment = async (comment_id) => {
    const confirm = window.confirm("Are you confirm approve this comment");
    if (!confirm) return;
    try {
      const { data } = await axios_interceptor.put(
        `/api/v1/comment/approve/${comment_id}`
      );
      handleApproveComment(comment_id);
    } catch (error) {
      errorMessage("comment approve faild");
    }
  };

  return (
    <tr className=" text-gray-700">
      <td className=" whitespace-nowrap border px-4 py-2">{data?.name}</td>
      <td className=" whitespace-nowrap border px-4 py-2">{data?.email}</td>
      <td className=" min-w-[500px] border px-4 py-2">{data?.comment}</td>
      <td className=" min-w-[500px] border px-4 py-2">{data?.post_title}</td>
      <td className=" min-w-[300px] border px-4 py-2">{data?.post_slug}</td>
      <td className=" text-center min-w-[150px] whitespace-nowrap border ">
        {data?.approve ? (
          <span className="px-3 py-1 bg-green-500 capitalize rounded-md text-white">
            approved
          </span>
        ) : (
          <span className="px-4 py-1 bg-orange-400 capitalize rounded-md text-white">
            pending
          </span>
        )}
      </td>
      <td className=" text-center min-w-[200px] whitespace-nowrap border px-4 py-2">
        {data?.approve === false && (
          <button
            onClick={() => approveComment(data?.id)}
            className=" mx-2 capitalize px-2 py-0.5  bg-green-500 rounded-md text-white"
          >
            approve
          </button>
        )}

        <button
          onClick={() => deleteComment(data?.id)}
          className=" mx-2 capitalize px-2 py-0.5 transition-opacity  bg-red-500 rounded-md text-white"
        >
          delete
        </button>
      </td>
      <td className=" whitespace-nowrap border px-4 py-2">
        {data && moment.utc(data.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </td>
    </tr>
  );
}
