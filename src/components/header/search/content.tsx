import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
import { SearchContext } from "./context";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import clsx from "clsx";
import { removeSearch } from "@/features/search/slice";
import { useGetLatestSearchesQuery } from "@/features/search/service";

type Search = {
  query: string;
};

const Content = () => {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.search);

  const [recent, setRecent] = useState<string[]>([]);
  const [latest, setLatest] = useState<Search[] | []>([]);
  const [featured, setFeatured] = useState<Search[] | []>([]);

  const handleRemoveSearch = (query: string) => {
    setRecent((prev) => prev.filter((item) => item !== query));
    dispatch(removeSearch(query));
  };

  const {
    data: lastestSearches,
    isLoading: latestSearchesIsLoading,
    error: latestSearchesError,
  } = useGetLatestSearchesQuery({});

  const {
    data: featuredSearches,
    isLoading: featuredSearchesIsLoading,
    error: featuredSearchesError,
  } = useGetLatestSearchesQuery({});

  useEffect(() => {
    if (latestSearchesIsLoading || latestSearchesError) return;
    setLatest(lastestSearches.searches);
  }, [lastestSearches, latestSearchesError, latestSearchesIsLoading]);

  useEffect(() => {
    if (featuredSearchesIsLoading || featuredSearchesError) return;
    setFeatured(featuredSearches.searches);
  }, [featuredSearches, featuredSearchesError, featuredSearchesIsLoading]);

  useEffect(() => {
    if (search.length) setRecent(search);
  }, [search]);

  const context = useContext(SearchContext);
  const { query, result } = context || {};
  return (
    <>
      <div className="flex flex-wrap gap-2 p-3">
        {query && result ? (
          <>
            <Link
              to={`/search/${(query ?? "")
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")}`}
              className="py-[2px] px-[5px] border border-gray-900 text-center"
            >
              All {query}
            </Link>

            {result.items.map((item, i) => (
              <Link
                key={i}
                to={`/item/${item.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")}`}
                className="py-[2px] px-[5px] border border-gray-900 text-center"
              >
                {item.name}
              </Link>
            ))}

            {result.brands.map((brand, i) => (
              <Link
                key={i}
                to={`/brand/${brand.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")}`}
                className="py-[2px] px-[5px] border border-gray-900 text-center"
              >
                {brand.name}
              </Link>
            ))}

            {result.collections.map((collection, i) => (
              <Link
                key={i}
                to={`/collection/${collection.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")}`}
                className="py-[2px] px-[5px] border border-gray-900 text-center"
              >
                {collection.name}
              </Link>
            ))}
          </>
        ) : (
          <>
            {featured.map((feature, i) => (
              <Link
                key={i}
                to="/search"
                className="py-[2px] px-[5px] border border-gray-900 text-center"
              >
                {feature.query}
              </Link>
            ))}
          </>
        )}
      </div>
      <div
        className={clsx(
          "p-3 mt-5",
          !latest.length && "hidden",
          query && "hidden"
        )}
      >
        <h3 className="mb-3 text-[10px]">Latest searches</h3>
        <div className="flex flex-wrap gap-2">
          {latest.length &&
            latest.map((late, i) => (
              <Link
                key={i}
                to={`/search/${late.query}`}
                className="py-[2px] px-[5px] border border-gray-900 text-center"
              >
                {late.query}
              </Link>
            ))}
        </div>
      </div>
      <div
        className={clsx(
          "p-3 mt-5",
          !recent.length && "hidden",
          query && "hidden"
        )}
      >
        <h3 className="mb-3 text-[10px]">Your recent searches</h3>
        <div className="flex flex-col gap-2">
          {recent.length &&
            recent.map((search, i) => (
              <div key={i} className="flex items-center justify-between">
                <Link
                  to={`/search/${search
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")}`}
                >
                  {search}
                </Link>
                <button
                  onClick={() => handleRemoveSearch(search)}
                  className="cursor-pointer"
                >
                  <IoClose />
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Content;
