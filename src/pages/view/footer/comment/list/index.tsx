import Card from "./card";
import {type Comment} from "../index";

interface Props {
  data: Comment[];
}

const Index: React.FC<Props> = ({data}) => {
  return <div>
    {data.map((comment, i) => (
      <Card key={i} data={comment} />
    ))}
  </div>;
};

export default Index;
