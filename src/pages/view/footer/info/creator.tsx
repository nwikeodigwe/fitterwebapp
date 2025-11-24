import clsx from "clsx";
import { Link } from "react-router";

interface Props {
  name?: string;
}
const creator: React.FC<Props> = ({ name }) => {
  return (
    <div
      className={clsx(
        "border-b px-3 py-4 flex items-center justify-between",
        !name && "hidden"
      )}
    >
      <h2 className="text-[10px]">Created by</h2>
      <Link
        to="#"
        className="hover:underline duration-150 transition flex flex-col group items-center justify-center"
      >
        <div className="size-10 bg-black/10 rounded-full"></div>
        <p className="duration-150 transition invisible group-hover:visible">
          {name}
        </p>
      </Link>
    </div>
  );
};

export default creator;
