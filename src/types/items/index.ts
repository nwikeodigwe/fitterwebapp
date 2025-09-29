export type Item = {
  id: string;
  name: string;
  description: string;
  images: { id: string; url: string }[];
  brand: { id: string; name: string };
  tags: { id: string; name: string }[]; // assuming tags have id & name
  creator: { id: string };
};
