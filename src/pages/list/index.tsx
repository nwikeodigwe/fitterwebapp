import Nav from "./nav";
import Content from "./content";
import ListContext from "./context";
import { useNavigate, useParams, useSearchParams } from "react-router";
import {
  useFavoriteMutation,
  useUnfavoriteMutation,
  useGetListByFilterQuery,
} from "@/features/main/service";
import summary from "./data.json";
import reducer, { initialState } from "./reducer";
import { useEffect, useReducer } from "react";

type Param = "items" | "brands" | "styles" | "collections";

const Index = () => {
  const navigate = useNavigate();
  const { entity } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const param = entity as Param;
  const validParam: Param[] = ["items", "brands", "styles", "collections"];
  if (!validParam.includes(param as Param)) {
    navigate("/not-found");
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [favorite] = useFavoriteMutation();
  const [unfavorite] = useUnfavoriteMutation();

  const query = Object.fromEntries(searchParams.entries());

  const {
    data: response,
    isLoading,
    error,
  } = useGetListByFilterQuery({
    param,
    ...query,
  });

  //   useEffect(() => {
  //     dispatch({ type: "SET_DATA", payload: [] });
  //   }, [param]);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_DATA", payload: [] });
    dispatch({ type: "SET_NAME", payload: param });
    dispatch({ type: "SET_DESCRIPTION", payload: summary[param] });
    dispatch({ type: "SET_COUNT", payload: 0 });
    if (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "SET_ERROR", payload: true });
    }
    if (isLoading || error) return;
    dispatch({ type: "SET_ERROR", payload: false });
    dispatch({ type: "SET_DATA", payload: response?.[param] });
    dispatch({ type: "SET_COUNT", payload: response.count });
    dispatch({ type: "SET_LOADING", payload: false });
  }, [isLoading, error, param, response]);

  return (
    <>
      <ListContext.Provider
        value={{
          ...state,
          dispatch,
          handleFavorite: favorite,
          handleUnfavorite: unfavorite,
        }}
      >
        <div className="view-grid">
          <Nav />
          <Content />
        </div>
      </ListContext.Provider>
    </>
  );
};

export default Index;
