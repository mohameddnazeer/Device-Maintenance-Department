import { Check, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn, objectToSearchParamsStr } from "@/lib/utils";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function DataTableFacetedFilter({ column, title, options }) {
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const facets = column?.getFacetedUniqueValues();
  const [selectedValues, setSelectedValues] = useState(() => {
    const newSet = new Set();
    const selected = URLSearchParams.get(column.id);
    if (selected) selected.split(",").forEach((value) => newSet.add(value));
    return newSet;
  });
  const updateURLSearchParams = (selectedValues) => {
    const searchParams = objectToSearchParamsStr(
      { [column.id]: selectedValues.size ? Array.from(selectedValues) : undefined },
      URLSearchParams
    );
    setURLSearchParams(searchParams);
  };

  const resetFilter = () => {
    setSelectedValues(new Set());
    updateURLSearchParams(new Set());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="border-dashed">
          <PlusCircle />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.size} مختارة
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal">
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command dir="rtl">
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>لا يوجد بيانات</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        setSelectedValues((selectedValues) => {
                          selectedValues.delete(option.value);
                          return selectedValues;
                        });
                        updateURLSearchParams(selectedValues);
                      } else {
                        setSelectedValues((selectedValues) => {
                          selectedValues.add(option.value);
                          return selectedValues;
                        });
                        updateURLSearchParams(selectedValues);
                      }

                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(filterValues.length ? filterValues : undefined);
                    }}>
                    <div
                      className={cn(
                        "ml-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}>
                      <Check />
                    </div>
                    {option.icon && <option.icon className="ml-2 h-4 w-4 text-muted-foreground" />}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="mr-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={resetFilter} className="justify-center text-center">
                    حذف
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
