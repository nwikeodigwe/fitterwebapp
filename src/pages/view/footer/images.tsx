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
          "h-screen fixed overflow-y-scroll no-scrollbar bg-white z-50 border top-0 left-0 w-full ",
          !isOpen && "hidden"
        )}
      >
        <div className="relative bg-white space-y-10 p-20">
          <button
            onClick={() => setIsOpen(false)}
            className="fixed top-5 right-5 bg-white p-1 rounded-full hover:cursor-pointer z-10"
          >
            <IoCloseOutline size={40} />
          </button>
          <div className="space-y-40 flex flex-col items-center justify-center">
            <div className="h-[600px] w-[800px] bg-black/20"></div>
            <div className="h-[600px] w-[800px] bg-black/20"></div>
            <div className="h-[600px] w-[800px] bg-black/20"></div>
            <div className="h-[600px] w-[800px] bg-black/20"></div>
            <div className="h-[600px] w-[800px] bg-black/20"></div>
            <div className="h-[600px] w-[800px] bg-black/20"></div>
            <div className="h-[600px] w-[800px] bg-black/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
