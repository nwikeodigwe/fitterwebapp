export type Style = {
  id: string;
  name: string;
  description: string;
  tags: { name: string };
  collection: { name: string; id: string };
  author: { name: string; id: string };
};
