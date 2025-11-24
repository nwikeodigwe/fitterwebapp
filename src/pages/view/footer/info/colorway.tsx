import clsx from "clsx";

interface Props {
  color?: string;
}
const Colorway: React.FC<Props> = ({ color }) => {
  return (
    <div
      className={clsx(
        "border-b px-3 py-4 flex items-center justify-between",
        !color && "hidden"
      )}
    >
      <h2 className="text-[10px]">ColorWay</h2>
      <p className=" lowercase">{color}</p>
    </div>
  );
};

export default Colorway;
