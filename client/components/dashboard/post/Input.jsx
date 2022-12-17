import { ErrorMessage, Field } from "formik";
import React from "react";

export default function Input({ type, name, label }) {
  return (
    <div className=" mt-8 relative">
      <Field
        className=" peer  w-full block outline-none border-b border-gray-300 bg-transparent focus:border-indigo-500 transition-all placeholder-transparent placeholder:hidden"
        type={type}
        name={name}
        id={name}
        placeholder=" "
      />
      <label
        className=" absolute -top-6  left-0 text-gray-500  text-base  peer-placeholder-shown:top-0  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500  peer-focus:-top-6  peer-focus:text-sm peer-focus:text-gray-600 capitalize  cursor-text transition-all"
        htmlFor={name}
      >
        {label}
      </label>
      <ErrorMessage name={name}>
        {(errorMess) => <p className=" text-red-400">{errorMess}</p>}
      </ErrorMessage>
    </div>
  );
}
