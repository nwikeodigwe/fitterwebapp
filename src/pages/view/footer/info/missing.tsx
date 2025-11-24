import clsx from "clsx";
import { GrDocumentMissing } from "react-icons/gr";

interface Props {
  show: boolean;
}
const missing: React.FC<Props> = ({ show }) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center h-full col-span-4 opacity-20",
        !show && "hidden"
      )}
    >
      <GrDocumentMissing size={50} />
      <p className="text-[10px] mt-2">No record found</p>
    </div>
  );
};

export default missing;
