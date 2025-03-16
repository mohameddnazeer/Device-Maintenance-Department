import { Input } from "@heroui/input";

const CustomInput = ({ name, label, placeholder, ...props }) => {
  return (
    <Input
      classNames={{ inputWrapper: "bg-default hover:!bg-default-600" }}
      label={label}
      labelPlacement="outside"
      name={name}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default CustomInput;
