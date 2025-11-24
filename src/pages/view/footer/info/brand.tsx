import { useGetListByFilterQuery } from "@/features/main/service";
import Context, { type Data } from "../../context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import clsx from "clsx";

interface Props {
  id: string;
  name: string;
}

const Brand: React.FC<Props> = ({ id, name }) => {
  const context = useContext(Context);
  const [recommend, setRecommend] = useState<Data[]>([]);
  if (!context)
    throw new Error("REcommendations must be used within a View Component");

  const query = {
    brand: name,
    flexible: true,
    limit: 10,
  };

  const {
    data: recommendations,
    isLoading,
    error,
  } = useGetListByFilterQuery({
    model: context.model!,
    ...query,
  });

  useEffect(() => {
    if (isLoading || error) return;
    setRecommend(
      recommendations?.[context.model!].filter(
        (item: Data) => item.id !== id
      ) || []
    );
  }, [isLoading, error, recommendations, context, id]);

  return (
    <div
      className={clsx(
        "border-b px-3 py-4 space-y-4",
        recommend?.length === 0 && "hidden"
      )}
    >
      <h2 className="text-[10px] capitalize">{name}</h2>
      <div className="flex items-center overflow-x-scroll no-scrollbar space-x-5">
        {recommend?.map((item) => (
          <Link
            key={item?.id}
            to=""
            className="flex-shrink-0 flex flex-col items-center justify-center group relative"
          >
            <div className="h-20 w-20 bg-black/10"></div>
            <p className="invisible group-hover:visible duration-150 transition text-[10px] text-center  capitalize">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Brand;
