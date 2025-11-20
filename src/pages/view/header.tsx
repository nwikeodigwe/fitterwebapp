import { CiBookmark } from "react-icons/ci";

const header = () => {
  return (
    <div>
      <button>
        <CiBookmark
          className="absolute top-5 right-5 hover:fill-black duration-300 transition z-10"
          size={30}
        />
      </button>
    </div>
  );
};

export default header;
