import { useNavigate, useParams } from "react-router";
import type { Model } from "../list";
import { useGetListingQuery } from "@/features/main/service";
import Error from "./error";
import Skeleton from "./skeleton";
import Display from "./display";
import Context, { type Data } from "./context";
import { useEffect, useState } from "react";

const Index = () => {
  const { model, slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);
  const [index, setIndex] = useState<number>(0);

  const validParam: Model[] = ["items", "brands", "styles", "collections"];
  const param = model as Model;
  if (!validParam.includes(param)) {
    navigate("/not-found");
  }

  const toggleFavorite = () => {
    console.log("this");
  };

  const toggleVote = () => {
    console.log("that");
  };

  const handleNavigate = (direction: "left" | "right") => {
    console.log(direction);

    if (direction === "left") {
      setIndex((prev) => --prev); // Decrement the index
    } else {
      setIndex((prev) => ++prev); // Increment the index
    }
  };

  const {
    data: response,
    isLoading,
    error,
  } = useGetListingQuery({ model, slug });

  useEffect(() => {
    if (isLoading || error) return;

    if (response && model) setData([response[model]]);
  }, [isLoading, error, response, model]);



  return (
    <>
      <Context.Provider
        value={{
          data,
          toggleFavorite,
          toggleVote,
          handleNavigate,
          index,
          model: param,
          slug,
        }}
      >
        {isLoading ? <Skeleton /> : error ? <Error /> : <Display />}
      </Context.Provider>
    </>
  );
};

export default Index;
