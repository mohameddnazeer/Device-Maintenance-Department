import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
export default function Formitem({title,control,placeholder,name,className,label ,}) {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel dir='rtl' className={label}>{title}</FormLabel>
        <FormControl>
          <Input dir='rtl' className={className} placeholder={placeholder} {...field} />
        </FormControl>
        
        
        
      </FormItem>
    )}
  />
  )
}
