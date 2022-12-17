import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  }, []);

  return (
    <div className=" transition-all">
      <button
        type="button"
        onClick={scrollToTopButton}
        className={`${
          visible ? "translate-y-2" : "translate-y-28"
        } block w-10 h-10 py-2 px-3  fixed bottom-7 right-3  transition-all duration-500 ease-in-out bg-[#00000079] hover:bg-black  rounded-sm`}
      >
        <FontAwesomeIcon
          className=" w-full h-full  text-white"
          icon={faAngleUp}
        />
      </button>
    </div>
  );
}
