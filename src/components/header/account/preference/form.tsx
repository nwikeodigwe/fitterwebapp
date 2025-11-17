import Button from "@/components/button";
import Preference, { type Inputs } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setPreference } from "@/features/preferences/slice";
import Fieldset from "@/components/fieldset";

import data from "@/data/countries.json";
import currencies from "@/data/currencies.json";

import { useGetCountryQuery } from "@/features/location/service";
import type { RootState } from "@/store";

const Form = () => {
  const dispatch = useDispatch();
  const { country, currency } = useSelector(
    (state: RootState) => state.preference
  );
  const { data: location } = useGetCountryQuery({});

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      location: country || location.country || "Netherlands",
      currency: currency || Object.keys(currencies)?.[0],
    },
    resolver: zodResolver(Preference),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      dispatch(setPreference(data));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("location", {
        type: "custom",
        message: "An unexpected error occured please try again.",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 mt-3"
    >
      <h3 className="font-medium">Preference</h3>
      <Fieldset.Root className="space-x-2">
        <Fieldset.Label htmlFor="location">Location</Fieldset.Label>
        <Controller
          control={control}
          name="location"
          render={(field) => (
            <Fieldset.Select
              {...field}
              error={errors.location?.message}
              options={Object.entries(data.countries).map(
                ([, value]) => value.name
              )}
              className=""
              placeholder="Select country"
              defaultValue={country || "Netherlands"}
            />
          )}
        ></Controller>
      </Fieldset.Root>
      <Fieldset.Root className="space-x-2">
        <Fieldset.Label htmlFor="currency">Currency</Fieldset.Label>
        <Controller
          name="currency"
          control={control}
          render={(field) => (
            <Fieldset.Select
              {...field}
              error={errors.currency?.message}
              options={Object.keys(currencies)}
              className=""
              placeholder="Select currency"
              defaultValue={currency || Object.keys(currencies)?.[0]}
            />
          )}
        ></Controller>
      </Fieldset.Root>
      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="border border-gray-900 p-3 bg-gray-900 text-white cursor-pointer uppercase w-full disabled:cursor-not-allowed"
      >
        Confirm
      </Button>
    </form>
  );
};

export default Form;
