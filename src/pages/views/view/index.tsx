import {
  PiArrowFatDownThin,
  PiArrowFatUpThin,
  PiShareFatThin,
} from "react-icons/pi";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router";

import Info from "./info";
import Comment from "./comment";
import Carousel from "@/components/carousel";
import { CiBookmark } from "react-icons/ci";

const Index = () => {
  const items = ["first", "second", "third", "fouth", "fifth"];
  const handleNavigate = (direction: "left" | "right" | undefined) => {
    console.log(`Navigating ${direction}`);
  };
  return (
    <section className="h-[92vh] p-5 flex flex-col justify-between relative overflow-clip">
      <Carousel.Root
        itemCount={items.length}
        handleNavigate={handleNavigate}
        isDraggable
      >
        <Carousel.Content>
          {items.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="flex items-center size-3/10 justify-center bg-black text-white rounded-lg">
                {item}
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        <Carousel.Navigation>
          <Carousel.NavigationLeft>
            <HiArrowLongLeft size={30} />
          </Carousel.NavigationLeft>
          <Carousel.NavigationRight>
            <HiArrowLongRight size={30} />
          </Carousel.NavigationRight>
        </Carousel.Navigation>

        <Carousel.Indicator />
      </Carousel.Root>
      <button>
        <CiBookmark
          className="absolute top-5 right-5 hover:fill-black duration-300 transition z-10"
          size={30}
        />
      </button>
      <div className="flex items-center justify-between">
        <div className="w-[250px] space-y-2">
          <h1>Lemaire Boxy Blouson Coat 'Graphite Blue'</h1>
          <div className="flex items-center justify-between bg-gray-300/5">
            <div className="flex items-center border-t border-l">
              <button className="p-2 border-r border-b flex items-center gap-1">
                <PiArrowFatDownThin size={20} />
                <span className="opacity-50 text-[10px]">1.2k</span>
              </button>
              <button className="p-2 border-r border-b flex items-center gap-1">
                <PiArrowFatUpThin size={20} />
                <span className="opacity-50 text-[10px]">1.4k</span>
              </button>
              <Comment />
            </div>
            <button className="p-2 border">
              <PiShareFatThin size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[10px] underline">
            <Link to="#">Sneakers</Link>
            <Link to="#">Apparrel</Link>
            <Link to="#">Jordan</Link>
          </div>
        </div>
        <Info />
      </div>
    </section>
  );
};

export default Index;
