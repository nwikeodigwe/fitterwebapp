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
import { useGetBrandTagsQuery } from "@/features/brand/service";
import { useGetCollectionTagsQuery } from "@/features/collection/service";
import { useGetItemTagsQuery } from "@/features/item/service";

import type { Tag as Brand } from "@/types/brands/tags";
import type { Tag as Style } from "@/types/styles/tags";
import type { Tag as Collection } from "@/types/collections/tags";
import type { Tag as Item } from "@/types/items/tags";
import { useGetStyleTagsQuery } from "@/features/style/service";
import { IoIosAdd } from "react-icons/io";

const Index = () => {
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
  } = useGetBrandTagsQuery({});

  const {
    data: tagsAndCollection,
    isLoading: collectionIsLoading,
    error: collectionError,
  } = useGetCollectionTagsQuery({ refetchOnMountOrArgChange: true });

  const {
    data: tagsAndStyle,
    isLoading: styleIsLoading,
    error: styleError,
  } = useGetStyleTagsQuery({});

  const {
    data: tagsAndItem,
    isLoading: itemIsLoading,
    error: itemError,
  } = useGetItemTagsQuery({});

  console.log(styleError);

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
    <NavigationMenu.Root className="border-b border-black-900 py-4 bg-white px-5">
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
              Brands
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-1/2 translate w-[400px] translate-x-1/2 bg-white border border-black-900">
              <Brands
                data={brandData}
                isLoading={brandsIsLoading}
                error={brandsError}
              />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200">
              Collections
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-1/2 translate w-[600px] translate-x-1/2 bg-white border border-black-900">
              <Collections
                data={collectionData}
                isLoading={collectionIsLoading}
                error={collectionError}
              />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200">
              Styles
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-1/2 translate w-[600px] translate-x-1/2 bg-white border border-black-900">
              <Styles
                data={styleData}
                isLoading={styleIsLoading}
                error={styleError}
              />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200">
              Items
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-1/2 translate w-[600px] translate-x-1/2 bg-white border border-black-900">
              <Items
                data={itemData}
                isLoading={itemIsLoading}
                error={itemError}
              />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </div>
        <div className="flex items-center space-x-3">
          <NavigationMenu.Item>
              
            <Create />
          </NavigationMenu.Item>

          {/* <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200" aria-labelledby="Account">
              Account
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-5 translate w-[200px] bg-white border border-black-900">
              <Account />
            </NavigationMenu.Content>
          </NavigationMenu.Item> */}
        </div>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Index;
