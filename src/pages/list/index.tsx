import Nav from "./nav";
import Content from "./content";
import ListContext from "./context";
import { useNavigate, useParams } from "react-router";
import { useGetListByFilterQuery } from "@/features/main/service";
import summary from "./data.json";
import reducer, { initialState } from "./reducer";
import { useEffect, useReducer } from "react";

type Param = "items" | "brands" | "styles" | "collections";

const Index = () => {
  const navigate = useNavigate();
  const { entity } = useParams();
  const param = entity as Param;
  const validParam: Param[] = ["items", "brands", "styles", "collections"];
  if (!validParam.includes(param as Param)) {
    navigate("/not-found");
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    data: response,
    isLoading,
    error,
  } = useGetListByFilterQuery({
    param,
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
          name: state.name,
          description: state.description,
          count: state.count,
          data: state.data,
          isLoading: state.isLoading,
          error: state.error,
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
