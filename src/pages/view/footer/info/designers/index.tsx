import Designer from "./designer";
import clsx from "clsx";

interface Props {
  designers?: [{ name: string }];
}
const Designers: React.FC<Props> = ({ designers }) => {
  return (
    <div
      className={clsx(
        "border-b px-3 py-4 flex items-center justify-between",
        !designers?.length && "hidden"
      )}
    >
      <h2 className="text-[10px]">Designer</h2>
      {designers?.map((designer, i) => (
        <Designer key={i} designer={designer?.name} />
      ))}
    </div>
  );
};

export default Designers;
