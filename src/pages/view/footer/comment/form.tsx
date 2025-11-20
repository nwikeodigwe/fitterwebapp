import Fieldset from "@/components/fieldset";
import type { FormEvent } from "react";
import { FaArrowUp } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

const Form = () => {
  const handleInputChange = (e: FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };
  return (
    <form>
      <div className="flex items-start gap-2">
        <span className="text-black bg-black/5 size-8 flex items-center justify-center flex-shrink-0">
          <IoPersonOutline size={20} />
        </span>
        <Fieldset.Root className="grid grid-cols-[1fr_auto]  min-h-[32px] items-end gap-2 w-full p-2 border">
          <Fieldset.Textarea
            className="w-full resize-none"
            placeholder="Type your comment..."
            onInput={handleInputChange}
          />
          <Fieldset.Button
            type="submit"
            className="bg-black text-white p-2 hover:bg-gray-800 transition-colors"
          >
            <FaArrowUp size={12} />
          </Fieldset.Button>
        </Fieldset.Root>
      </div>
    </form>
  );
};

export default Form;
