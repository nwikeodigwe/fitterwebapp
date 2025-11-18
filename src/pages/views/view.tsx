import clsx from "clsx";
import Card, { type CardProps } from "./card";

interface Props {
  data?: CardProps[];
  href: string;
  className?: string;
}

const View: React.FC<Props> = ({ className, href, data }) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  border-l border-t",
        className
      )}
    >
      {data?.map((item) => (
        <Card
          key={item.slug}
          href={href}
          name={item.name}
          slug={item.slug}
          className={className}
          handleLike={item.handleLike}
        />
      ))}
    </div>
  );
};

export default View;
