import Button from "@/components/button";
import Fieldset from "@/components/fieldset";
import { useResetUserMutation } from "@/features/auth/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import Reset, { type Inputs } from "./schema";

const Form = () => {
  const [resetUser, { isLoading }] = useResetUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    defaultValues: { email: "" },
    resolver: zodResolver(Reset),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await resetUser(data).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-3">
      <h3>Reset password</h3>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">Email address</Fieldset.Label>
        <Fieldset.Input
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="Enter your email"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Button
        disabled={isSubmitting || !isValid || isLoading}
        type="submit"
        className="border border-gray-900 p-3 cursor-pointer uppercase w-full"
      >
        Reset
      </Button>
    </form>
  );
};

export default Form;
