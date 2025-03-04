import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,

} from "@/components/ui/form";
import Formitem from "./Formitem";
import CustomSelect from "./CustomSelect";

const formSchema = z.object({
  id: z.string().min(1, { message: "ID is required." }),
  region: z.string().min(1, { message: "Region is required." }),
  gate: z.string().min(1, { message: "Gate is required." }),
  department: z.string().min(1, { message: "Department is required." }),
  office: z.string().min(1, { message: "Office is required." }),
  deviceType: z.string().min(1, { message: "Device type is required." }),
  macAddress: z.string().min(1, { message: "MAC address is required." }),
  ownerName: z.string().min(1, { message: "Owner name is required." }),
  ownerNumber: z.string().min(1, { message: "Owner number is required." }),
  cpuType: z.string().min(1, { message: "CPU type is required." }),
  cpuModel: z.string().min(1, { message: "CPU model is required." }),
  cpuGeneration: z.string().min(1, { message: "CPU generation is required." }),
  gpuType: z.string().min(1, { message: "GPU type is required." }),
  gpuModel: z.string().min(1, { message: "GPU model is required." }),
  gpuSize: z.string().min(1, { message: "GPU size is required." }),
  ramSize: z.string().min(1, { message: "RAM size is required." }),
  ramType: z.string().min(1, { message: "RAM type is required." }),
  romSize: z.string().min(1, { message: "ROM size is required." }),
  romType: z.string().min(1, { message: "ROM type is required." }),
  createdAt: z.string().min(1, { message: "Creation date is required." }),
});

function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      region: "",
      gate: "",
      department: "",
      office: "",
      deviceType: " ",
      macAddress: "",
      ownerName: "",
      ownerNumber: "",
      cpuType: "",
      cpuModel: "",
      cpuGeneration: "",
      // gpuType: "",
      gpuModel: "",
      // gpuSize: "",
      ramSize: "",
      ramType: "",
      romSize: "",
      romType: "",
      createdAt: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <div className="min-h-screen p-8 ">
        <div className="max-w-6xl mx-auto p-8 dark:bg-black/20 rounded-lg shadow-xl">
          <h1 className="font-bold text-5xl text-center mb-8">اضافة جهاز</h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Formitem
                title="المعرف"
                control={form.control}
                placeholder="ادخل المعرف"
                name="id"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            <CustomSelect
                title="المنطقة"
                control={form.control}
                name="region"
                label="القطاع"
                options={[
                  { value: "الضبعه", label: "الضبعه" },
                  { value: "اللاهون", label: "اللاهون" },
                  { value: "العياط", label: "العياط" },
                ]}
                placeholder="اختر المنطقة"
              />
              <Formitem
                title="البوابة"
                control={form.control}
                placeholder="ادخل البوابة"
                name="gate"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              <Formitem
                title="الإدارة"
                control={form.control}
                placeholder="ادخل الإدارة"
                name="department"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              <Formitem
                title="المكتب"
                control={form.control}
                placeholder="ادخل المكتب"
                name="office"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              <Formitem
                title="نوع الجهاز"
                control={form.control}
                placeholder="ادخل نوع الجهاز"
                name="deviceType"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              <Formitem
                title="عنوان MAC"
                control={form.control}
                placeholder="ادخل عنوان MAC"
                name="macAddress"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              <Formitem
                title="اسم المسؤول عن الجهاز"
                control={form.control}
                placeholder="ادخل الاسم "
                name="ownerName"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              <Formitem
                title="رقم المسؤول عن الجهاز"
                control={form.control}
                placeholder="ادخل الرقم "
                name="ownerNumber"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              {/* <Formitem
                title="نوع CPU"
                control={form.control}
                placeholder="ادخل نوع CPU"
                name="cpuType"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              /> */}
              <Formitem
                title="موديل CPU"
                control={form.control}
                placeholder="ادخل موديل CPU"
                name="cpuModel"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              {/* <Formitem
                title="جيل CPU"
                control={form.control}
                placeholder="ادخل جيل CPU"
                name="cpuGeneration"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              /> */}
              <Formitem
                title="نوع GPU"
                control={form.control}
                placeholder="ادخل نوع GPU"
                name="gpuType"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              {/* <Formitem
                title="موديل GPU"
                control={form.control}
                placeholder="ادخل موديل GPU"
                name="gpuModel"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              <Formitem
                title="حجم GPU"
                control={form.control}
                placeholder="ادخل حجم GPU"
                name="gpuSize"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              <Formitem
                title="حجم RAM"
                control={form.control}
                placeholder="ادخل حجم RAM"
                name="ramSize"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              /> */}
              <Formitem
                title="نوع RAM"
                control={form.control}
                placeholder="ادخل نوع RAM"
                name="ramType"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              {/* <Formitem
                title="حجم ROM"
                control={form.control}
                placeholder="ادخل حجم ROM"
                name="romSize"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              <Formitem
                title="نوع ROM"
                control={form.control}
                placeholder="ادخل نوع ROM"
                name="romType"
                label="block text-sm font-medium"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              /> */}
            </div>
            <div className="flex justify-center mt-8">
              <Button className="w-96 py-2 px-4 rounded-md" type="submit">
                اضافة
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Form>
  );
}

export default ProfileForm;