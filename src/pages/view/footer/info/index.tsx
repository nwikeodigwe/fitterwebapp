import Panel from "@/components/panel";
import clsx from "clsx";
import { PiInfoThin } from "react-icons/pi";
import type { Data } from "../../context";
import { useState } from "react";
import Recommendations from "./recommendations";
import Related from "./related";
import Tags from "./tags";
import Brand from "./brand";
import Designers from "./designers";
import Material from "./material";
import Season from "./season";
import Color from "./color";
import Colorway from "./colorway";
import Creator from "./creator";
import CreatedAt from "./createdAt";
import Description from "./description";

interface Props {
  data: Data;
}
const Index: React.FC<Props> = ({ data }) => {
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
          "absolute top-0 right-0 w-[90vw] max-w-[300px] mr-10 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow border border-gray-900 bg-white max-h-[83%] overflow-y-scroll no-scrollbar z-10"
        )}
      >
        <Panel.Header>
          <h2 className="text-[10px]">Information</h2>
        </Panel.Header>
        <Panel.Content>
          <Description text={data?.description} />
          <Brand id={data?.id} name={data?.brand?.name} />
          <Tags name={data?.tags[0]?.name} />
          <Season season={data?.season} />
          <Recommendations
            id={data?.id}
            brand={data?.brand?.name}
            tags={data?.tags}
            designers={data?.designers}
          />
          <Designers designers={data?.designers} />
          <Material material={data?.material} />
          <Color color={data?.color} />
          <Colorway color={data?.colorway} />
          <Related
            id={data?.id}
            releaseYear={data?.releaseYear}
            season={data?.season}
            tags={data?.tags}
            author={data?.author?.name}
          />
          <Creator name={data?.creator?.name} />
          <CreatedAt date={data?.createdAt} />
        </Panel.Content>
      </Panel.Root>
    </div>
  );
};

export default Index;
