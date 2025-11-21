import Header from "./header";
import List from "./list";
import useList from "./useList";

const Content = () => {
  const { count, name } = useList();
  return (
    <div className="main overflow-x-scroll h-[95vh]">
      <Header
        title={name}
        description="New releases from Nike, Air Jordan, adidas, New Balance, ASICS and more. Discover all of the latest sneaker drops with our curated collection."
        count={count}
        className="header"
      />
      <List />
    </div>
  );
};

export default Content;
