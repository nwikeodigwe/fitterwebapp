import { Link } from "react-router";
import Info from "./info";
import Comment from "./comment";
import Share from "./share";
import { PiArrowFatDownThin, PiArrowFatUpThin } from "react-icons/pi";
import Images from "./images";
import Context from "../context";
import { useContext, useEffect, useState } from "react";
import {
  useGetUpvoteCountQuery,
  useGetDownvoteCountQuery,
} from "@/features/main/service";
import clsx from "clsx";

const Index = () => {
  const context = useContext(Context);
  const [upvoteCount, setUpvoteCount] = useState<number>(0);
  const [downvoteCount, setDownvoteCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);

  if (!context)
    throw new Error(
      "Footer component must be used within the Listing context provider"
    );
  const { data, index, model } = context;

  const {
    data: upvote,
    isLoading: isUpvoteCountLoading,
    error: UpvoteCountError,
  } = useGetUpvoteCountQuery({ model, id: data[index]?.id });

  const {
    data: downvote,
    isLoading: isDownvoteCountLoading,
    error: DownvoteCountError,
  } = useGetDownvoteCountQuery({ model, id: data[index]?.id });

  const {
    data: comment,
    isLoading: isCommentCountLoading,
    error: CommentCountError,
  } = useGetUpvoteCountQuery({ model, id: data[index]?.id });

  useEffect(() => {
    if (isUpvoteCountLoading || UpvoteCountError) return;
    setUpvoteCount(upvote.count);
  }, [isUpvoteCountLoading, UpvoteCountError, upvote]);

  useEffect(() => {
    if (isDownvoteCountLoading || DownvoteCountError) return;
    setDownvoteCount(downvote.count);
  }, [isDownvoteCountLoading, DownvoteCountError, downvote]);

  useEffect(() => {
    if (isCommentCountLoading || CommentCountError) return;
    setCommentCount(comment.count);
  }, [isCommentCountLoading, CommentCountError, comment]);

  return (
    <div className="flex items-center justify-between">
      <div className="w-[250px] space-y-2">
        <h1>{data[index]?.name}</h1>
        <div className="flex items-center justify-between bg-gray-300/5">
          <div className="flex items-center border-t border-l">
            <button className="p-2 border-r border-b flex items-center gap-1">
              <PiArrowFatDownThin size={20} />
              <span
                className={clsx(
                  "opacity-50 text-[10px]",
                  !upvoteCount && "hidden"
                )}
              >
                {upvoteCount}
              </span>
            </button>
            <button className="p-2 border-r border-b flex items-center gap-1">
              <PiArrowFatUpThin size={20} />
              <span
                className={clsx(
                  "opacity-50 text-[10px]",
                  !downvoteCount && "hidden"
                )}
              >
                {downvoteCount}
              </span>
            </button>
            <Comment count={commentCount} />
          </div>
          <Share />
        </div>
        <div className="flex items-center gap-2 text-[10px] underline">
          {data[index]?.tags.map((tag) => (
            <Link
              key={tag.name}
              to={{
                pathname: `/${model}`,
                search: `?tags=${tag.name}`,
              }}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Images />
        <Info data={data[index]} />
      </div>
    </div>
  );
};

export default Index;
