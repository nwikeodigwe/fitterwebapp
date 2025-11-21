import { useContext, useEffect } from "react";
import ListContext from "../context";
import Brands from "./brands";
import Colors from "./colors";
import Context from "./context";
import Gender from "./gender";
import ReleaseYear from "./releaseYear";
import Tags from "./tags";
import { useSearchParams } from "react-router";
import clsx from "clsx";

const Index = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const context = useContext(ListContext);
  if (!context)
    throw new Error(
      "Nav component must be used within a List context Provider"
    );

  const { filters, dispatch } = context;

  useEffect(() => {
    // if (Object.keys(filters).length === 0) return;
    setSearchParams({ ...filters });
  }, [filters, setSearchParams]);

  const toggleFilter = (data: Record<string, string>) => {
    const [key, value] = Object.entries(data)[0];
    if (filters[key] === value)
      return dispatch({ type: "REMOVE_FILTER", payload: key });
    dispatch({ type: "ADD_FILTER", payload: { ...filters, ...data } });
  };

  const handleReset = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };

  return (
    <Context.Provider value={{ toggleFilter }}>
      <div className="side relative overflow-scroll no-scrollbar max-h-[95vh]">
        <div className="sticky top-0 left-0 w-full pt-40 pb-20">
          <ul className="flex flex-col items-ends">
            <li className="text-right">
              <button
                onClick={() => toggleFilter({ sort: "popular" })}
                className="hover:underline"
              >
                Popular
              </button>
            </li>
            <li className="text-right">
              <button
                onClick={() => toggleFilter({ sort: "latest" })}
                className="hover:underline"
              >
                Recent releases
              </button>
            </li>
            <li className="text-right">
              <button
                onClick={() => toggleFilter({ sort: "newest" })}
                className="hover:underline"
              >
                New In
              </button>
            </li>
          </ul>
          <div
            className={clsx(
              "flex justify-end mt-5",
              !Object.keys(filters).length && "hidden"
            )}
          >
            <button onClick={handleReset} className="hover:underline">
              Reset
            </button>
          </div>
          <ul className="flex flex-col items-ends mt-5">
            <li className="text-right">
              <Brands />
            </li>
          </ul>
          <ul className="flex flex-col items-ends mt-5">
            {/* <li className="text-right">
              <button className="hover:underline">Category</button>
            </li> */}
            <li className="text-right">
              <Gender />
            </li>
            <li className="text-right">
              <Colors />
            </li>
            <li className="text-right">
              <ReleaseYear />
            </li>
            <li className="text-right">
              <Tags />
            </li>
          </ul>
        </div>
      </div>
    </Context.Provider>
  );
};

export default Index;
