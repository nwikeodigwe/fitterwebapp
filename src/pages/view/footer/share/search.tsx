import Fieldset from "@/components/fieldset";
import clsx from "clsx";

interface Props {
  className?: string;
}
const Search: React.FC<Props> = ({ className }) => {
  return (
    <Fieldset.Root className={clsx("border-b p-4 group", className)}>
      <Fieldset.Label htmlFor="search" className="sr-only">
        Search
      </Fieldset.Label>
      <Fieldset.Input type="search" placeholder="Enter name to search" />
    </Fieldset.Root>
  );
};

export default Search;
