import {
  useGetItemCountQuery,
  useGetItemsQuery,
} from "@/features/item/service";
import Header from "../header";
import Skeleton from "../skeleton";
import Grid from "../grid";
import Error from "../error";

const Index = () => {
  const { data } = useGetItemCountQuery({});
  const count = data?.count ?? 0;

  const { data: response, isLoading, error } = useGetItemsQuery({});

  const items = response?.items || [];
  const errMsg = count === 0 ? "No Item found" : "An unexpected error occured";

  const view = isLoading ? (
    <Skeleton />
  ) : error ? (
    <Error message={errMsg} />
  ) : (
    <Grid data={items} href="items" />
  );

  return (
    <div className="main">
      <Header
        title="Items"
        description="New releases from Nike, Air Jordan, adidas, New Balance, ASICS and more. Discover all of the latest sneaker drops with our curated collection."
        count={count}
        className="header"
      />
      {view}
    </div>
  );
};

export default Index;
