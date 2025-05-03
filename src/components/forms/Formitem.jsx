import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
export default function Formitem({ title, control, placeholder, name, className, label }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel dir="rtl" className={cn("block text-base font-medium", label)}>
            {title}
          </FormLabel>
          <FormControl>
            <Input
              className={cn("h-12 dark:bg-light-background md:text-lg", className)}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
