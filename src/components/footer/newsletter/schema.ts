import * as z from "zod";

const Newsletter = z.object({
  email: z
    .string()
    .min(3, "Email address is required")
    .pipe(z.email("Enter a valid email address")),
});

export type Inputs = z.infer<typeof Newsletter>;
export default Newsletter;
