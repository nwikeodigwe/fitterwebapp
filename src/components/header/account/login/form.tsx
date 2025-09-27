import Fieldset from "@/components/fieldset";
import Button from "@/components/button";

const Form = () => {
  return (
    <form className="flex flex-col gap-3">
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="email">Email</Fieldset.Label>
        <Fieldset.Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Fieldset.Root className="flex flex-col gap-1">
        <Fieldset.Label htmlFor="password">Password</Fieldset.Label>
        <Fieldset.Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="border border-gray-900 p-3"
        />
      </Fieldset.Root>
      <Button
        type="button"
        className="border border-gray-900 p-3 cursor-pointer uppercase"
      >
        Login
      </Button>
    </form>
  );
};

export default Form;
