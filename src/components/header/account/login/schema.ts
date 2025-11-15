import * as z from "zod";

const Login = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
  password: z
    .string()
    .min(6, "Password is should be a minimum of 6 characters"),
});

export type Inputs = z.infer<typeof Login>;
export default Login;
