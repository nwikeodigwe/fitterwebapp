import { Link } from "react-router";
import data from "./data.json";

const Brands = () => {
  return (
    <div className="grid grid-cols-4 gap-3 justify-between w-full p-4">
      {Object.entries(data.brands).map(([category, brands]) => (
        <div key={category} className="flex flex-col gap-2">
          <h3 className="text-gray-500">{category}</h3>
          <ul className="space-y-2 mt-1">
            {brands.map((brand) => (
              <li key={brand}>
                <Link
                  to={`/brands/${brand
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")}`}
                  className="hover:underline transition-all ease-in-out duration-200"
                >
                  {brand}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Brands;
