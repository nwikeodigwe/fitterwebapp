import clsx from "clsx";

interface Props {
  name: string;
}

const Tags: React.FC<Props> = ({ name }) => {
  return (
    <div className={clsx("border-b px-3 py-4 space-y-4", name && "hidden")}>
      <h2 className="text-[10px] capitalize">{name}</h2>
      <div className="flex items-center overflow-x-scroll no-scrollbar space-x-5">
        <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
        <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
        <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
        <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
        <div className="h-20 w-20 bg-black/10 flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default Tags;
