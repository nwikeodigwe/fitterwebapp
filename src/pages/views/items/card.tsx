import clsx from "clsx";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router";

interface Props {
  className?: string;
  href?: string;
}
const Card: React.FC<Props> = ({ className, ...props }) => {
  return (
    <Link
      to={props.href || "#"}
      className={clsx(
        "border-r border-b h-[350px] bg-white flex flex-col justify-between p-2",
        className
      )}
    >
      <div className="flex items-start justify-between space-x-2">
        <p>2027</p>
        <h2 className="truncate hover:text-clip hover:whitespace-normal hover:overflow-visible delay-150 transition">
          Fragment Design x Travis Scott x Air Jordan 1 Retro Low OG SP 'Sail
          Military Blue
        </h2>
        <button className="hover:text-red-500 duration-150 transition cursor-pointer">
          <MdFavoriteBorder size={20} />
        </button>
      </div>
      <div></div>
    </Link>
  );
};

export default Card;
