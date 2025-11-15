import * as z from "zod";

const Style = z.object({
  name: z.string().min(3, "Name is required").default(""),
  description: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")).default(""),
  items: z.array(z.string()).max(100).default([]).optional(),
  tags: z.array(z.string()).max(10).default([]).optional(),
});

export type Inputs = z.infer<typeof Style>;
export default Style;
