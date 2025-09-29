import Button from "@/components/button";
import Select from "@/components/select";
import Preference, { type Inputs } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setPreference } from "@/features/preferences/slice";

const location = ["Netherlands", "Nigeria", "United States"];
const currency = ["USD", "NGN", "EUR"];

const Form = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    defaultValues: { location: "", currency: "" },
    resolver: zodResolver(Preference),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      dispatch(setPreference(data));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 mt-3"
    >
      <h3 className="font-medium">Preference</h3>
      <fieldset className="space-x-2">
        <label htmlFor="Location">Location</label>
        <Select
          {...register("location")}
          options={location}
          placeholder="Select country"
          error={errors.location?.message}
        />
      </fieldset>
      <fieldset className="space-x-2">
        <label htmlFor="Location">Currency</label>
        <Select
          {...register("currency")}
          options={currency}
          placeholder="Select currency"
          error={errors.currency?.message}
        />
      </fieldset>
      <fieldset>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="border border-gray-900 p-3 bg-gray-900 text-white cursor-pointer uppercase w-full"
        >
          Confirm
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
