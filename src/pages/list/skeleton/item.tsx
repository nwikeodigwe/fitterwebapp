import Card from "@/components/card";
import Grid from "@/components/grid";

const Item = () => {
  return (
    <Grid.Item>
      <Card.Root className="animate-pulse p-2 flex flex-col justify-between h-[350px]">
        <Card.Header className="p-1 flex items-start justify-between gap-2">
          <div className="h-2 w-6 bg-black/5"></div>
          <div className="h-2 w-20 bg-black/5"></div>
          <div className="size-8 bg-black/5"></div>
        </Card.Header>
        <Card.Content className="flex items-end justify-center h-full">
          <div className="size-30 bg-black/5"></div>
        </Card.Content>
        <Card.Footer className="flex items-center justify-between">
          <div className="size-7 bg-black/5 rounded-full"></div>
          <div className="size-7 bg-black/5 rounded-full"></div>
        </Card.Footer>
      </Card.Root>
      <div></div>
    </Grid.Item>
  );
};

export default Item;
