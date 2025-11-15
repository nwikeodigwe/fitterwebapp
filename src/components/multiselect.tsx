import clsx from "clsx";
import Input, { type InputProps } from "@/components/input";
import {
    useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { IoIosClose } from "react-icons/io";

export interface MultiselectProps extends Omit<InputProps, "value" | "onChange"> {
  options: string[];
  value?: string[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
}

const Multiselect = ({
  className,
  options,
  value: controlledValue,
  onChange,
  placeholder = "Select items...",
  ...props
}: MultiselectProps) => {
  // Controlled vs uncontrolled
  const isControlled = controlledValue !== undefined;
  const [internalSelected, setInternalSelected] = useState<string[]>([]);

 const selected = useMemo<string[]>(() => {
    const candidate = isControlled ? controlledValue : internalSelected;
    return Array.isArray(candidate) ? candidate : [];
  }, [isControlled, controlledValue, internalSelected]);

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync internal state
  const setSelected = useCallback((newSelected: string[]) => {
    if (!isControlled) setInternalSelected(newSelected);
    onChange?.(newSelected);
  }, [isControlled, onChange])

  // Filter options
  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]);
      setHighlightedIndex(-1);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filteredOptions = options.filter(
      (opt) =>
        opt.toLowerCase().includes(lowerQuery) && !selected.includes(opt)
    );
    setFiltered(filteredOptions);
    setHighlightedIndex(filteredOptions.length > 0 ? 0 : -1);
  }, [query, options, selected]);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        const trimmed = query.trim();
        if (trimmed && !selected.includes(trimmed)) {
          setSelected([...selected, trimmed]);
          onChange?.([...selected, trimmed]);
        }
        setQuery("");
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside as () => void);
    return () => document.removeEventListener("mousedown", handleClickOutside as () => void);
  }, [onChange, query, selected, setSelected]);

  const toggleOption = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter((s) => s !== option)
      : [...selected, option];
    setSelected(newSelected);
    setQuery("");
    inputRef.current?.focus();
  };

  const removeOption = (option: string, e: MouseEvent) => {
    e.stopPropagation();
    toggleOption(option);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    if (filtered.length > 0 || options.length > selected.length) {
      setIsOpen(true);
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !query && selected.length > 0) {
      // Remove last selected item
      setSelected(selected.slice(0, -1));
      return;
    }

    if (!isOpen) {
      if (["ArrowDown", "ArrowUp"].includes(e.key)) {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev <= 0 ? filtered.length - 1 : prev - 1
        );
        break;
      case "Enter":
        e.preventDefault();

        // 1. If something is highlighted → select it
        if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
          toggleOption(filtered[highlightedIndex]);
          break;
        }

        // 2. Otherwise: add current input as free-text tag
        if (query.trim() && !selected.includes(query.trim())) {
          const newSelected = [...selected, query.trim()];
          setSelected(newSelected);
          onChange?.(newSelected);
        }

        setQuery("");
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;

      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleTagClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Clickable wrapper */}
      <div
        className={clsx(
          "flex flex-wrap items-center gap-1 min-h-12 p-2 border  bg-white cursor-text",
          "border-gray-300",
          "max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400",
          className
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Selected tags */}
        {selected.map((option) => (
          <span
            key={option}
            className="inline-flex items-center gap-1 bg-black/4 text-black/70 px-1.5 py-1 capitalize"
            onClick={handleTagClick}
          >
            {option}
            <button
              type="button"
              onClick={(e) => removeOption(option, e)}
              className="hover:bg-blue-200 rounded-full p-0.5"
              aria-label={`Remove ${option}`}
            >
              <IoIosClose size={16} />
            </button>
          </span>
        ))}
        <Input
          {...props}
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          placeholder={selected.length === 0 ? placeholder : ""}
          className="flex-1 min-w-32 outline-none capitalize bg-transparent"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="multiselect-list"
          aria-multiselectable="true"
          aria-activedescendant={
            isOpen && highlightedIndex >= 0
              ? `option-${highlightedIndex}`
              : undefined
          }
        />
      </div>

      {/* Dropdown */}
      {isOpen && filtered.length > 0 && (
        <ul
          id="multiselect-list"
          role="listbox"
          aria-multiselectable="true"
          className={clsx(
            "absolute left-0 right-0 bg-white border border-gray-300 shadow-lg",
            "max-h-60 overflow-y-auto z-50 scrollbar-thin scrollbar-thumb-gray-400"
          )}
        >
          {filtered.map((option, index) => (
            <li
              key={option}
              id={`option-${index}`}
              role="option"
              aria-selected={selected.includes(option)}
              onClick={() => toggleOption(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={clsx(
                "px-3 py-2 cursor-pointer capitalize",
                highlightedIndex === index
                  ? "bg-black/5"
                  : selected.includes(option)
                  ? "bg-gray-100"
                  : "hover:bg-gray-50"
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

export default Multiselect;