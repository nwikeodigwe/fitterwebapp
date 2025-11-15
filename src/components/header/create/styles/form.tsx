import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Fieldset from "@/components/fieldset";
import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Style, { type Inputs } from "./schema";
import { useSignInUserMutation } from "@/features/auth/service";
import { useDispatch } from "react-redux";
import { setTokens } from "@/features/auth/slice";

const Form = () => {
  const dispatch = useDispatch();
  const [signInUser, { isLoading }] = useSignInUserMutation();


  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: Style.parse({}),
    resolver: zodResolver(Style),
    mode: "onChange",
    reValidateMode: "onSubmit",
  } as const);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await signInUser(data).unwrap();
      dispatch(setTokens({ ...response, isAthenticated: true }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <h3 className="font-semibold">Create Style</h3>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">Name</Fieldset.Label>
        <Fieldset.Input
          type="email"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Enter the name for style"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="tags">Items</Fieldset.Label>
        <Controller
          name="items"
          control={control}
          render={({ field }) => (
            <Fieldset.Multiselect
              id="items"
              options={[
                "outerwear",
                "fashion",
                "street",
                "luxury",
                "exclusive",
                "casual",
              ]}
              {...field}
              error={errors.items?.message}
              placeholder="Type item name to add"
              className="border border-gray-900 p-3"
            />
          )}
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="password">Description</Fieldset.Label>
        <Fieldset.Textarea
          {...register("description")}
          error={errors.description?.message}
          placeholder="Enter description for this style"
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
        disabled={isSubmitting || !isValid || isLoading}
        type="submit"
        className="border bg-black text-white p-3 cursor-pointer uppercase"
      >
        Create
      </Button>
    </form>
  );
};

export default Form;
