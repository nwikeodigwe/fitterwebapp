import { IoReturnUpBackSharp } from "react-icons/io5";
import { PiImageBrokenThin } from "react-icons/pi";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();
  return (
    <section className="h-[92vh] p-5 flex flex-col items-center justify-between relative overflow-clip">
      <div className="min-h-[400px] max-h-[50vh] min-w-3xl max-w-[70vw] m-auto border border-red-300 bg-red-500/5 relative">
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col space-y-0 justify-center items-center">
          <PiImageBrokenThin className="text-[300px] text-red-500/10" />
          <p className="text-center text-red-300">
            Opp! seems the resource is currently unavailable. Check back later
          </p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 mt-2 group text-red-300"
          >
            <IoReturnUpBackSharp size={15} className="group-hover:text-black" />
            <span className="duration-150 transition group-hover:underline group-hover:text-black">
              Go back
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Error;
