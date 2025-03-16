import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

const CustomSelect = ({ name, control, label, options, placeholder }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div>
            <label dir="rtl" className="block text-base font-medium">
              {label}
            </label>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                dir="rtl"
                className="mt-1 h-12 text-right w-full rounded-md shadow-sm focus:outline-none dark:bg-light-background">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
      }}
    />
  );
};

export default CustomSelect;
