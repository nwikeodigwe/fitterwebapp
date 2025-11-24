import clsx from "clsx";
import React from "react";

interface Props {
    text?: string
}
const Description: React.FC<Props> = ({text}) => {
  return (
    <div
      className={clsx(
        "border-b px-3 py-4 space-y-4",
        !text && "hidden"
      )}
    >
      <p>{text}</p>
    </div>
  );
};

export default Description;
