import clsx from "clsx";

interface Props {
  show: boolean;
}
const Empty: React.FC<Props> = ({ show }) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-1 justify-center",
        show && "hidden"
      )}
    >
      <span className="h-[1px] w-10 bg-black/20"></span>
      <p className="text-[10px] opacity-40">
        No comments yet. be the first to comment
      </p>
      <span className="h-[1px] w-10 bg-black/20"></span>
    </div>
  );
};

export default Empty;
