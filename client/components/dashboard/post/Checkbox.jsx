import { Field } from "formik";
import React from "react";

export default function Checkbox({ type, name, label }) {
  return (
    <div className=" flex items-center justify-center flex-wrap  cursor-pointer">
      <Field
        className=" cursor-pointer"
        type={type}
        name={name}
        id={name}
        placeholder=" "
      />
      <label className=" capitalize ml-3 cursor-pointer" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
