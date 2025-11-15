import clsx from "clsx";
import Input, { type InputProps } from "@/components/input";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";

export interface AutocompleteProps extends Omit<InputProps, "onChange"> {
  options: string[];
  onChange?: (value: string) => void;
}

const Autocomplete = ({ className, options, onChange, ...props }: AutocompleteProps) => {
  const [query, setQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Filter options when query changes
  useEffect(() => {
    if (!query) {
      setFiltered([]);
      setHighlightedIndex(-1);
      return;
    }

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase()) // use `includes` for better UX
    );
    setFiltered(filteredOptions);
    setHighlightedIndex(filteredOptions.length > 0 ? 0 : -1);
  }, [query, options]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectOption = (option: string) => {
    setQuery(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange?.(option);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    onChange?.(value);
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (filtered.length > 0) setIsOpen(true);
    props.onFocus?.(e);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filtered.length === 0) {
      if (e.key === "ArrowDown") {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filtered.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          selectOption(filtered[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleOptionClick = (option: string) => {
    selectOption(option);
  };

  return (
    <div className="relative" ref={containerRef}>
      <Input
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleInputKeyDown}
        placeholder={props.placeholder}
        error={props.error}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls="autocomplete-list"
        aria-activedescendant={
          isOpen && highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined
        }
        ref={inputRef}
        {...props}
        className={clsx(
          "border border-gray-900 p-3 w-full capitalize outline-none",
          className
        )}
      />

      {isOpen && filtered.length > 0 && (
        <ul
          ref={listRef}
          id="autocomplete-list"
          role="listbox"
          className={clsx(
            "absolute top-full left-0 right-0 mt-1 bg-white border max-h-60 overflow-y-auto z-50",
            "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
          )}
        >
          {filtered.map((option, index) => (
            <li
              key={option}
              id={`option-${index}`}
              role="option"
              aria-selected={highlightedIndex === index}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={clsx(
                "px-3 py-2 cursor-pointer capitalize",
                highlightedIndex === index
                  ? "bg-black/5"
                  : "hover:bg-gray-100"
              )}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;