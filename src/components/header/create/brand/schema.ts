import * as z from "zod";

const Brand = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(100)
    .default(""),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(2000)
    .default(""),
  items: z.array(z.string()).max(100).default([]).optional(),
  tags: z.array(z.string()).max(10).default([]).optional(),
});

export type Inputs = z.infer<typeof Brand>;
export default Brand;
