import type { Brand } from "@/types/brands";
import type { Collection } from "@/types/collections";
import type { Item } from "@/types/items";
import type { Style } from "@/types/styles";

export type Result = {
  items: Item[];
  brands: Brand[];
  collections: Collection[];
  styles: Style[];
};
