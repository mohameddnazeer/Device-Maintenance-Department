import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Formitem from "./Formitem";

const formSchema = z.object({
  id: z.string().min(1, { message: "ID is required." }),
  ownerName: z.string().min(1, { message: "Owner name is required." }),
  ownerNumber: z.string().min(1, { message: "Owner number is required." }),
});

function FormDelivery() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      ownerName: "",
      ownerNumber: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data)
  };

  return (
    <Form {...form}>
      <div className="min-h-screen p-8 ">
        <div className="max-w-6xl mx-auto p-8 dark:bg-black/20 rounded-lg shadow-xl">
          <h1 className="font-bold text-5xl text-center mb-8">جاهز للتسليم</h1>
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
               <Formitem
                             title="رقم المسؤول عن الجهاز"
                             control={form.control}
                             placeholder="ادخل الرقم "
                             name="ownerNumber"
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
            </div>
            <div className="flex justify-center mt-8">
              <Button className="w-96 py-2 px-4 rounded-md" type="submit">
                تسليم الجهاز
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Form>
  );
}

export default FormDelivery;