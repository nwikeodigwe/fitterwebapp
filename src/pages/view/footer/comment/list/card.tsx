import clsx from "clsx";
import { useContext } from "react";
import type { Comment } from "..";
import { IoPersonOutline } from "react-icons/io5";
import { useDownvoteMutation, useUpvoteMutation } from "@/features/main/service";
import { PiArrowFatDownThin, PiArrowFatUpThin } from "react-icons/pi";
import Context from "../../../context";


interface Props {
  className?: string;
  data: Comment;
}

const Card: React.FC<Props> = ({ data, className }) => {
  const context = useContext(Context);
  if(!context) throw new Error("Card component should be used within the Listing context provider");

 const [upvote] = useUpvoteMutation();
 const [downvote] = useDownvoteMutation();

 const handleUpvote = () => {
    return upvote({model: context.model!, id: context.data[context.index].id})
 }

  const handleDownvote = () => {
    return downvote({model: context.model!, id: context.data[context.index].id})
 }

  const replies = data.replies?.length ? (
    <div className="ml-10 flex flex-col gap-2">
      {data.replies.map((reply) => (
        <Card key={reply.id} data={reply} />
      ))}
    </div>
  ) : null;

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <div className="flex items-start gap-2">
        <span
          className={clsx(
            "text-black bg-black/5 size-8 flex items-center justify-center flex-shrink-0",
            data.author.avatar && "hidden"
          )}
        >
          <IoPersonOutline size={20} />
        </span>

        <div className="grid grid-cols-[1fr_auto] min-h-[32px] items-start gap-2 w-full">
          <div className="space-y-1">
            <p className="text-[10px]">{data.author.name}</p>
            <p>{data.content}</p>

            <button className="text-[10px] cursor-pointer hover:underline duration transition">
              Reply
            </button>
          </div>

          <div className="flex flex-col border-t border-l opacity-40">
            <button onClick={handleUpvote} className="p-1 border-r border-b flex items-center flex-col justify-center gap-1">
              <PiArrowFatUpThin size={18} />
              <span className="opacity-50 text-[8px]">1.4k</span>
            </button>

            <button onClick={handleDownvote} className="p-1 border-r border-b flex items-center flex-col justify-center gap-1">
              <PiArrowFatDownThin size={18} />
              <span className="opacity-50 text-[8px]">1.2k</span>
            </button>
          </div>
        </div>
      </div>

      {replies}
    </div>
  );
};

export default Card;
