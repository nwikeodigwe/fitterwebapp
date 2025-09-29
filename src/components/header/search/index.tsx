import { DropdownMenu } from "radix-ui";
import Content from "./content";
import Input from "@/components/input";
import { useState, type ChangeEvent } from "react";
import { useSearchMutation } from "@/features/search/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Search, { type Inputs } from "./schema";
import { SearchContext } from "./context";
import type { Result } from "./result.types";

const Index = () => {
  const [result, setResult] = useState<Result | null>(null);
  const [searchQuery, { isLoading, error }] = useSearchMutation();
  const { register, watch } = useForm<Inputs>({
    defaultValues: { query: "" },
    resolver: zodResolver(Search),
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const query = watch("query");

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    try {
      const { data, error } = await searchQuery({ q: value });
      if (!error) setResult(data.result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className="cursor-pointer p-0"
        aria-label="Customise options"
      >
        Search
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-[400px] bg-white border border-gray-900 -translate-y-[25px] translate-x-3">
          <SearchContext.Provider value={{ query, result, isLoading, error }}>
            <Input
              {...register("query", {
                onChange: onChange,
              })}
              className="border-b border-gray-900 p-3"
              placeholder="Type to search"
            />
            <Content />
          </SearchContext.Provider>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Index;
