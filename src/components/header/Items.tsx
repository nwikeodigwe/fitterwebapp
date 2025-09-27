import { Link } from "react-router";
import data from "./data.json";

const Items = () => {
  return (
    <div className="grid grid-cols-5 space-y-4 space-x-3 justify-between w-full p-4">
      {Object.entries(data.items).map(([categories, items]) => (
        <div key={categories} className="flex flex-col gap-2">
          <h3 className="text-gray-500">{categories}</h3>
          <ul className="space-y-2 mt-1">
            {items.map((item) => (
              <li key={item}>
                <Link
                  to={`/brands/${item
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")}`}
                  className="hover:underline transition-all ease-in-out duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Items;
