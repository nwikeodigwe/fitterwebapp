import {
  useFavoriteMutation,
  useIsFavoritedQuery,
  useUnfavoriteMutation,
} from "@/features/main/service";
import { useContext, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import Context from "./context";

const Header = () => {
  const [isSolid, setIsSolid] = useState<boolean>(false);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "Header component must be used within a List context provider"
    );

  const [favorite] = useFavoriteMutation();
  const [unfavorite] = useUnfavoriteMutation();
  const {
    data: favorited,
    isLoading,
    error,
  } = useIsFavoritedQuery({
    model: context.model!,
    id: context?.data[context.index]?.id,
  });

  const toggleFavorite = () => {
    if (isFavorited)
      return unfavorite({
        model: context.model!,
        id: context.data[context.index].id,
      });

    return favorite({
      model: context.model!,
      id: context.data[context.index].id,
    });
  };

  useEffect(() => {
    if (isLoading || error) return;
    setIsFavorited(favorited);
  }, [isLoading, error, favorited]);

  return (
    <div>
      <button
        onClick={toggleFavorite}
        onMouseEnter={() => setIsSolid(true)}
        onMouseLeave={() => setIsSolid(false)}
        className="absolute top-5 right-5 z-15 cursor-pointer"
      >
        {isSolid ?? isFavorited ? (
          <IoBookmark
            size={30}
            className="transition-colors duration-300 hover:fill-black"
          />
        ) : (
          <CiBookmark
            size={30}
            className="transition-colors duration-300 hover:fill-black"
          />
        )}
      </button>
    </div>
  );
};

export default Header;
