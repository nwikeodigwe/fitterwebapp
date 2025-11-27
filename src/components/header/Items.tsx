import { Link } from "react-router";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { SerializedError } from "@reduxjs/toolkit";
import type { Tag } from "@/types/items/tags";

interface Props {
  data: Tag[] | null;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

const Items = ({ data, isLoading, error }: Props) => {
  if (isLoading || error || !data) return null;

  const items = data.map((tag, i) => (
    <div key={i} className="flex flex-col gap-2">
      <h3 className="text-gray-500 capitalize">{tag?.name}</h3>
      <ul className="space-y-2 mt-1">
        {tag?.items.map((item, i) => (
          <li key={i}>
            <Link
              to={`/items/${item.name
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")}`}
              className="hover:underline transition-all ease-in-out duration-200 capitalize"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));

  return (
    <div className="grid grid-cols-5 space-y-4 space-x-3 justify-between w-full p-4">
      {items}
    </div>
  );
};

export default Items;
