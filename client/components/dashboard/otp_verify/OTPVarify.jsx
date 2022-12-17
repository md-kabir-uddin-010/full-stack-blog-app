import React from "react";
import OtpInput from "../../otp/OtpInput";

export default function OTPVarify({
  state,
  handleChange,
  title,
  email,
  handleResend,
  handleSubmit,
  error,
}) {
  return (
    <div>
      <div className="">
        <div className=" py-9 w-[800px] h-auto lg:w-full ms:px-2 bg-gray-50 rounded-lg  shadow-md p-5">
          <p className=" text-center text-4xl font-extrabold text-gray-700 my-7 xs:text-sm">
            {title}
          </p>
          <div className=" flex items-center justify-center">
            <div className="">
              <p className=" w-[400px] ms:w-full  text-gray-600 text-sm whitespace-pre-wrap">
                <b>{email && email}</b> an OTP code has been sent to your
                entered email
              </p>
              <p className=" text-gray-600  my-3 text-sm">
                Enter your Code here
              </p>
              <div className="">
                <OtpInput
                  value={state}
                  onChange={handleChange}
                  valueLength={6}
                />
              </div>
              <div className=" flex items-center  gap-x-2 mt-3  xs:flex-col xs:justify-start">
                <p className=" text-gray-600  text-sm">
                  {` Didn\'t receive the code\?`}
                </p>
                <button
                  onClick={handleResend}
                  type="button"
                  className=" underline text-sm text-indigo-600"
                >
                  Resend
                </button>
              </div>
            </div>
          </div>
          <div className=" text-center mt-8">
            <button
              onClick={handleSubmit}
              className=" font-bold mt-7 text-xl w-48 h-14 xs:w-full bg-white shadow-md rounded-full"
              type="submit"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
