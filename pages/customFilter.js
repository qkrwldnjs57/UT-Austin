"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/*value fetch from db later*/
const defaultItems = [
  {
    value: "ITP",
    label: "Introduction to Progamming"
  },
  {
    value: "Default Filter Value 2",
    label: "next.js 2",
  },

]

export function FilterCombo({ items = defaultItems, placeholder = 'Default Placeholder', onSelect, selectedValue }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  React.useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[350px] justify-between"
        >
          {value
            ? <span className={value ? "font-bold text-utOrange" : "text-gray-400"}>
            {items.find((item) => item.value === value)?.label}
            </span> 
            : <span className="text-gray-600">{placeholder}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0 max-h-[250px] overflow-y-auto">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  const newValue = item.value === value ? null : item.value;
                  setValue(newValue);
                  setOpen(false);
                  onSelect(newValue); // handleCourseFilterChange or handleProfessorFilterChange
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default FilterCombo;
