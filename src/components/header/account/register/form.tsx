import { useForm, type SubmitHandler } from "react-hook-form";
import Fieldset from "@/components/fieldset";
import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Register from "./schema";
import { LuCheck } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useSignUpUserMutation } from "@/features/auth/service";
import { setTokens } from "@/features/auth/slice";

type Inputs = {
  name: string;
  email: string;
  password: string;
  subscribe?: boolean;
};

const Form = () => {
  const dispatch = useDispatch();
  const [signUpUser, { isLoading }] = useSignUpUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    defaultValues: { name: "", email: "", password: "", subscribe: false },
    resolver: zodResolver(Register),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await signUpUser(data).unwrap();
      dispatch(setTokens({ ...response, isAthenticated: true }));
    } catch (err) {
      console.error(err);
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
          disabled={isLoading || isSubmitting}
          placeholder="Enter your name"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">Email Address</Fieldset.Label>
        <Fieldset.Input
          type="text"
          {...register("email")}
          error={errors.email?.message}
          disabled={isLoading || isSubmitting}
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
          disabled={isLoading || isSubmitting}
          placeholder="Enter your password"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex items-center gap-2">
        <Fieldset.Checkbox
          {...register("subscribe")}
          disabled={isLoading || isSubmitting}
          className="border border-gray-900 size-4 inline-block"
          icon={<LuCheck />}
        />
        <Fieldset.Label htmlFor="subscribe" className="text-[10px]">
          I would love to recieve fitter emails on trending style and promotions
        </Fieldset.Label>
      </Fieldset.Root>
      <Button
        disabled={isSubmitting || !isValid || isLoading}
        type="submit"
        className="border border-gray-900 p-3 cursor-pointer uppercase"
      >
        Create Account
      </Button>
    </form>
  );
};

export default Form;
