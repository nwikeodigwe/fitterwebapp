import Card from "@/components/card";
import Grid from "@/components/grid";
import clsx from "clsx";
import { CiCircleInfo, CiHeart } from "react-icons/ci";
import { Link } from "react-router";

interface Props {
  releaseYear?: number;
  name?: string;
  className?: string;
}
const Item: React.FC<Props> = ({ ...props }) => {
  console.log(props);

  return (
    <Grid.Item>
      <Link to="#" className={clsx("", props.className)}>
        <Card.Root className="p-2 flex flex-col justify-between h-[350px] ">
          <Card.Header className="p-1 flex items-start justify-between gap-2">
            <span className="text-[10px] opacity-80">{props.releaseYear}</span>
            <p className="truncate hover:whitespace-normal hover:overflow-visible duration-150 transition">
              {props.name}
            </p>
            <button
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer hover:text-red-500 duration-150 transition"
            >
              <CiHeart size={25} />
            </button>
          </Card.Header>
          <Card.Content className="flex items-end justify-center">
            <div className="bg-black/10"></div>
          </Card.Content>
          <Card.Footer className="flex items-center justify-between">
            <span className="size-7 rounded-full bg-black/20"></span>
            <button>
              <CiCircleInfo size={25} />
            </button>
          </Card.Footer>
        </Card.Root>
      </Link>
    </Grid.Item>
  );
};

export default Item;
