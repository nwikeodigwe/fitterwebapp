import { Link } from "react-router";
import data from "./data.json";

const Collections = () => {
  return (
    <div className="grid grid-cols-5 space-y-4 space-x-3 justify-between w-full p-4">
      {Object.entries(data.collections).map(([categories, collection]) => (
        <div key={categories} className="flex flex-col gap-2">
          <h3 className="text-gray-500">{categories}</h3>
          <ul className="space-y-2 mt-1">
            {collection.map((collection) => (
              <li key={collection}>
                <Link
                  to={`/brands/${collection
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")}`}
                  className="hover:underline transition-all ease-in-out duration-200"
                >
                  {collection}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Collections;
