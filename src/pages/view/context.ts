import { createContext } from "react";
import type { Model } from "../list";

export type Data = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category?: string;
  tags: [{ name: string }];
  brand: { name: string };
  author?: { name: string };
  season: string;
  color: string;
  colorway: string;
  designers: [{ name: string }];
  material: string;
  images: [{ url: string }];
  creator: { name: string; avatar: { url: string } };
  releaseYear: string;
  createdAt: string;
};

export interface Listing {
  data: Data[];
  index: number;
  model?: Model;
  slug?: string;
  handleNavigate: (direction: "left" | "right") => void;
  toggleFavorite: () => void;
  toggleVote: () => void;
}

const ListingContext = createContext<Listing | null>(null);
ListingContext.displayName = "ListContex";
export default ListingContext;
