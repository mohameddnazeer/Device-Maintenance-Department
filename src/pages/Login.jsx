import { Label } from "@/components/ui/label";
import maintenanceImage from "../assets/images/loginImage.svg";
// Ensure your schema is defined here
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const Login = () => {
  const navigate = useNavigate();

  const onSubmitFunction = (data) => {
    console.log(data);
    navigate("/home");
    // toast.success("مرحبا بك في منظومة الصيانة")
  };

  let validate = Yup.object().shape({
    username: Yup.string().required("تواضع واكتب اسمك "),

    password: Yup.string()
      // .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must be uppercase")
      .required("اكتب الباسورد صح يا صاحبي"),
  });

  const { handleSubmit, handleBlur, handleChange, errors, touched, values } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: onSubmitFunction,
  });

  //   const RegisterFormSchema = z
  // .object({
  // username: z
  // .string()
  // .min(2, "Username must be at least 2 characters long")
  // .max(25, "Username should be at most 25 characters long"),
  // dateOfBirth: z.string(),
  // email: z.string().email("Invalid email"),
  // password: z
  // .string()
  // .min(8, "Password should be at least 8 characters long")
  // .max(16, "Password should be at most 16 characters long"),
  // })

  return (
    <div className="flex flex-col md:flex-row p-4 min-h-screen justify-center">
      <div className="hidden w-full md:w-1/2 md:flex items-center justify-center p-4">
        <img
          src={maintenanceImage}
          alt="Maintenance System Illustration"
          className="w-full max-w-md md:max-w-lg"
        />
      </div>

      <div dir="rtl" className="min-h-full w-full md:w-1/2 items-center justify-center flex">
        <div className="p-6 dark:bg-light-background rounded-lg shadow-lg text-center max-w-md flex-1">
          <p className="text-2xl font-bold mb-4 text-center ">Login into</p>
          <p className="text-2xl font-bold text-center ">Maintenance System</p>
          <form className="mt-6" method="post" onSubmit={handleSubmit}>
            <div className="mb-4 text-right text-muted-foreground">
              <Label htmlFor="username">اسم المستخدم</Label>

              <Input
                placeholder="ادخل اسم المستخدم"
                id="username"
                name="username"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={`w-full h-14 p-4 mt-1 dark:bg-light-background md:text-base text-right outline-none ${
                  errors.username ? "border-destructive" : ""
                }`}
              />

              {errors.username && touched.username && (
                <div className="mt-2 p-2 text-sm text-destructive">{errors.username}</div>
              )}
            </div>
            <div className="mb-4 text-right text-muted-foreground">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                placeholder="ادخل اسم المستخدم"
                id="password"
                name="password"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={`w-full h-14 p-4 mt-1 dark:bg-light-background md:text-base text-right outline-none ${
                  errors.password ? "border-destructive" : ""
                }`}
              />
              {errors.password && touched.password && (
                <div className="mt-2 p-2 text-sm text-destructive">{errors.password}</div>
              )}

              {/* <input
                              id="password"
                              type="password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              placeholder="ادخل كلمة المرور"
                              className={`w-full h-14 p-4 mt-1 rounded-md dark:text-white text-right outline-none border ${
                                errors.password ? "border-red-500 border-2" : "border-gray-300"
                              } focus:border-blue-500  dark:text-[#18181B]`}
              /> */}
            </div>
            <Button
              type="submit"
              variant="secondary"
              className="w-full h-12 mt-8 rounded-md transition duration-200">
              تسجيل الدخول
            </Button>
          </form>
          <p className="flex gap-x-2 mt-10 text-muted-foreground">
            هل انت مستخدم جديد؟
            <Link
              className="link hover:opacity-50 transition-opacity duration-300 text-primary"
              to="/register">
              تسجيل مستخدم
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
