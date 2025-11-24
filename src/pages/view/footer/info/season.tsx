import clsx from "clsx";

interface Props {
  season?: string;
}

const Season: React.FC<Props> = ({ season }) => {
  return (
    <div
      className={clsx(
        "border-b px-3 py-4 flex items-center justify-between",
        !season && "hidden"
      )}
    >
      <h2 className={clsx("text-[10px]")}>Season</h2>
      <p>{season}</p>
    </div>
  );
};

export default Season;
