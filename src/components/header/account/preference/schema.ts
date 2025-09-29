import * as z from "zod";

const Preference = z.object({
  location: z.string().min(1, "location is required"),
  currency: z.string().min(1, "Currency is required"),
});

export type Inputs = z.infer<typeof Preference>;
export default Preference;
