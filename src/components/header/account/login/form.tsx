import { useForm, type SubmitHandler } from "react-hook-form";
import Fieldset from "@/components/fieldset";
import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Auth from "./schema";
import { useSignInUserMutation } from "@/features/auth/service";
import { useDispatch } from "react-redux";
import { setTokens } from "@/features/auth/slice";

interface Inputs {
  email: string;
  password: string;
}

const Form = () => {
  const dispatch = useDispatch();
  const [signInUser, { isLoading }] = useSignInUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(Auth),
    mode: "onChange",
    reValidateMode: "onBlur",
  });

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
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">Email</Fieldset.Label>
        <Fieldset.Input
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="Enter your email"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="password">Password</Fieldset.Label>
        <Fieldset.Input
          type="password"
          {...register("password")}
          error={errors.password?.message}
          placeholder="Enter your password"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Button
        disabled={isSubmitting || !isValid || isLoading}
        type="submit"
        className="border border-gray-900 p-3 cursor-pointer uppercase"
      >
        Login
      </Button>
    </form>
  );
};

export default Form;
