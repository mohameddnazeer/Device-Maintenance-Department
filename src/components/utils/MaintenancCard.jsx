import React from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput from "./TextInput";

const MaintenancCard = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={`bg-[#131A23] w-full m-auto rounded-lg mt-10`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-8 ">
          <label className="form-control w-full ">
            <div className="label ml-14">
              <span className="label-text w-[100%] sm:w-[76%]   text-white text-lg text-right block mb-2">
                رقم الجهاز
              </span>
            </div>
            <input
              className={`w-full sm:w-80 mx-auto  h-14 p-4 bg-custom-gray block  mt-1 rounded-md text-right outline-none text-white border border-[#3D4752]`}
              type="text"
              placeholder="ادخل رقم الجهاز"
              name="deviceNumber"
              value=""
            />
          </label>
        </div>
        <div className="flex justify-around items-center my-8 gap-4 w-[95%]  mx-auto ">
          <Controller
            name="office"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                labelName="اسم المسلم"
                type="text"
                placeholder="أدخل اسم المسلم"
                {...field}
              />
            )}
          />
          <Controller
            name="office"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                labelName="رقم المسلم"
                type="text"
                placeholder="أدخل رقم المسلم"
                {...field}
              />
            )}
          />
        </div>
        <div className="flex justify-around items-center my-8 gap-4 w-[95%] mx-auto">
          <Controller
            name="office"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                labelName="اسم المستلم"
                type="text"
                placeholder="أدخل اسم المستلم"
                {...field}
              />
            )}
          />
          <Controller
            name="office"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                labelName="القائم بالصيانة"
                type="text"
                placeholder="أدخل القائم بالصيانة"
                {...field}
              />
            )}
          />
        </div>
        <div>
          <h2 className="text-white text-3xl text-right mr-5">العطل</h2>
          <div className="flex justify-around items-center mt-5 mb-8 gap-4 w-[95%] mx-auto">
            <Controller
              name="office"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextInput
                  labelName=""
                  type="text"
                  placeholder="أدخل العطل"
                  {...field}
                />
              )}
            />
            <Controller
              name="office"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextInput
                  labelName=""
                  type="text"
                  placeholder="أدخل العطل"
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-5 text-center">
          <button
            type="submit"
            className="bg-[#007560] text-white text-xl p-4 rounded-md sm:w-80 w-40 mb-5"
          >
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaintenancCard;
