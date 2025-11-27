import Panel from "@/components/panel";
import { useContext, useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import List from "./list";
import Form from "./form";
import clsx from "clsx";
import Empty from "./empty";
import { useGetCommentsQuery } from "@/features/main/service";
import Context from "../../context";
import Skeleton from "./skeleton";

interface Props {
  count: number;
}

export type Comment = {
  id: string;
  author: { name: string; avatar: { image: { url: string } } };
  content: string;
  replies: Comment[];
};
const Index: React.FC<Props> = ({ count }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "Comments component must be used within the comment context provider"
    );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, isLoading, error } = useGetCommentsQuery({
    model: context.model!,
    id: context.data[context.index]?.id,
  });

  useEffect(() => {
    if (isLoading || error) return;
    setComments(data.comments);
  }, [isLoading, error, data]);

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 border-r border-b flex items-center gap-1"
      >
        <CiCircleMore size={20} />
        <span
          className={clsx("opacity-50 text-[10px]", count === 0 && "hidden")}
        >
          {count}
        </span>
      </button>
      <Panel.Root
        open={isOpen}
        isClosable
        isDraggable
        handleClose={() => setIsOpen(false)}
        className="absolute top-0 left-0 w-[90vw] max-w-[350px] mr-10 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow border border-gray-900 bg-white max-h-[83%] overflow-y-scroll no-scrollbar ml-5"
      >
        <Panel.Header>
          <h2 className="text-[10px]">Comments</h2>
        </Panel.Header>
        <Panel.Content className="p-3 space-y-3">
          <Empty show={!!comments} />
          <List data={comments} />
          <Skeleton show={isLoading} />
        </Panel.Content>
        <Panel.Footer>
          <Form />
        </Panel.Footer>
      </Panel.Root>
    </>
  );
};

export default Index;
