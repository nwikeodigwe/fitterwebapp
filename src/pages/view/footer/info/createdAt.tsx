import type React from "react";

interface Props {
  date: string;
}
const CreatedAt: React.FC<Props> = ({ date }) => {
  const createdAt = new Date(date);
  return (
    <div className="border-b px-3 py-4 flex items-center justify-between">
      <h2 className="text-[10px]">Created at</h2>
      <p className="">{createdAt.toLocaleDateString("de-DE")}</p>
    </div>
  );
};

export default CreatedAt;
