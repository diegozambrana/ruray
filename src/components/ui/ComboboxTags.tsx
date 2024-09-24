"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TagType } from "@/types";

type ComboboxTagsProps = {
  options: TagType[];
  onSelect: (option: TagType) => void;
  onCreate: (name: string) => void;
};

export const ComboboxTags: React.FC<ComboboxTagsProps> = ({
  options,
  onSelect,
  onCreate,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");

  const createTag = () => {
    onCreate(value);
    setValue("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          Select Tag
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            value={value}
            onChangeCapture={(e: React.BaseSyntheticEvent) => {
              setValue(e.target.value);
            }}
          />
          <CommandList>
            <CommandEmpty>
              <Button onClick={createTag} variant="ghost">
                Add "{value}"
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={(currentValue) => {
                    onSelect(option);
                    setOpen(false);
                  }}
                >
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
