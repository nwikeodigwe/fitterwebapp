import clsx from "clsx";
import PanelComponent from "@/components/panel";
import {
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useGetListByFilterQuery } from "@/features/main/service";
import Context, { type Data } from "../../../../context";
import Missing from "../../missing";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  designer: string;
}
const Panel: React.FC<Props> = ({ isOpen, setIsOpen, designer }) => {
  const context = useContext(Context);
  if (!context) throw new Error("Panel must be used within a View Component");

  const [byDesigner, setByDesigner] = useState<Data[]>([]);

  const query = {
    color: designer,
    flexible: true,
    limit: 10,
  };

  const { data, isLoading, error } = useGetListByFilterQuery({
    model: context.model!,
    ...query,
  });

  useEffect(() => {
    if (isLoading || error) return;
    setByDesigner(
      data?.[context.model!].filter(
        (item: Data) => item.id !== context.data[context.index!].id
      ) || []
    );
  }, [isLoading, error, data, context]);

  return (
    <PanelComponent.Root
      open={isOpen}
      isClosable
      isDraggable
      handleClose={() => setIsOpen(false)}
      className={clsx(
        `absolute top-1/5 right-2/3 w-[90vw] max-w-[300px] mr-10 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow border border-gray-900 bg-white max-h-[83%] overflow-y-scroll no-scrollbar z-20`
      )}
    >
      <PanelComponent.Header>Designed by {designer}</PanelComponent.Header>
      <PanelComponent.Content>
        <div className="grid grid-cols-4 gap-3 space-x-2 p-3">
          <Missing show={!!byDesigner} />
          {byDesigner.map((item, i) => (
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
  );
};

export default Panel;
