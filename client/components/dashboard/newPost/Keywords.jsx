import React, { useState } from "react";

export default function Keywords({ lable, name, placeholder }) {
  const [isKeyRelease, setIsKeyRelease] = useState(false);
  const [inputTags, setInputTags] = useState("");
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimInput = e.target.value.replace(/\s+/g, " ");
      if (trimInput.length > 1 && !tags.includes(trimInput)) {
        if (tags.length < 10) {
          trimInput.split(",").forEach((el) => {
            if (!tags.includes(el) && el.length > 1) {
              setTags((prev) => [...prev, el]);
            }
          });
        }
      }
      setInputTags("");
    }
    if (
      e.key === "Backspace" &&
      !inputTags.length &&
      tags.length &&
      isKeyRelease
    ) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      setTags(tagsCopy);
      setInputTags(poppedTag);
    }
    setIsKeyRelease(false);
  };

  const removeTage = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };
  return (
    <div className=" mt-4 ">
      <label className=" capitalize text-gray-500" htmlFor={name}>
        {lable}
      </label>
      <p className=" text-sm text-sky-600">
        Press enter or add comma after each tag
      </p>
      <div className=" mt-2 border border-gray-300  overflow-hidden rounded-md flex flex-wrap">
        {tags?.map((tag, inx) => (
          <div
            key={inx}
            className=" m-1 flex items-center px-2 py-1 bg-gray-200 rounded-lg mx-1"
          >
            <span className=" mx-2"> {tag}</span>
            <button
              onClick={() => removeTage(inx)}
              className=" flex items-center justify-center bg-black w-4 h-4 rounded-full text-white"
              type="button"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          className=" w-full py-2 px-3 bg-transparent outline-none "
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onKeyUp={() => setIsKeyRelease(true)}
          value={inputTags}
          onChange={(e) => setInputTags(e.target.value)}
        />
      </div>
      <div className=" pt-2 text-gray-600">
        {tags.length > 10 ? (
          <span className=" text-red-500">
            Keyword must be less than or equal 10
          </span>
        ) : (
          <span className=" text-gray-700">
            {10 - tags.length} tags are remaining
          </span>
        )}
      </div>
    </div>
  );
}
