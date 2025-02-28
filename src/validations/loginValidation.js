import * as yup from "yup";

const initialLoginValues = {
  username: "",
  password: "",
};

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("اسم المستخدم مطلوب")
    .min(3, "اسم المستخدم يجب ان يتجاول ال 3 احرف"),
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(8, "كلمة المرور يجب ان تتجاوز ال 8 احرف"),
});

export { loginSchema, initialLoginValues };
