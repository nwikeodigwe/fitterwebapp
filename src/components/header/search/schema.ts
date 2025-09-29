import * as z from "zod";

const Search = z.object({
  query: z.string().min(1, "Search terms is required"),
});

export type Inputs = z.infer<typeof Search>;
export default Search;
