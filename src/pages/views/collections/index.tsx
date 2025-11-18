import {
  useGetCollectionCountQuery,
  useGetCollectionsQuery,
} from "@/features/collection/service";
import Header from "../header";
import Skeleton from "../skeleton";
import View from "../view";
import Error from "../error";

const Index = () => {
  const { data } = useGetCollectionCountQuery({});
  const count = data?.count ?? 0;

  const { data: response, isLoading, error } = useGetCollectionsQuery({});
  const collections = response?.collections || [];

  const errMsg =
    count === 0 ? "No collection found" : "An unexpected error occured";

  const view = isLoading ? (
    <Skeleton />
  ) : count === 0 || error ? (
    <Error message={errMsg} />
  ) : (
    <View data={collections} href="collections" />
  );

  return (
    <div className="main">
      <Header
        title="Collections"
        description="New releases from Nike, Air Jordan, adidas, New Balance, ASICS and more. Discover all of the latest sneaker drops with our curated collection."
        count={count}
        className="header"
      />
      {view}
    </div>
  );
};

export default Index;
