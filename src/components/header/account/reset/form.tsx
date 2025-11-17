import Button from "@/components/button";
import Fieldset from "@/components/fieldset";
import { useResetUserMutation } from "@/features/auth/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import Reset, { type Inputs } from "./schema";
import Context, { initialState } from "../context";
import { useContext } from "react";
import useToast from "@/hooks/useToast";

const Form = () => {
  const context = useContext(Context);
  const { setIsActive } = context || {};
  const { showToast } = useToast();

  const [resetUser, { isLoading }] = useResetUserMutation();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    trigger,
    clearErrors,
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
      showToast(
        "success",
        "A password reset link has been sent to your email."
      );
      if (setIsActive) setIsActive(initialState);
      reset();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("email", {
        type: "custom",
        message: "An unexpected error occured please try again.",
      });
    }
  };

  const handleChange = () => {
    trigger();
    clearErrors();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-3">
      <h3>Reset password</h3>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">Email address</Fieldset.Label>
        <Fieldset.Input
          type="email"
          {...register("email")}
          onChange={handleChange}
          error={errors.email?.message}
          placeholder="Enter your email"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Button
        disabled={isSubmitting || !isValid || isLoading}
        type="submit"
        className="border border-gray-900 p-3 cursor-pointer uppercase w-full disabled:cursor-not-allowed"
      >
        Reset
      </Button>
    </form>
  );
};

export default Form;
