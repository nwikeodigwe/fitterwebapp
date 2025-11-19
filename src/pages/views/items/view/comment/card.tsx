import { IoPersonOutline } from "react-icons/io5";
import { PiArrowFatDownThin, PiArrowFatUpThin } from "react-icons/pi";

const Card = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2">
        <span className="text-black bg-black/5 size-8 flex items-center justify-center flex-shrink-0">
          <IoPersonOutline size={20} />
        </span>
        <div className="grid grid-cols-[1fr_auto]  min-h-[32px] items-start gap-2 w-full">
          <div className="space-y-1">
            <p className="text-[10px]">lumimious_roth</p>
            <p>
              This is the comment I want users to be able to click on express
              their thoug on this product
            </p>
            <button className="text-[10px]">Reply</button>
          </div>
          <div className="flex flex-col border-t border-l opacity-40">
            <button className="p-1 border-r border-b flex items-center flex-col justify-center gap-1">
              <PiArrowFatUpThin size={18} />
              <span className="opacity-50 text-[8px]">1.4k</span>
            </button>
            <button className="p-1 border-r border-b flex items-center flex-col justify-center gap-1">
              <PiArrowFatDownThin size={18} />
              <span className="opacity-50 text-[8px]">1.2k</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-2 ml-10">
        <span className="text-black bg-black/5 size-5 flex items-center justify-center flex-shrink-0">
          <IoPersonOutline size={15} />
        </span>
        <div className="grid grid-cols-[1fr_auto]  min-h-[32px] items-start gap-2 w-full">
          <div className="space-y-1">
            <p className="text-[10px]">lumimious_roth</p>
            <p>
              This is the comment I want users to be able to click on express
              their thoug on this product
            </p>
            <button className="text-[10px]">Reply</button>
          </div>
          <div className="flex flex-col border-t border-l opacity-40">
            <button className="p-1 border-r border-b flex items-center flex-col justify-center gap-1">
              <PiArrowFatUpThin size={18} />
              <span className="opacity-50 text-[8px]">1.4k</span>
            </button>
            <button className="p-1 border-r border-b flex items-center flex-col justify-center gap-1">
              <PiArrowFatDownThin size={18} />
              <span className="opacity-50 text-[8px]">1.2k</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
