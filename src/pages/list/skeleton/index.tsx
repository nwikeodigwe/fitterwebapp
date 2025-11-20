import Grid from "@/components/grid";
import Item from "./item";

const Index = () => {
  return (
    <Grid.Root border grid={1} sm={2} md={3} lg={4}>
      {Array.from({ length: 8 }, (_, index) => (
        <Item key={index + 1} />
      ))}
    </Grid.Root>
  );
};

export default Index;
