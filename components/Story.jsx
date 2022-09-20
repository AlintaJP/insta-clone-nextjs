import React from "react";
import Image from "next/image";

const Story = ({ img, userName }) => {
  return (
    <li>
      <div
        className="border-red-500 border-2 rounded-full hover:scale-110
      transition transform duration-200 ease-out"
      >
        <div
          className="relative w-14 h-14 rounded-full 
        border-white border-2 cursor-pointer"
        >
          <Image
            className="rounded-full"
            src={img}
            alt={userName}
            layout="fill"
          />
        </div>
      </div>
      <p className="text-xs w-14 truncate text-center">{userName}</p>
    </li>
  );
};

export default Story;
