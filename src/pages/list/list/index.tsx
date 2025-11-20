import Grid from "@/components/grid";
import Item from "./item";
import { useContext } from "react";
import ListContext from "../context";
import Skeleton from "../skeleton";
import Status from "@/components/status";

const List = () => {
  const context = useContext(ListContext);
  const { data, isLoading, error, count, name } = context || {};

  const errorMessage =
    count === 0 ? `No ${name} found` : "An unexpected error occured";

  const list = (
    <Grid.Root border grid={1} sm={2} md={3} lg={4}>
      {data?.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </Grid.Root>
  );

  return isLoading ? (
    <Skeleton />
  ) : error ? (
    <Status type="error" message={errorMessage} />
  ) : (
    list
  );


};

export default List;
