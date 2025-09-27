import Fieldset from "@/components/fieldset";
import Button from "@/components/button";

const Newsletter = () => {
  return (
    <form className="space-y-2 w-[330px]">
      <p>Sign up for exclusive offers, popular releases and more</p>
      <div className="flex items-center gap-4 p-2 border border-gray-900">
        <Fieldset.Root className="flex flex-col gap-4">
          <Fieldset.Label htmlFor="email" className="sr-only">
            Email
          </Fieldset.Label>
          <Fieldset.Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="border-none outline-0"
          />
        </Fieldset.Root>
        <Button type="button" className="bg-gray-900 py-2 px-6 text-gray-50">
          Subscribe
        </Button>
      </div>
    </form>
  );
};

export default Newsletter;
