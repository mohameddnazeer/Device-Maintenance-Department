import React from "react";
import classes from "../assets/css/login.module.css";
import maintenanceImage from "../assets/images/loginImage.svg";
import { loginSchema } from "../validations/loginValidation"; // Ensure your schema is defined here
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-around">
      <div className={`${classes.left_section}`}>
        <img src={maintenanceImage} alt="Maintenance System Illustration" />
      </div>
      <div
        className={`${classes.right_section} p-6 bg-white rounded-lg shadow-lg`}
      >
        <p className={`${classes.heading_text} text-2xl font-bold mb-4`}>
          Login into
        </p>
        <p className={`${classes.heading_text} text-2xl font-bold`}>
          Maintenance System
        </p>

        <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
          <label
            className="block text-right mt-4 text-white lg:mr-12 md:mr-0 sm:mr-0"
            htmlFor="username"
          >
            اسم المستخدم
          </label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                id="username"
                type="text"
                placeholder="ادخل اسم المستخدم"
                className={`input w-96 max-w-full h-14 p-4 bg-custom-gray block m-auto mt-1 rounded-md text-right outline-none border ${
                  errors.username
                    ? "border-red-500 border-2"
                    : "border-gray-300"
                } focus:border-blue-500`}
                {...field}
              />
            )}
          />
          {errors.username && (
            <span className="text-red-500 text-sm block text-right mr-12 mt-2">
              {errors.username.message}
            </span>
          )}

          <label
            className="block text-right text-white lg:mr-12 md:mr-0 sm:mr-0 mt-3"
            htmlFor="password"
          >
            كلمة المرور
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                id="password"
                type="password"
                placeholder="ادخل كلمة المرور"
                className={`input w-96 max-w-full h-14 p-4 bg-custom-gray block m-auto mt-1 rounded-md text-right outline-none border ${
                  errors.password
                    ? "border-red-500 border-2"
                    : "border-gray-300"
                } focus:border-blue-500`}
                {...field}
              />
            )}
          />
          {errors.password && (
            <span className="text-red-500 text-sm block text-right mr-12 mt-2">
              {errors.password.message}
            </span>
          )}

          <button className="w-96 max-w-full h-12 mt-8 bg-blue-400 text-white rounded-md hover:bg-blue-700 transition duration-200 m-auto block">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};
