import Card from "@/components/card";
import Grid from "@/components/grid";
import clsx from "clsx";
import { Tooltip } from "radix-ui";
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEventHandler,
} from "react";
import { CiCircleInfo, CiHeart } from "react-icons/ci";
import { Link } from "react-router";
import ListContext from "../context";
import { useIsFavoritedQuery } from "@/features/main/service";

interface Props {
  id: string;
  releaseYear?: number;
  name?: string;
  description?: string;
  tags?: [{ name: string }];
  className?: string;
}
const Item: React.FC<Props> = ({ ...props }) => {
  const context = useContext(ListContext);
  if (!context) throw new Error("Item should be used within the ListContext");

  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const { data, isLoading, error } = useIsFavoritedQuery(
    {
      type: context.name,
      id: props.id,
    },
    {
      skip: !props.id || !context.name,
    }
  );

  const toggleFavorite: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (isFavorited)
        return context.handleUnfavorite({ type: context.name, id: props.id });

      context.handleFavorite({ type: context.name, id: props.id });
    },
    [context, isFavorited, props]
  );

  useEffect(() => {
    if (isLoading || error) return;
    setIsFavorited(data.favorited);
  }, [isLoading, error, setIsFavorited, data]);

  return (
    <Grid.Item>
      <Link to="#" className={clsx("cursor-default", props.className)}>
        <Card.Root className="p-2 flex flex-col justify-between h-[350px] ">
          <Card.Header className="p-1 flex items-start justify-between gap-2">
            <span className="text-[10px] opacity-80">{props.releaseYear}</span>
            <p className="truncate hover:whitespace-normal hover:overflow-visible duration-150 transition">
              {props.name}
            </p>
            <button
              onClick={toggleFavorite}
              className={clsx(
                "cursor-pointer hover:text-red-500 duration-150 transition",
                isFavorited && "text-red-500"
              )}
            >
              <CiHeart size={25} />
            </button>
          </Card.Header>
          <Card.Content className="flex items-end justify-center">
            <div className="bg-black/10"></div>
          </Card.Content>
          <Card.Footer className="flex items-center justify-between">
            <span className="size-7 rounded-full bg-black/20"></span>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  asChild
                >
                  <button>
                    <CiCircleInfo size={25} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content
                  sideOffset={5}
                  className="z-10 select-none bg-white p-2 absolute w-[300px] border m-4 space-y-2"
                >
                  <h2 className="text-[10px]">Description</h2>
                  <p>{props.description}</p>
                  <Tooltip.Arrow className="fill-white" />
                  <div className="flex-wrap space-x-2">
                    {props.tags &&
                      props.tags.map((tag) => (
                        <span className="text-[10px] text-black/50 hover:cursor-default duration-150 transition hover:underline hover:text-black/80">
                          {tag.name}
                        </span>
                      ))}
                  </div>
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </Card.Footer>
        </Card.Root>
      </Link>
    </Grid.Item>
  );
};

export default Item;
