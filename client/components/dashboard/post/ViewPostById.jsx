import Image from "next/image";
import Link from "next/link";
import React from "react";
import CommentForm from "../../form/CommentForm";

export default function ViewPostById({ data }) {
  return (
    <div>
      <div className=" pt-4 w-full xl:w-full lg:w-full mdl:w-full mx-auto xl:px-3 lg:px-2 lg:pt-4 md:px-2 md:pt-2 sm:px-1 sm:pt-3 ">
        <div className=" mb-8 lg:px-10 mdl:px-8 ms:px-2">
          <div className=" flex items-center pb-3 xs:flex-wrap break-all">
            <Link
              href={"/"}
              className=" text-xs capitalize bg-black text-white hover:text-gray-300  rounded-[3px] p-[3px] break-all"
            >
              home
            </Link>
            <span className=" ml-1">
              <svg
                className="fill-current h-4 w-4 -rotate-90  text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
            <span className=" text-xs capitalize text-gray-400 break-all">
              {data?.category}
            </span>
          </div>
          <h1 className=" font-bold text-3xl lg:text-2xl ms:text-xl uppercase break-all whitespace-pre-wrap">
            {data?.category}
          </h1>
        </div>
        <div className=" flex lg:flex-col gap-x-5 lg:px-10 mdl:px-2 ms:px-0 ">
          <div className="  w-full lg:w-full pt-6 xl:px-3 lg:px-2  mdl:w-full  mdl:px-6 ms:px-2  ms:pt-0  shadow-[0_0_6px_rgb(0,0,0,0.12)] rounded-lg px-3 lg:shadow-none">
            <div className="">
              <div className="">
                <h1 className=" text-4xl ms:text-xl font-semibold py-5">
                  {data?.title}
                </h1>
              </div>
              <div className=" flex items-center justify-center py-9">
                {data?.thumbnail && (
                  <Image
                    className=" w-[800px] h-[400px] object-cover"
                    width={400}
                    height={200}
                    src={data?.thumbnail}
                    alt={"thumbnail"}
                    priority
                  />
                )}
              </div>
              <div className=" mb-20">
                {data && data?.post && (
                  <div
                    className=" "
                    dangerouslySetInnerHTML={{ __html: JSON.parse(data?.post) }}
                  ></div>
                )}
              </div>
              {/* comment section  */}
              <div className="  my-10">
                <div className="">
                  <div className=" my-11">
                    <h2 className=" text-3xl lg:text-2xl ms:text-xl font-bold capitalize whitespace-pre-wrap">
                      one comment
                    </h2>
                    <hr className=" mt-10" />
                  </div>
                  <h2 className=" pb-3 text-xl font-bold break-all whitespace-pre-wrap">
                    Leave a Reply
                  </h2>
                  <p className=" flex ms:flex-col text-xs text-gray-500 break-all">
                    <span className="">
                      Your email address will not be published.
                    </span>
                    <span className="">
                      Required fields are marked{" "}
                      <span className=" text-red-500">*</span>
                    </span>
                  </p>
                </div>
                <div className="">
                  {/* comment form */}
                  <CommentForm />
                  {/* comments  */}
                  <div className="">
                    <hr className=" mt-20 px-4" />
                  </div>
                  <div className=" px-4 ms:px-2 my-10 w-full flex gap-4 xs:flex-col">
                    {/* <div className=" flex-none w-12 h-12 rounded-full">
                    <Image
                      className=" w-full h-full bg-cover transition-all duration-[0.4s] rounded-full overflow-hidden"
                      src={userImag}
                      alt="user"
                      priority={true}
                    />
                  </div> */}
                    <div className="">
                      <div className=" pt-2 w-full flex items-center justify-between xs:flex-col xs:justify-start xs:items-start">
                        <h2 className=" text-lg font-semibold text-gray-600 break-all">
                          Jone doe
                        </h2>
                        <p className=" text-xs text-gray-400 break-all">date</p>
                      </div>
                      <div className=" pt-3 text-gray-500">
                        <p className=" xs:break-all">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Tenetur impedit nesciunt natus autem vero
                          laborum iste eius, atque consequatur ipsum! Quibusdam
                          velit voluptates ex corrupti placeat facere numquam
                          qui voluptatibus?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
