import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { getUrl } from "@/lib/utils";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import maintenanceImage from "../assets/images/loginImage.svg";

export const Login = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async event => {
    event.preventDefault();
    // Get form data as an object.
    const data = JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)));
    let config = {
      method: "post",
      url: getUrl() + "api/users/login",
      headers: { "Content-Type": "application/json" },
      data,
    };

    toast.promise(axios.request(config), {
      loading: <p>جاري تسجيل الدخول</p>,
      success: ({ data }) => {
        window.localStorage.setItem("accessToken", data.accessToken);
        window.localStorage.setItem("refreshToken", data.refreshToken);
        const decodedUser = jwtDecode(data.accessToken);
        const user = {
          name: decodedUser["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
          id: decodedUser["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
          role: decodedUser["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        };
        if (user) window.localStorage.setItem("user", JSON.stringify(user));
        navigate("/maintenance");
        return "تم تسجيل الدخول بنجاح";
      },
      error: err => {
        console.log(err);
        return err.response.data.message || "حدث خطأ اثناء تسجيل الدخول";
      },
    });
  };

  const formFields = [
    {
      isRequired: true,
      title: "اسم المستخدم",
      placeholder: "ادخل اسم المستخدم",
      name: "username",
      /**
       * @param {{ validationDetails: ValidityState }} validationDetails
       * @returns {string} The error message to be displayed
       */
      errorMsg: "اسم المستخدم مطلوب",
    },
    {
      isRequired: true,
      title: "كلمة المرور",
      placeholder: "ادخل كلمة المرور",
      name: "password",
      errorMsg: "كلمة المرور مطلوب",
      type: isVisible ? "text" : "password",
      endContent: (
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      ),
    },
  ];

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    const refreshToken = window.localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) navigate("/maintenance");
  }, [navigate]);

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
          <p className="text-2xl font-bold mb-4 text-center">Login into</p>
          <p className="text-2xl font-bold text-center ">Maintenance System</p>

          <Form className="mt-6 gap-y-6 text-right" onSubmit={onSubmit}>
            {formFields.map((field, index) => (
              <Input
                key={index}
                size="lg"
                isRequired={field.isRequired}
                label={field.title}
                labelPlacement="outside"
                placeholder={field.placeholder}
                id={field.name}
                name={field.name}
                type={field.type || "text"}
                startContent={field.startContent}
                endContent={field.endContent}
                errorMessage={field.errorMsg}
                minLength={field.minLength}
                maxLength={field.maxLength}
                pattern={field.pattern}
              />
            ))}

            <Button
              type="submit"
              color="success"
              // variant="secondary"
              className="w-full h-12 mt-8 rounded-md transition duration-200"
            >
              تسجيل الدخول
            </Button>
          </Form>
          <p className="flex gap-x-2 mt-10 text-muted-foreground">
            هل انت مستخدم جديد؟
            <Link
              className="link hover:opacity-50 transition-opacity duration-300 text-primary"
              to="/register"
            >
              تسجيل مستخدم
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
