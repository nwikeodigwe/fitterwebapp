import Fieldset from "@/components/fieldset";
import Button from "@/components/button";
import { LuCheck } from "react-icons/lu";

const Form = () => {
  return (
    <form className="flex flex-col gap-3">
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">
          First name and Last name
        </Fieldset.Label>
        <Fieldset.Input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">Email Address</Fieldset.Label>
        <Fieldset.Input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email address"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="password">Password</Fieldset.Label>
        <Fieldset.Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your email password"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex items-center gap-2">
        <Fieldset.Checkbox
          id="subscribe"
          name="subscribe"
          className="border border-gray-900 size-4 inline-block"
          icon={<LuCheck />}
        />
        <Fieldset.Label htmlFor="subscribe" className="text-[10px]">
          I would love to recieve fitter emails on trending style and promotions
        </Fieldset.Label>
      </Fieldset.Root>
      <Button
        type="button"
        className="border border-gray-900 p-3 cursor-pointer uppercase"
      >
        Create Account
      </Button>
    </form>
  );
};

export default Form;
