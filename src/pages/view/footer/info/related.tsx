import { useGetListByFilterQuery } from "@/features/main/service";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Context, { type Data } from "../../context";
import clsx from "clsx";

interface Props {
  id: string;
  releaseYear: string;
  season?: string;
  tags?: { name: string }[];
  author?: string;
}

const Related: React.FC<Props> = ({
  id,
  releaseYear,
  tags,
  author,
  season,
}) => {
  const context = useContext(Context);
  const [related, setRelated] = useState<Data[]>([]);
  if (!context)
    throw new Error("REcommendations must be used within a View Component");

  const query = {
    releaseYear: releaseYear,
    tags: tags?.map((tag) => tag.name).join(", "),
    author: author,
    season: season,
    flexible: true,
    limit: 3,
  };

  const {
    data: relations,
    isLoading,
    error,
  } = useGetListByFilterQuery({
    model: context.model!,
    ...query,
  });

  useEffect(() => {
    if (isLoading || error) return;
    setRelated(
      relations?.[context.model!].filter((item: Data) => item.id !== id) || []
    );
  }, [isLoading, error, relations, context, id]);

  return (
    <div
      className={clsx(
        "px-3 py-4 flex items-start justify-between space-x-4",
        related?.length === 0 && "hidden"
      )}
    >
      <h2 className="text-[10px]">Related</h2>
      <div className="flex flex-col space-y-3">
        {related?.map((item, i) => (
          <Link
            key={i}
            to={`/collections/${item.slug}`}
            className="hover:underline"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Related;
