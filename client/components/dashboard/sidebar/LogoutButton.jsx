import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "../../tooltip/Tooltip";
import { logout } from "../../../redux/features/auth/actions/authAction";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LogoutButton({ icon, text }) {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);

  const { success } = useSelector((state) => state.auth);

  let refresh_token = null;

  if (typeof window !== "undefined") {
    refresh_token =
      localStorage.getItem("refresh_token") &&
      JSON.parse(localStorage.getItem("refresh_token"));
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (success && isSubmit) {
      router.push("/admin/dashboard/login");
      localStorage.clear();
    } else if (isSubmit && !success) {
      router.push("/admin/dashboard/login");
      localStorage.clear();
    }
  }, [success, isSubmit, router]);

  const handleLogout = () => {
    if (refresh_token) {
      dispatch(logout({ refresh_token }));
    }
    setIsSubmit(true);
  };
  return (
    <button
      onClick={handleLogout}
      type="button"
      className="  w-full my-5 py-2 px-3 flex items-center lg:block lg:my-3 lg:px-0 lg:pl-2 rounded-md hover:bg-slate-100 transition-all"
    >
      <div className=" group relative  w-6 h-6">
        <div className=" w-28 hidden lg:group-hover:block lg:absolute lg:top-0 lg:left-[50px]">
          <Tooltip text={text} />
        </div>
        <div className=" w-full block text-[#1577f7b0]">
          <FontAwesomeIcon
            className=" w-full h-full text-[#1577f7b0]"
            icon={icon}
          />
        </div>
      </div>
      <div className=" ml-3 lg:hidden ">
        <div className="w-full block font-medium capitalize text-lg  text-[#1577f7b0]">
          {text}
        </div>
      </div>
    </button>
  );
}
