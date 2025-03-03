import React from "react";
import classes from "../assets/css/login.module.css";
import maintenanceImage from "../assets/images/loginImage.svg";
 // Ensure your schema is defined here
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";


export const Login = () => {
  const navigate = useNavigate();

  const onSubmitFunction = (data) => {
    console.log(data);
    navigate("/home");
    toast.success("مرحبا بك في منظومة الصيانة")
  };

  let validate = Yup.object().shape({
    name: Yup.string().required("تواضع واكتب اسمك "),

    password: Yup.string()
      // .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must be uppercase")
      .required("اكتب الباسورد صح يا صاحبي"),
  });
  
  const {handleSubmit,handleBlur,handleChange ,errors,touched,values} = useFormik({
    initialValues:{
      name:'',
      password:''
    },
    validationSchema:validate,
    onSubmit:onSubmitFunction
  })

//   const RegisterFormSchema = z
// .object({
// name: z
// .string()
// .min(2, "Name must be at least 2 characters long")
// .max(25, "Name should be at most 25 characters long"),
// dateOfBirth: z.string(),
// email: z.string().email("Invalid email"),
// password: z
// .string()
// .min(8, "Password should be at least 8 characters long")
// .max(16, "Password should be at most 16 characters long"),
// })
 

  return (
//     <div className="min-h-screen flex flex-col md:flex-row items-center justify-around">
//       <div className={`${classes.left_section}`}>
//         <img src={maintenanceImage} alt="Maintenance System Illustration" />
//       </div>
//       <div
//         className={`${classes.right_section} p-6 bg-white rounded-lg shadow-lg`}
//       >
//         <p className={`${classes.heading_text} text-3xl font-bold mb-4`}>
//             تسجيل الدخول الي
//         </p>
//         <p className={`${classes.heading_text} text-xl font-medium`}>
//           منظومة الصيانة
//         </p>

//         <form className="m-auto" method="post" onSubmit={handleSubmit}>
//           <label
//             className="block text-right mt-4 dark:text-white lg:mr-12 md:mr-0 sm:mr-0"
//             htmlFor="username"
//           >
//             اسم المستخدم
//           </label>
         
            
            
           
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.name}
                
//                 placeholder="ادخل اسم المستخدم"
//                 className={`input w-96 max-w-full h-14 p-4 dark:bg-custom-gray block m-auto mt-1 rounded-md text-right outline-none border ${
//                   errors.name
//                     ? "border-red-500 border-2"
//                     : "border-gray-300"
//                 } focus:border-blue-500`}
               
//               />
   
//             {errors.name && touched.name && (
//                    <div class="p-4  w-96 max-w-full mx-auto text-center my-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//                     {errors.name}
// </div>
//         )}
//           <label
//             className="block text-right dark:text-white lg:mr-12 md:mr-0 sm:mr-0 mt-3"
//             htmlFor="password"
//           >
//             كلمة المرور
//           </label>
          
           
//               <input
//                 id="password"
//                 type="password"
//                 name="password"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.username}
//                 placeholder="ادخل كلمة المرور"
//                 className={`input w-96 max-w-full h-14 p-4 dark:bg-custom-gray block m-auto mt-1 rounded-md text-right outline-none border ${
//                   errors.password
//                     ? "border-red-500 border-2"
//                     : "border-gray-300"
//                 } focus:border-blue-500`}
               
//               />
          
          
//           {errors.password && touched.password && (
//                    <div class="p-4  w-96 max-w-full mx-auto text-center my-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//                     {errors.password}
// </div>
//         )}

//               <Button className="w-96 mx-auto max-w-full h-12 mt-8 my-12   text-white dark:text-black rounded-md  transition duration-200 block">
//                             تسجيل الدخول

//               </Button>
//           <button >
//           </button>
//         </form>
//       </div>
//     </div>
<div className="min-h-screen flex flex-col md:flex-row items-center justify-around p-4  ">

  <div className=" hidden w-full md:w-1/2 md:flex items-center justify-center p-4">
    <img
      src={maintenanceImage}
      alt="Maintenance System Illustration"
      className="w-full max-w-md md:max-w-lg"
    />
  </div>

 
  <div className="w-full md:w-1/2 p-6 dark:bg-[#18181B] rounded-lg shadow-lg text-center  max-w-md">
    <p className="text-2xl  font-bold mb-4 text-center ">Login into</p>
    <p className="text-2xl font-bold text-center ">Maintenance System</p>

    <form className="mt-6" method="post" onSubmit={handleSubmit}>
      
      <div className="mb-4">
        <label className="block text-right text-gray-700 dark:text-gray-200" htmlFor="username">
          اسم المستخدم
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          placeholder="ادخل اسم المستخدم"
          className={`w-full h-14 p-4 mt-1 rounded-md text-right outline-none border ${
            errors.name ? "border-red-500 border-2" : "border-gray-300"
          } focus:border-blue-500 dark:text-[#18181B]`}
        />
        {errors.name && touched.name && (
          <div className="mt-2 p-2 text-sm text-red-600 bg-red-50 rounded-lg dark:bg-[#18181B] dark:text-red-400">
            {errors.name}
          </div>
        )}
      </div>

   

      
      <div className="mb-4">
        <label className="block text-right text-gray-700 dark:text-gray-200" htmlFor="password">
          كلمة المرور
        </label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          placeholder="ادخل كلمة المرور"
          className={`w-full h-14 p-4 mt-1 rounded-md text-right outline-none border ${
            errors.password ? "border-red-500 border-2" : "border-gray-300"
          } focus:border-blue-500  dark:text-[#18181B]`}
        />
        {errors.password && touched.password && (
          <div className="mt-2 p-2 text-sm text-red-600 bg-red-50 rounded-lg dark:bg-[#18181B] dark:text-red-400">
            {errors.password}
          </div>
        )}
      </div>

      
      <Button
        type="submit"
        className="w-full h-12 mt-8   rounded-md transition duration-200"
      >
        تسجيل الدخول
      </Button>
    </form>
    <p className="text-center flex flex-row-reverse items-center justify-between max-w-[500px] mx-auto mt-10">
        هل انت مستخدم جديد ؟{" "}
          <Link
            className=" ml-2 link link-hover capitalize link-primary "
            to="/register"
          >
            <Button>
               تسجيل مستخدم 
            </Button>
            
          </Link>
        </p>
  </div>
</div>
  );
};
