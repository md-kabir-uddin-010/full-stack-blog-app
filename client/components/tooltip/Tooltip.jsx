import React from "react";

export default function Tooltip({ text }) {
  return (
    <div className=" relative z-50">
      <div className=" absolute top-[10px] -left-[6px] w-3 h-3 bg-black rotate-45"></div>
      <div className=" w-28 capitalize text-center bg-black px-2 py-1 rounded-md text-white">
        {text}
      </div>
    </div>
  );
}
