import { NavigationMenu } from "radix-ui";
import { Link } from "react-router";
import Brands from "./brands";
import Collections from "./collection";
import Styles from "./styles";
import Items from "./Items";
import Account from "./account";
import Create from "./create";
import Search from "./search";
import { useEffect, useState } from "react";
import { useGetModelTagsQuery } from "@/features/main/service";
import type { Tag as Brand } from "@/types/brands/tags";
import type { Tag as Style } from "@/types/styles/tags";
import type { Tag as Collection } from "@/types/collections/tags";
import type { Tag as Item } from "@/types/items/tags";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import clsx from "clsx";
import Skeleton from "./skeleton";

const Index = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [brandData, setBrandData] = useState<Brand[] | null>(null);
  const [styleData, setStyleData] = useState<Style[] | null>(null);
  const [collectionData, setCollectionData] = useState<Collection[] | null>(
    null
  );
  const [itemData, setItemData] = useState<Item[] | null>(null);

  const {
    data: tagsAndBrand,
    isLoading: brandsIsLoading,
    error: brandsError,
  } = useGetModelTagsQuery({ model: "brands" });

  const {
    data: tagsAndCollection,
    isLoading: collectionIsLoading,
    error: collectionError,
  } = useGetModelTagsQuery({ model: "collections" });

  const {
    data: tagsAndStyle,
    isLoading: styleIsLoading,
    error: styleError,
  } = useGetModelTagsQuery({ model: "styles" });

  const {
    data: tagsAndItem,
    isLoading: itemIsLoading,
    error: itemError,
  } = useGetModelTagsQuery({ model: "items" });

  useEffect(() => {
    if (tagsAndBrand) setBrandData(tagsAndBrand.tags);
  }, [tagsAndBrand]);

  useEffect(() => {
    if (tagsAndCollection) setCollectionData(tagsAndCollection.tags);
  }, [tagsAndCollection]);

  useEffect(() => {
    if (tagsAndStyle) setStyleData(tagsAndStyle.tags);
  }, [tagsAndStyle]);

  useEffect(() => {
    if (tagsAndItem) setItemData(tagsAndItem.tags);
  }, [tagsAndItem]);

  return (
    <NavigationMenu.Root className="border-b border-black-900 py-4 bg-white px-5 z-20 sticky">
      <NavigationMenu.List className="flex items-center justify-between">
        <NavigationMenu.Item>
          <Search />
        </NavigationMenu.Item>
        <div className="flex gap-5 items-center">
          <NavigationMenu.Item>
            <Link
              to="/"
              className="hover:underline transition-all ease-in-out duration-200"
            >
              Home
            </Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200">
              <Link to="/brands">Brands</Link>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-1/2 translate w-[400px] translate-x-1/2 bg-white border border-black-900">
              <Brands
                data={brandData}
                isLoading={brandsIsLoading}
                error={brandsError}
              />
              <Skeleton show={brandsIsLoading} row={5} col={4} />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200">
              <Link to="/collections">Collections</Link>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-1/2 translate w-[600px] translate-x-1/2 bg-white border border-black-900">
              <Collections
                data={collectionData}
                isLoading={collectionIsLoading}
                error={collectionError}
              />
              <Skeleton show={collectionIsLoading} row={5} col={4} />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200">
              <Link to="/styles">Styles</Link>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-1/2 translate w-[600px] translate-x-1/2 bg-white border border-black-900">
              <Styles
                data={styleData}
                isLoading={styleIsLoading}
                error={styleError}
              />
              <Skeleton show={styleIsLoading} row={5} col={4} />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200">
              <Link to="/items">Items</Link>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-1/2 translate w-[600px] translate-x-1/2 bg-white border border-black-900">
              <Items
                data={itemData}
                isLoading={itemIsLoading}
                error={itemError}
              />
              <Skeleton show={itemIsLoading} row={5} col={4} />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </div>
        <div className="flex items-center space-x-3">
          <NavigationMenu.Item className={clsx({ hidden: !isAuthenticated })}>
            <Create />
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <Account />
          </NavigationMenu.Item>
        </div>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Index;
