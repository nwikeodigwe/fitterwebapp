import {
  useGetStyleCountQuery,
  useGetStylesQuery,
} from "@/features/style/service";
import Header from "../header";
import View from "../view";
import Skeleton from "../skeleton";
import Error from "../error";

const Index = () => {
  const { data } = useGetStyleCountQuery({});
  const count = data?.count ?? 0;
  const { data: response, isLoading, error } = useGetStylesQuery({});
  const styles = response?.styles || [];

  const errMsg = count === 0 ? "No style found" : "An unexpected error occured";

  const view = isLoading ? (
    <Skeleton />
  ) : count === 0 || error ? (
    <Error message={errMsg} />
  ) : (
    <View data={styles} href={"styles"} />
  );

  return (
    <div className="main">
      <Header
        title="Styles"
        description="New releases from Nike, Air Jordan, adidas, New Balance, ASICS and more. Discover all of the latest sneaker drops with our curated collection."
        count={count}
        className="header"
      />
      {view}
    </div>
  );
};

export default Index;
