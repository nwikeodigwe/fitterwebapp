import { useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";

const Header = () => {
  const [isSolid, setIsSolid] = useState<boolean>(false);

  return (
    <div>
      <button
        onMouseEnter={() => setIsSolid(true)}
        onMouseLeave={() => setIsSolid(false)}
        className="absolute top-5 right-5 z-20"
      >
        {isSolid ? (
          <IoBookmark
            size={30}
            className="transition-colors duration-300 hover:fill-black"
          />
        ) : (
          <CiBookmark
            size={30}
            className="transition-colors duration-300 hover:fill-black"
          />
        )}
      </button>
    </div>
  );
};

export default Header;
