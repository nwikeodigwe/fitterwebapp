import * as z from "zod";

const Reset = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
});

export type Inputs = z.infer<typeof Reset>;
export default Reset;
