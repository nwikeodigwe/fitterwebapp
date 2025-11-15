import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Fieldset from "@/components/fieldset";
import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Item, { type Inputs } from "./schema";
// import { useSignInUserMutation } from "@/features/auth/service";
// import { useDispatch } from "react-redux";

const ItemForm = () => {
  // const dispatch = useDispatch();
  // const [signInUser, { isLoading }] = useSignInUserMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    defaultValues: Item.parse({}),
    resolver: zodResolver(Item),
    mode: "onChange",
    reValidateMode: "onSubmit",
  } as const);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="flex flex-col gap-3"
    >
      <h3 className="font-semibold">Create Item</h3>
      <Fieldset.Root>
        <Controller
          name="images"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Fieldset.Fileupload
              value={field.value} // File[]
              onChange={field.onChange}
              error={error?.message}
            />
          )}
        ></Controller>
      </Fieldset.Root>

      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">Name</Fieldset.Label>
        <Fieldset.Input
          type="text"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Enter item name"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">Brand</Fieldset.Label>
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <Fieldset.Autocomplete
              type="text"
              id="brand"
              options={["gucci", "tommy", "levi", "ralph lauren"]}
              {...field}
              error={errors.brand?.message}
              placeholder="Enter item brand"
              className="border border-gray-900 p-3"
            />
          )}
        ></Controller>
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="description">Description</Fieldset.Label>
        <Fieldset.Textarea
          {...register("description")}
          error={errors.description?.message}
          placeholder="Enter item description"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="description">Release Year</Fieldset.Label>
        <Fieldset.Input
          type="text"
          {...register("releaseYear")}
          error={errors.releaseYear?.message}
          placeholder="Enter release year"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="tags">Tags</Fieldset.Label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Fieldset.Multiselect
              id="tags"
              options={[
                "outerwear",
                "fashion",
                "street",
                "luxury",
                "exclusive",
                "casual",
              ]}
              {...field}
              error={errors.tags?.message}
              placeholder="Type a tag or keyword"
              className="border border-gray-900 p-3"
            />
          )}
        />
      </Fieldset.Root>
      <Button
        disabled={isSubmitting || !isDirty || !isValid}
        type="submit"
        className="bg-black text-white p-3 cursor-pointer uppercase"
      >
        Create
      </Button>
    </form>
  );
};

export default ItemForm;
