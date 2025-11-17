import clsx from "clsx";

interface Props {
  title: string;
  description: string;
  count: number;
  className?: string;
}
const Header: React.FC<Props> = ({ title, description, count, className }) => {
  const max = count > 1000 ? "1000+" : count;
  return (
    <section
      className={clsx("flex justify-between header h-[50vh] py-20", className)}
    >
      <div className="flex space-x-5">
        <h2 className="uppercase font-bold">{title}</h2>
        <p className="max-w-[70ch]">{description}</p>
      </div>
      <p>{max}</p>
    </section>
  );
};

export default Header;
