import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Navbar } from "../components/utils/Navbar";
import SelectInput from "../components/utils/SelectInput";
import TextInput from "@/components/utils/TextInput";
import ProfileForm from "@/components/ProfileForm";

const AddDevice = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Navbar />
      {/* old form */}
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div
          dir="rtl"
          className="flex flex-col lg:flex-row items-start justify-around w-full px-4 lg:px-0"
        >
          
          <div className="w-full lg:w-6/12 mt-8 lg:mt-0 lg:mr-10">
            <h3 className="text-white text-right my-8 text-xl sm:text-2xl">
              تفاصيل
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 sm:gap-x-10 gap-y-8">
              {
                DetailsAttrs.map(({ name, defaultValue, render }) => <Controller
                  name={name}
                  control={control}
                  defaultValue={defaultValue || ""}
                  render={render}
                />)
              }
            </div>
          </div>

          
          <div className="w-full lg:w-6/12 mt-8 lg:mt-0 lg:mr-10">
            <h3 className="text-white text-right my-8 text-xl sm:text-2xl">
              الهاردوير
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 sm:gap-x-10 gap-y-8">
              {
                hardwareAttrs.map(({ name, defaultValue, render }) => <Controller
                  name={name}
                  control={control}
                  defaultValue={defaultValue || ""}
                  render={render}
                />)
              }
            </div>
          </div>
        </div>

        <div className="w-full lg:w-10/12 text-center mx-auto mt-5">
          <h3 className="text-white text-right my-5 text-xl sm:text-2xl ">
            ملاحظات
          </h3>
          <Controller
            name="notes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                {...field}
                className="textarea w-full h-28 p-4 bg-custom-gray block rounded-md text-right outline-none text-white border border-[#3D4752]"
                placeholder="أدخل ملاحظاتك"
              />
            )}
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="ml-0 sm:ml-10 w-full sm:w-60 h-12 bg-[#007560] text-white rounded-md hover:bg-green-700 transition duration-200 text-xl sm:text-2xl "
          >
            حفظ
          </button>
        </div>
      </form> */}
      <ProfileForm />
    </div>
  );
};

export default AddDevice;

// const hardwareAttrs = [
//   {
//     name: "cpuType",
//     render: ({ field }) => (
//       <SelectInput
//         labelName="نوع CPU"
//         options={["Intel", "AMD"]}
//         selectName="أختر النوع "
//         {...field}
//       />
//     ),
//   },
//   {
//     name: "cpuModel",
//     render: ({ field }) => (
//       <TextInput labelName="موديل CPU" type="text" placeholder="ادخل النوع" {...field} />
//     ),
//   },
//   {
//     name: "cpuGeneration",
//     render: ({ field }) => (
//       <SelectInput
//         labelName="جيل CPU"
//         options={["9th Gen", "10th Gen", "11th Gen"]}
//         selectName="أختر الجيل"
//         {...field}
//       />
//     ),
//   },
//   {
//     name: "gpuType",
//     render: ({ field }) => (
//       <TextInput labelName="نوع GPU" type="text" placeholder="ادخل النوع" {...field} />
//     ),
//   },
//   {
//     name: "gpuModel",
//     render: ({ field }) => (
//       <TextInput labelName="موديل GPU" type="text" placeholder="ادخل النوع" {...field} />
//     ),
//   },
//   {
//     name: "gpuSize",
//     render: ({ field }) => (
//       <TextInput labelName="حجم GPU" type="text" placeholder="ادخل الحجم" {...field} />
//     ),
//   },
//   {
//     name: "ramSize",
//     render: ({ field }) => (
//       <SelectInput
//         labelName="حجم RAM"
//         options={["8GB", "16GB", "32GB"]}
//         selectName="أختر الحجم "
//         {...field}
//       />
//     ),
//   },
//   {
//     name: "ramType",
//     render: ({ field }) => (
//       <SelectInput
//         labelName="نوع RAM"
//         options={["DDR3", "DDR4"]}
//         selectName="أختر النوع "
//         {...field}
//       />
//     ),
//   },
//   {
//     name: "romSize",
//     render: ({ field }) => (
//       <SelectInput
//         labelName="حجم ROM"
//         options={["256GB", "512GB", "1TB"]}
//         selectName="أختر الحجم "
//         {...field}
//       />
//     ),
//   },
//   {
//     name: "romType",
//     render: ({ field }) => (
//       <SelectInput
//         labelName="نوع ROM"
//         options={["SSD", "HDD"]}
//         selectName="أختر النوع "
//         {...field}
//       />
//     ),
//   },
// ];

// const DetailsAttrs = [
//   {
//     name: "sector",
//     render: ({ field }) => (
//       <SelectInput
//         labelName="القطاع"
//         options={["الضابعة", "اللاهون"]}
//         selectName="أختر القطاع"
//         {...field}
//       />
//     ),
//   },
//   {
//     name: "department",
//     render: ({ field }) => (
//       <SelectInput
//         labelName="الادارة"
//         options={["النظم", "الهندسية"]}
//         selectName="أختر الادارة"
//         {...field}
//       />
//     ),
//   },
//   {
//     name: "office",
//     render: ({ field }) => (
//       <TextInput labelName="المكتب" type="text" placeholder="أدخل المكتب" {...field} />
//     ),
//   },
//   {
//     name: "deviceNumber",
//     render: ({ field }) => (
//       <TextInput labelName="رقم الجهاز" type="number" placeholder="أدخل الرقم" {...field} />
//     ),
//   },
//   {
//     name: "deviceType",
//     render: ({ field }) => (
//       <TextInput labelName="نوع الجهاز" type="text" placeholder="أدخل النوع" {...field} />
//     ),
//   },
//   {
//     name: "macAddress",
//     render: ({ field }) => (
//       <TextInput labelName="عنوان MAC" type="text" placeholder="أدخل MAC" {...field} />
//     ),
//   },
//   {
//     name: "ownerName",
//     render: ({ field }) => (
//       <TextInput labelName="اسم المالك" type="text" placeholder="أدخل الاسم" {...field} />
//     ),
//   },
//   {
//     name: "ownerNumber",
//     render: ({ field }) => (
//       <TextInput labelName="رقم المالك" type="number" placeholder="أدخل الرقم" {...field} />
//     ),
//   },
// ];
