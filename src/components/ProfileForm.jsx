import { useForm } from "react-hook-form"


import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import Formitem from "./Formitem"

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })
function ProfileForm() {
    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            username:''
        }
    })

    const onSubmit = (data)=>{
        console.log(data)
    }
  return (
    <Form {...form}>
        <div className="min-h-screen  p-8">
            <div className="max-w-2xl mx-auto  p-8 rounded-lg shadow-md">
                <h1 className=" font-bold text-5xl text-center mb-8">اضافة جهاز</h1>
                <form onSubmit={form.handleSubmit(onSubmit)} className="   ">
                    <div className="flex items-center justify-center w-full space-x-6" >
                    <div className="w-1/2 space-y-2 ">
                    <Formitem title='CPU نوع' control={form.control} placeholder="ادخل النوع" name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
                    <Formitem title=' CPU جيل  ' control={form.control} placeholder="اكتب الجيل" name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
           <Formitem title=' GPU نوع  ' control={form.control} placeholder="ادخل النوع" name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
           <Formitem title=' GPU حجم  ' control={form.control} placeholder="GPU اكتب حجم " name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
           
           <Formitem title='RAM حجم  ' control={form.control} placeholder="اكتب الحجم" name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
           <Formitem title=' RAM نوع' control={form.control} placeholder="RAM اكتب نوع " name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
           
           <Formitem title=' ROM نوع' control={form.control} placeholder="اكتب النوع" name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
         
          
        
                    </div>

                             <div className=" w-1/2 space-y-2 ">
                          <Formitem title='المكتب' control={form.control} placeholder="ادخل المكتب" name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
           <Formitem title='نوع الجهاز' control={form.control} placeholder="ادخل النوع" name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
           <Formitem title='اسم المالك' control={form.control} placeholder="اكتب الاسم" name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
           <Formitem title='رقم المالك' control={form.control} placeholder="رقم المالك" name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
           <Formitem title='رقم الجهاز' control={form.control} placeholder="رقم الجهاز" name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
           <Formitem title='الاداره' control={form.control} placeholder="اكتب الادارة" name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
           <Formitem title='Mac Address' control={form.control} placeholder=" Mac اكتب عنوان" name='office' label="block text-sm font-medium" className={"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"}/>
       
                    </div>
                    

                    </div>
                    <Button className='w-96 my-12 py-2 px-4 rounded-md   ' type="submit">اضافة</Button>
                   
         
        </form>
            </div>

        </div>
        
  
</Form>

  )
}

export default ProfileForm
