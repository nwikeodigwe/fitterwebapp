import type { ReactNode } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { VscWarning } from "react-icons/vsc";
import { GrStatusGood } from "react-icons/gr";
import { MdReportGmailerrorred } from "react-icons/md";
import clsx from "clsx";

interface Props {
  className?: string;
  message: string;
  type: "error" | "warning" | "info" | "success";
  children?: ReactNode;
}
const Error: React.FC<Props> = ({
  message,
  children,
  type = "info",
  className,
}) => {
  let icon;
  let color;

  switch (type) {
    case "info":
      icon = <CiCircleInfo size={20} />;
      color = "blue";
      break;
    case "success":
      icon = <GrStatusGood size={20} />;
      color = "green";
      break;
    case "warning":
      icon = <VscWarning size={20} />;
      color = "blue";
      break;
    case "error":
      icon = <MdReportGmailerrorred size={20} />;
      color = "red";
      break;
    default:
      icon = <CiCircleInfo size={20} />;
      color = "blue";
  }

  return (
    <div
      className={clsx(
        `flex items-center justify-center gap-2 p-2 border border-${color}-500 bg-${color}-50 text-${color}-500`,
        className
      )}
    >
      {icon}
      <span>{message || children}</span>
    </div>
  );
};

export default Error;
