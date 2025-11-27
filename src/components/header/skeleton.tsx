import clsx from "clsx";

interface Props {
  row?: number;
  col?: number;
  show: boolean;
}
const Skeleton: React.FC<Props> = ({ row = 5, col = 4, show }) => {
  return (
    <div
      className={clsx(
        "gap-2 animate-pulse grid grid-cols-4 justify-between p-5",
        !show && "hidden"
      )}
    >
      {Array.from({ length: col }, (_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          {Array.from({ length: row }, (_, j) => (
            <div key={j} className="h-2 w-10 bg-black/10"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
