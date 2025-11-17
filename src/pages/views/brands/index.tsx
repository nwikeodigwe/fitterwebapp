import { useGetBrandCountQuery } from "@/features/brand/service";
import Card from "../card";
import Header from "../header";

const Index = () => {
  const { data } = useGetBrandCountQuery({});
  const count = data?.count ?? 0;

  return (
    <div className="main">
      <Header
        title="Brands"
        description="New releases from Nike, Air Jordan, adidas, New Balance, ASICS and more. Discover all of the latest sneaker drops with our curated collection."
        count={count}
        className="header"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  border-l border-t">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Index;
