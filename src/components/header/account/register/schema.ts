import * as z from "zod";

const User = z.object({
  name: z.string().min(3, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
  password: z
    .string()
    .min(6, "Password is should be a minimum of 6 characters"),
  subscribe: z.boolean().default(false),
});

export type Inputs = z.infer<typeof User>;
export default User;
