import Panel from "@/components/panel";
import clsx from "clsx";
import { useState } from "react";
import { PiInfoThin } from "react-icons/pi";
import { Link } from "react-router";

const Info = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer hover:underline duration-150 transition"
      >
        <PiInfoThin size={30} />
      </button>
      <Panel.Root
        open={isOpen}
        isClosable
        isDraggable
        handleClose={() => setIsOpen(false)}
        className={clsx(
          "absolute top-0 right-0 w-[90vw] max-w-[300px] mr-10 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow border border-gray-900 bg-white max-h-[83%] overflow-y-scroll no-scrollbar"
        )}
      >
        <Panel.Header>
          <h2 className="text-[10px]">Information</h2>
        </Panel.Header>
        <Panel.Content>
          <div className="border-b px-3 py-4 space-y-4">
            <p>
              The 2025 edition of the Air Jordan 5 Retro T23 'Tokyo' revives a
              2011 limited release that dropped exclusively in Japan. Like the
              original, this reissue sports a bright yellow nubuck upper with
              translucent quarter panel netting and grey molded eyelets. A
              Jumpman logo adorns the silver reflective tongue in black
              embroidery, matching the textile collar lining, stylized '23' on
              the lateral heel, and the second Jumpman icon that adorns the back
              heel.
            </p>
          </div>
          <div className="border-b px-3 py-4 space-y-4">
            <h2 className="text-[10px]">Saint Laurant</h2>
            <div className="flex items-center overflow-x-scroll no-scrollbar space-x-5">
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
            </div>
          </div>
          <div className="border-b px-3 py-4 space-y-4">
            <h2 className="text-[10px]">Wallets</h2>
            <div className="flex items-center overflow-x-scroll no-scrollbar space-x-5">
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
            </div>
          </div>
          <div className="border-b px-3 py-4 flex items-center justify-between">
            <h2 className="text-[10px]">Season</h2>
            <Link to="#" className="hover:underline duration-150 transition">
              2025
            </Link>
          </div>
          <div className="border-b px-3 py-4 flex items-center justify-between">
            <h2 className="text-[10px]">ColorWay</h2>
            <Link to="#" className="hover:underline duration-150 transition">
              Black
            </Link>
          </div>
          <div className="border-b px-3 py-4 flex items-center justify-between">
            <h2 className="text-[10px]">Main Color</h2>
            <Link to="#" className="hover:underline duration-150 transition">
              Black
            </Link>
          </div>
          <div className="border-b px-3 py-4 space-y-4">
            <h2 className="text-[10px]">Recommendations</h2>
            <div className="flex items-center overflow-x-scroll no-scrollbar space-x-5">
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
              <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
            </div>
          </div>
          <div className="px-3 py-4 flex items-start justify-between space-x-4">
            <h2 className="text-[10px]">Related</h2>
            <div className="flex flex-col space-y-3">
              <Link to="#" className="hover:underline">
                Alias EOY 90s Minimalism
              </Link>
              <Link to="#" className="hover:underline">
                Summer Sale: Accessories
              </Link>
            </div>
          </div>
        </Panel.Content>
      </Panel.Root>
    </div>
  );
};

export default Info;
