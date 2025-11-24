import clsx from "clsx";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { PiImageThin } from "react-icons/pi";

const Images = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer hover:underline duration-150 transition"
      >
        <PiImageThin size={30} />
      </button>
      <div
        className={clsx(
          "h-screen fixed overflow-y-scroll no-scrollbar bg-white z-50 border top-0 left-0 w-full",
          !isOpen && "hidden"
        )}
      >
        <div className="relative bg-white ">
          <button
            onClick={() => setIsOpen(false)}
            className="fixed top-5 right-5 bg-white p-1 rounded-full hover:cursor-pointer z-10"
          >
            <IoCloseOutline size={40} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Images;
