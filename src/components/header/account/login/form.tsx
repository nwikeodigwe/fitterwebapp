import Context from "../context";
import { useContext } from "react";
import Button from "@/components/button";
import { useDispatch } from "react-redux";
import Login, { type Inputs } from "./schema";
import Fieldset from "@/components/fieldset";
import { setTokens } from "@/features/auth/slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSignInUserMutation } from "@/features/auth/service";

const Form = () => {
  const dispatch = useDispatch();
  const [signInUser, { isLoading }] = useSignInUserMutation();
  const context = useContext(Context);
  const { setIsActive } = context || {};

  const handleReset = () => {
    if (setIsActive)
      setIsActive({
        login: false,
        register: false,
        reset: true,
        location: false,
      });
  };

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(Login),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { login } = await signInUser(data).unwrap();
      dispatch(setTokens({ ...login, isAthenticated: true }));
      reset()
      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("email", {
        type: "custom",
        message: "Invalid login credentials",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <h3 className="font-semibold">Create account</h3>
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
      <p>
        Forgot password?{" "}
        <button
          onClick={handleReset}
          className="hover:underline duration-200 transition-all cursor-pointer"
        >
          Reset
        </button>
      </p>

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
