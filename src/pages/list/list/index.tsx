import Grid from "@/components/grid";
import Item from "./item";
import Skeleton from "../skeleton";
import Status from "@/components/status";
import useList from "../useList";

const List = () => {
  const context = useList()
  const { data, isLoading, error, count, name } = context || {};

  const errorMessage =
    count === 0 ? `No ${name} found` : "An unexpected error occured";

  const list = (
    <Grid.Root border grid={1} sm={2} md={3} lg={4} className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
