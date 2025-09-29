import type { Tag } from "@/types/brands/tags";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Link } from "react-router";

interface Props {
  data: Tag[] | null;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

const Brands = ({ data, isLoading, error }: Props) => {
  if (isLoading || error || !data) return null;
  const tags = data.map((tag, i) => (
    <div key={i} className="flex flex-col gap-2">
      <h3 className="text-gray-500 capitalize">{tag?.name}</h3>
      <ul className="space-y-2 mt-1">
        {tag?.brands.map((brand, i) => (
          <li key={i}>
            <Link
              to={`/brands/${brand.name
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")}`}
              className="hover:underline transition-all ease-in-out duration-200 capitalize"
            >
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));
  return (
    <div className="grid grid-cols-4 gap-3 justify-between w-full p-4">
      {tags}
    </div>
  );
};

export default Brands;
