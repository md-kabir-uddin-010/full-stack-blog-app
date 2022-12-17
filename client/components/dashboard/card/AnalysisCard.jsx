import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function AnalysisCard({ total, name, icon }) {
  return (
    <div className=" w-64 ms:w-64 py-4 px-3 flex items-center shadow-md rounded-xl border border-gray-100 xs:flex-col xs:justify-center xs:w-full">
      <div className=" flex-none w-44 ms:w-44 xs:w-full xs:text-center">
        <p className=" text-xl font-bold text-gray-600">{total}</p>
        <p className=" pt-2 capitalize text-lg text-gray-500">{name}</p>
      </div>
      <div className=" w-10 h-10 px-3 py-3 rounded-full text-[#3f83f8] bg-[#3f83f846]">
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
}
