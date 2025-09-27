import { DropdownMenu } from "radix-ui";
import Input from "../input";
import { Link } from "react-router";
import { IoClose } from "react-icons/io5";

const featured = [
  "Shop all Items",
  "New in: Supreme",
  "Tom Sarchs X Mars Yard 3.0",
  "Air Jordan 3 Retro 'El Vuelo'",
  "Yu-Gi-Oh! x Air Max Muscle 95 QS",
  "Kobe 9 Elite Low Protro 'Moonwalker' 2025",
  "Air Jordan 5 Retro 'Fire Red' 2025",
  "Fragment Design x Travis Scott x Air Jordan 1 Retro Low OG SP 'Sail Military Blue'",
];

const latest = [
  "Jordan 4",
  "Dunks",
  "Sp5der",
  "Ja 3",
  "Off white",
  "Jordan 6",
  "Hoodie",
  "Nike Tech",
  "Kobe 6",
  "Jordan 5",
];

const recent = ["Jordan 4", "Dunks", "Sp5der", "Ja 3", "Off white"];

const Search = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className="cursor-pointer p-0"
        aria-label="Customise options"
      >
        Search
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-[400px] bg-white border border-gray-900 -translate-y-[25px] translate-x-3">
          <Input
            name="search"
            className="border-b border-gray-900 p-3"
            placeholder="Type to search"
          />
          <div className="flex flex-wrap gap-2 p-3">
            {featured.map((feature, i) => (
              <Link
                key={i}
                to="/"
                className="py-[2px] px-[5px] border border-gray-900 text-center"
              >
                {feature}
              </Link>
            ))}
          </div>
          <div className="p-3 mt-5">
            <h3 className="mb-3 text-[10px]">Latest searches</h3>
            <div className="flex flex-wrap gap-2">
              {latest.map((late, i) => (
                <Link
                  key={i}
                  to="/"
                  className="py-[2px] px-[5px] border border-gray-900 text-center"
                >
                  {late}
                </Link>
              ))}
            </div>
          </div>
          <div className="p-3 mt-5">
            <h3 className="mb-3 text-[10px]">Your recent searches</h3>
            <div className="flex flex-col gap-2">
              {recent.map((search, i) => (
                <Link
                  key={i}
                  to="/"
                  className="flex items-center justify-between"
                >
                  {search}
                  <IoClose />
                </Link>
              ))}
            </div>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Search;
