import clsx from "clsx";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router";

export interface CardProps {
  slug: string;
  href: string;
  className?: string;
  releaseYear?: number;
  name?: string;
  handleLike: (id: string) => void;
}
const Card: React.FC<CardProps> = ({ className, handleLike, ...props }) => {
  return (
    <Link
      to={`/${props.href}/${props.slug}`}
      className={clsx(
        "border-r border-b h-[350px] bg-white flex flex-col justify-between p-2",
        className
      )}
    >
      <div className="flex items-start justify-between space-x-2">
        <p>{props.releaseYear}</p>
        <h2 className="truncate hover:text-clip hover:whitespace-normal hover:overflow-visible delay-150 transition">
          {props.name}
        </h2>
        <button
          onClick={() => handleLike(props.slug)}
          className="hover:text-red-500 duration-150 transition cursor-pointer"
        >
          <MdFavoriteBorder size={20} />
        </button>
      </div>
      <div></div>
    </Link>
  );
};

export default Card;
