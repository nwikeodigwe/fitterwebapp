import * as z from "zod";

const Collection = z.object({
  name: z.string().min(3, "Name is required").default(""),
  description: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")).default(""),
  password: z
    .string()
    .min(6, "Password is should be a minimum of 6 characters").default(""),
  subscribe: z.boolean().default(false),
});

export type Inputs = z.infer<typeof Collection>;
export default Collection;
