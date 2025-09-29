import Fieldset from "@/components/fieldset";
import Button from "@/components/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Newsletter, { type Inputs } from "./schema";
import clsx from "clsx";
import { useState } from "react";

const Index = () => {
  const [success, setSuccess] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    defaultValues: { email: "" },
    resolver: zodResolver(Newsletter),
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const url = `${import.meta.env.VITE_BASE_API_URL}/newsletter`;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setSuccess("Thank you for your subscription");
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-[330px]">
      <p className={clsx(success && "hidden")}>
        Sign up for exclusive offers, popular releases and more
      </p>
      <p className={clsx("text-green-500", !success && "hidden")}>{success}</p>
      {errors.email?.message && (
        <p className="text-red-500 text-[10px]">{errors.email?.message}</p>
      )}
      <div
        className={clsx("flex items-center gap-4 p-2 border border-gray-900", {
          "border-red-500": errors.email?.message,
        })}
      >
        <Fieldset.Root className="flex flex-col gap-4">
          <Fieldset.Label htmlFor="email" className="sr-only">
            Email
          </Fieldset.Label>
          <Fieldset.Input
            {...register("email")}
            disabled={isSubmitting}
            placeholder="Enter your email"
            className="border-none outline-0"
          />
        </Fieldset.Root>
        <Button
          disabled={isSubmitting || !isValid}
          type="submit"
          className="bg-gray-900 py-2 px-6 text-gray-50"
        >
          Subscribe
        </Button>
      </div>
    </form>
  );
};

export default Index;
