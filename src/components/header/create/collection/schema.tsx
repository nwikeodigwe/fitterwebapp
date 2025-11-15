import * as z from "zod";

const Collection = z.object({
  name: z.string().min(3, "Name is required").default(""),
  description: z
      .string()
      .min(10, "Description must be at least 10 characters.")
      .max(2000)
      .default(""),
  styles: z.array(z.string()).max(100).default([]).optional(),
  tags: z.array(z.string()).max(10).default([]).optional(),
});

export type Inputs = z.infer<typeof Collection>;
export default Collection;
