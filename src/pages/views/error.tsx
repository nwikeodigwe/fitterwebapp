import { VscWarning } from "react-icons/vsc";

interface Props {
  name: string;
}
const Error: React.FC<Props> = ({name}) => {
  return (
    <section>
      <div className="flex items-center justify-center gap-2 p-2 border border-red-500 bg-red-50 text-red-500">
        <VscWarning size={20} />
        <span>
          Opps! An unexpected error occured while tring to fetch {name}. Possibly no {name} found
        </span>
      </div>
    </section>
  );
};

export default Error;
