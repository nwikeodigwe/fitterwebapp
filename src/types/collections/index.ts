export type Collection = {
  id: string;
  name: string;
  description: string;
  tags: { id: string; name: string }[];
  author: { id: string };
};
