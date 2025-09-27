import Button from "@/components/button";
import Select from "@/components/select";

const location = ["Netherlands", "Nigeria", "United States"];
const currency = ["USD", "NGN", "EUR"];

const Form = () => {
  return (
    <form className="flex flex-col gap-3 mt-3">
      <fieldset className="space-x-2">
        <label htmlFor="Location">Location</label>
        <Select options={location} placeholder="Select country" />
      </fieldset>
      <fieldset className="space-x-2">
        <label htmlFor="Location">Currency</label>
        <Select options={currency} placeholder="Select currency" />
      </fieldset>
      <fieldset>
        <Button
          type="button"
          className="border border-gray-900 p-3 bg-gray-900 text-white cursor-pointer uppercase w-full"
        >
          Confirm
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
