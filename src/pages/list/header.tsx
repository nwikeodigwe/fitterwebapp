import clsx from "clsx";

interface Props {
  title?: string;
  description?: string;
  count?: number;
  className?: string;
}

const Header: React.FC<Props> = ({ title, description, count, className }) => {
  const max = count && count > 1000 ? "1000+" : count;
  return (
    <section className={clsx("flex items-center h-[70vh]", className)}>
      <div className="flex justify-between w-full">
        <div className="flex space-x-5">
          <h2 className="uppercase font-bold">{title}</h2>
          <p className="max-w-[70ch]">{description}</p>
        </div>
        <p>{max}</p>
      </div>
    </section>
  );
};

export default Header;
