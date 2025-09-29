export type Brand = {
  id: string;
  name: string;
  description: string;
  logo: { image: { url: string } };
  owner: { id: string; name: string };
  tags: { name: string }[]; // assuming tags have id & name
  _count: { items: number };
};
