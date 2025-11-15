import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/JPG",
  "image/png",
  "image/webp", // optional: add more
];
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_IMAGES = 10;

const imageFileSchema = z
  .instanceof(File)
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only .jpg, .jpeg, .png files are allowed.",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Each file must be less than 20MB.",
  });

const Item = z.object({
  images: z
    .array(imageFileSchema)
    .min(1, "At least one image is required.")
    .max(MAX_IMAGES, `Maximum ${MAX_IMAGES} images allowed.`)
    .default([]).optional(),

  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(100)
    .default(""),

  brand: z.string().min(1, "Brand is required.").max(50).default(""),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(2000)
    .default(""),

  releaseYear: z
    .string()
    .regex(/^\d{4}$/, "Must be a valid 4-digit year.")
    .default(() => new Date().getFullYear().toString())
    .refine(
      (val) => {
        const year = Number(val);
        return year >= 1800 && year <= new Date().getFullYear() + 1;
      },
      {
        message: "Release year must be between 1800 and next year.",
      }
    ),

  tags: z.array(z.string()).max(10).default([]).optional(),
});

export type Inputs = z.infer<typeof Item>;
export default Item;
