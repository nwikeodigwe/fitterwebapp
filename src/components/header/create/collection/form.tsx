import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Fieldset from "@/components/fieldset";
import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Collection, { type Inputs } from "./schema";
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
    defaultValues: Collection.parse({}),
    resolver: zodResolver(Collection),
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
      <h3 className="font-semibold">Create Collection</h3>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">Name</Fieldset.Label>
        <Fieldset.Input
          type="email"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Enter your email"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="styles">Styles</Fieldset.Label>
        <Controller
          name="styles"
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
              error={errors.styles?.message}
              placeholder="Type item name to add"
              className="border border-gray-900 p-3"
            />
          )}
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="description">Description</Fieldset.Label>
        <Fieldset.Textarea
          {...register("description")}
          error={errors.description?.message}
          placeholder="Enter your password"
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
              error={errors.styles?.message}
              placeholder="Type item name to add"
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
