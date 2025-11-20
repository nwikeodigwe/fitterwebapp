import Carousel from "@/components/carousel";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

const content = () => {
  const items = ["first", "second", "third", "fouth", "fifth"];
  const handleNavigate = (direction: "left" | "right" | undefined) => {
    console.log(`Navigating ${direction}`);
  };
  return (
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
  );
};

export default content;
