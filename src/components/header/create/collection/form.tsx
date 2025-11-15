import { useForm, type SubmitHandler } from "react-hook-form";
import Fieldset from "@/components/fieldset";
import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Collection, {type Inputs} from "./schema";
import { useSignInUserMutation } from "@/features/auth/service";
import { useDispatch } from "react-redux";
import { setTokens } from "@/features/auth/slice";
import { useContext } from "react";
import Context from "../context";


const Form = () => {
  const dispatch = useDispatch();
  const [signInUser, { isLoading }] = useSignInUserMutation();
  const context = useContext(Context);
  const { setIsActive } = context || {};

  const handleReset = () => {
    if (setIsActive)
      setIsActive({
        item: false,
        style: false,
        brand: true,
        collection: false,
      });
  };

  const {
    register,
    handleSubmit,
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
        <Fieldset.Label htmlFor="email">Email</Fieldset.Label>
        <Fieldset.Input
          type="email"
          {...register("name")}
          error={errors.name?.message}
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
        className="border bg-black text-white p-3 cursor-pointer uppercase"
      >
        Login
      </Button>
    </form>
  );
};

export default Form;
