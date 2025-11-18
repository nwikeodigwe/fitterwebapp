import { VscWarning } from "react-icons/vsc";

interface Props {
  message: string;
}
const Error: React.FC<Props> = ({ message }) => {
  return (
    <section>
      <div className="flex items-center justify-center gap-2 p-2 border border-red-500 bg-red-50 text-red-500">
        <VscWarning size={20} />
        <span>{message}</span>
      </div>
    </section>
  );
};

export default Error;
