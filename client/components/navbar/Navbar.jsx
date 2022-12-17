import { faBars, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import ScrollToTop from "../scroll/scrollToTop";
import DropdownLInk from "./DropdownLInk";
import LinkItem from "./LinkItem";

export default function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const navRef = useRef(null);
  const onOutsiteClick = useOutsideClick(navRef);

  useEffect(() => {
    if (onOutsiteClick) {
      setMenuToggle(false);
    }
    window?.addEventListener("resize", function (e) {
      setMenuToggle(false);
    });
  }, [onOutsiteClick]);
  return (
    <div
      ref={navRef}
      className=" w-full fixed top-0 left-0 bg-white z-50 shadow-sm"
    >
      <div className=" w-[1280px] h-[100px] lg:h-[80px] xl:w-full xl:px-6 sm:px-2 xs:px-1 mx-auto flex items-center justify-between xs:flex-wrap">
        <section className=" px-3 text-3xl w-64 sm:w-40 sm:px-2 xs:px-0 xs:w-16 flex-none">
          <h1 className="">Blog</h1>
        </section>
        <nav className=" flex items-center">
          <section className="">
            <div
              className={` lg:absolute lg:top-0  ${
                menuToggle ? "lg:left-0" : "lg:-left-full sm:-left-96"
              } lg:bg-white lg:shadow-md lg:w-60 lg:h-screen xs:w-full transition-all ease-in-out`}
            >
              <div className=" hidden lg:block text-right px-3 py-3">
                <button
                  type="button"
                  onClick={() => setMenuToggle(false)}
                  className=" w-7 h-7"
                >
                  <FontAwesomeIcon className=" w-full h-full" icon={faClose} />
                </button>
              </div>
              <ul className=" flex items-center lg:flex-col lg:items-start lg:pt-7">
                <LinkItem
                  onClick={() => setMenuToggle(false)}
                  text={"home"}
                  href={"/"}
                />
                <LinkItem
                  onClick={() => setMenuToggle(false)}
                  text={"entertainment"}
                  href={"/category/entertainment"}
                />
                <LinkItem
                  onClick={() => setMenuToggle(false)}
                  text={"news"}
                  href={"/category/news"}
                />
                <LinkItem
                  onClick={() => setMenuToggle(false)}
                  text={"sports"}
                  href={"/category/sports"}
                />

                <LinkItem
                  onClick={() => setMenuToggle(false)}
                  text={"food"}
                  href={"/category/food"}
                />
                <LinkItem
                  onClick={() => setMenuToggle(false)}
                  text={"Health"}
                  href={"/category/health"}
                />
                <LinkItem
                  onClick={() => setMenuToggle(false)}
                  text={"technology"}
                  href={"/category/technology"}
                />
                {/* //hiden  */}
                <div className=" hidden lg:block">
                  <LinkItem
                    onClick={() => setMenuToggle(false)}
                    text={"fashion"}
                    href={"/category/fashion"}
                  />
                  <LinkItem
                    onClick={() => setMenuToggle(false)}
                    text={"lifestyle"}
                    href={"/category/lifestyle"}
                  />
                  <LinkItem
                    onClick={() => setMenuToggle(false)}
                    text={"travel"}
                    href={"/category/travel"}
                  />

                  <LinkItem
                    onClick={() => setMenuToggle(false)}
                    text={"photography"}
                    href={"/category/photography"}
                  />
                </div>
                <div className=" lg:hidden group block  relative">
                  <button
                    type="button"
                    className="block  peer px-5 py-2 text-xs font-bold uppercase"
                  >
                    <div className=" flex">
                      <span className="mr-1 text-gray-600">more</span>
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </button>
                  <div className=" hidden absolute top-8 right-0 group-hover:block bg-white drop-shadow-lg">
                    <DropdownLInk
                      onClick={() => setMenuToggle(false)}
                      text={"fashion"}
                      href={"/category/fashion"}
                    />
                    <DropdownLInk
                      onClick={() => setMenuToggle(false)}
                      text={"lifestyle"}
                      href={"/category/lifestyle"}
                    />
                    <DropdownLInk
                      onClick={() => setMenuToggle(false)}
                      text={"travel"}
                      href={"/category/travel"}
                    />

                    <DropdownLInk
                      onClick={() => setMenuToggle(false)}
                      text={"photography"}
                      href={"/category/photography"}
                    />
                  </div>
                </div>
              </ul>
            </div>
          </section>
          <section>
            <div className=" hidden lg:block">
              <button
                onClick={() => {
                  setMenuToggle(true);
                }}
                className=" w-7 h-7"
              >
                <FontAwesomeIcon className=" w-full h-full" icon={faBars} />
              </button>
            </div>
          </section>
        </nav>
      </div>
      <ScrollToTop />
    </div>
  );
}
