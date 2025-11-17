import { useForm, type SubmitHandler, type FieldPath } from "react-hook-form";
import Fieldset from "@/components/fieldset";
import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Register from "./schema";
import { LuCheck } from "react-icons/lu";
import { useSignUpUserMutation } from "@/features/auth/service";
import useToast from "@/hooks/useToast";
import Context, { initialState } from "../context";
import { useContext } from "react";

type Inputs = {
  name: string;
  email: string;
  password: string;
  subscribe?: boolean;
};

const Form = () => {
  const context = useContext(Context);
  const { setIsActive } = context || {};
  const [signUpUser] = useSignUpUserMutation();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    defaultValues: { name: "", email: "", password: "", subscribe: false },
    resolver: zodResolver(Register),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const handleChange = (field: FieldPath<Inputs>) => {
    trigger(field)
    clearErrors(field)
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      await signUpUser(data).unwrap();
      showToast(
        "success",
        "A verification email has been sent to your."
      );
      if (setIsActive) setIsActive(initialState);
      reset();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("email", {
        type: "custom",
        message: "An unexpected error occured.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <h3 className="font-medium">Create account</h3>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">
          First name and Last name
        </Fieldset.Label>
        <Fieldset.Input
          type="text"
          {...register("name")}
          error={errors.name?.message}
          disabled={isSubmitting}
          placeholder="Enter your name"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">Email Address</Fieldset.Label>
        <Fieldset.Input
          type="text"
          {...register("email")}
          onChange={() => handleChange("email")}
          error={errors.email?.message}
          disabled={isSubmitting}
          placeholder="Enter your email address"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="password">Password</Fieldset.Label>
        <Fieldset.Input
          type="password"
          {...register("password")}
          error={errors.password?.message}
          disabled={isSubmitting}
          placeholder="Enter your password"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex items-center gap-2">
        <Fieldset.Checkbox
          {...register("subscribe")}
          value={"true"}
          disabled={isSubmitting}
          className="border border-gray-900 size-4 inline-block"
          icon={<LuCheck />}
        />
        <Fieldset.Label htmlFor="subscribe" className="text-[10px]">
          I would love to recieve fitter emails on trending style and promotions
        </Fieldset.Label>
      </Fieldset.Root>
      <Button
        disabled={isSubmitting || !isValid}
        type="submit"
        className="border border-gray-900 p-3 disabled:cursor-not-allowed cursor-pointer uppercase"
      >
        Create Account
      </Button>
    </form>
  );
};

export default Form;
