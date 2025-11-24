import clsx from "clsx";
import {
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import PanelComponent from "@/components/panel";
import { useGetListByFilterQuery } from "@/features/main/service";
import Context, { type Data } from "../../../context";
import { Portal } from "radix-ui";
import Missing from "../missing";

interface Props {
  color?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const Panel: React.FC<Props> = ({ color, isOpen, setIsOpen }) => {
  const context = useContext(Context);
  if (!context) throw new Error("Panel must be used within a View Component");

  const [byColor, setByColor] = useState<Data[]>([]);

  const query = {
    color: color,
    flexible: true,
    limit: 10,
  };

  const { data, isLoading, error } = useGetListByFilterQuery({
    model: context.model!,
    ...query,
  });

  useEffect(() => {
    if (isLoading || error) return;
    setByColor(
      data?.[context.model!].filter(
        (item: Data) => item.id !== context.data[context.index!].id
      ) || []
    );
  }, [isLoading, error, data, context]);

  return (
    <Portal.Root>
      <PanelComponent.Root
        open={isOpen}
        isClosable
        isDraggable
        handleClose={() => setIsOpen(false)}
        className={clsx(
          `absolute top-1/4 right-1/3 w-[90vw] max-w-[350px] mr-10 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow border border-gray-900 bg-white max-h-[83%] overflow-y-scroll no-scrollbar z-10`
        )}
      >
        <PanelComponent.Header>
          <p>
            Main color <span>{color}</span>
          </p>
        </PanelComponent.Header>
        <PanelComponent.Content>
          <div className="grid grid-cols-4 gap-3 space-x-2 p-3">
            <Missing show={!!byColor} />
            {byColor.map((item, i) => (
              <div key={i} className="group">
                <div className="size-20 bg-black"></div>
                <p className="text-[10px] whitespace-nowrap relative invisible group-hover:visible">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </PanelComponent.Content>
      </PanelComponent.Root>
    </Portal.Root>
  );
};

export default Panel;
