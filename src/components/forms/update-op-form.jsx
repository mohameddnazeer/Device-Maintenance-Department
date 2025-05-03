import { customFetch, getUrl } from "@/lib/utils";
import { closeModal, nextTab } from "@/store/updateModalSlice";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loader from "./loader";

export function UpdateOpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [maintainerId, setMaintainerId] = useState(null);
  const queryClient = useQueryClient();
  const rowData = useSelector(state => state.updateModal.rowData); // Access row data from Redux store

  const { isFetching: isFetchingUser, data: users } = useQuery({
    select: data => data.data,
    queryKey: ["update-op-form", "users"],
    queryFn: async () => customFetch("api/Users/UsersNamesWithIds"),
  });

  useEffect(() => {
    if (rowData) setMaintainerId(rowData.maintainerId);
  }, [rowData]);

  const onSubmit = e => {
    // Prevent default browser page refresh.
    e.preventDefault();
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");

    // Get form data as an object.
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const data = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (rowData[key] !== value && key !== "solution")
        data.push({ op: "replace", path: `/${key}`, value });
    });
    if (maintainerId !== rowData.maintainerId)
      data.push({ op: "replace", path: `/maintainerId`, value: maintainerId });

    // if (data?.length === 0) return toast.warning("لا توجد تغييرات لتحديثها");

    let config = {
      method: "patch",
      url: getUrl() + `api/maintenance/${rowData.id}`,
      headers: {
        "Content-Type": "application/json-patch+json",
        Authorization: `bearer ${accessToken}`,
      },
      data: JSON.stringify(data),
    };
    toast.promise(axios.request(config), {
      loading: "جاري تحديث البيانات",
      success: () => {
        dispatch(nextTab());
        queryClient.refetchQueries(["op-table", "maintenance"]);

        return "تم تحديث البيانات بنجاح";
      },
      error: err => {
        console.log(err);
        return err.response.data.message || "فشل تحديث البيانات";
      },
    });
  };

  if (isFetchingUser || !rowData) return <Loader />;
  return (
    <Form
      id="update-op-form"
      onSubmit={onSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
        <Input
          size="lg"
          label="اسم العميل"
          labelPlacement="outside"
          name="delievry"
          defaultValue={rowData.delievry}
          placeholder="اسم العميل"
        />
        <Input
          size="lg"
          label="رقم العميل"
          labelPlacement="outside"
          name="delievryPhoneNumber"
          defaultValue={rowData.delievryPhoneNumber}
          placeholder="رقم العميل"
        />
        <Autocomplete
          defaultItems={users?.data ?? []}
          selectedKey={maintainerId}
          onSelectionChange={setMaintainerId}
          label="القائم بالصيانة"
          labelPlacement="outside"
          size="lg"
          className="col-span-2"
          classNames={{ selectorButton: "text-default-500" }}
          listboxProps={{
            hideSelectedIcon: true,
            itemClasses: {
              base: [
                "rounded-medium",
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "dark:data-[hover=true]:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[hover=true]:bg-default-200",
                "data-[selectable=true]:focus:bg-default-100",
                "data-[focus-visible=true]:ring-default-500",
              ],
            },
          }}
          placeholder="ادخل القائم بالصيانة"
          popoverProps={{
            offset: 10,
            classNames: { content: "p-1 border-small border-default-100 bg-background" },
          }}
          radius="lg"
          startContent={<SearchIcon className="text-default-400" size={20} strokeWidth={2.5} />}
          variant="flat"
        >
          {item => (
            <AutocompleteItem key={item.id} textValue={item.name}>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-small">{item.name}</span>
                    {/* <div className="flex gap-x-2">
                      {item.specializations.map((spec, index) => (
                        <span key={index} className="text-tiny text-default-400">
                          {spec.name}
                        </span>
                      ))}
                    </div> */}
                  </div>
                </div>
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>

        <Select
          name="state"
          className="col-span-2"
          label="الحالة"
          size="lg"
          labelPlacement="outside"
          placeholder="اختر الحالة"
          selectionMode="single"
          items={[
            { id: 1, name: "WorkingOnIt", label: "قيد العمل" },
            { id: 2, name: "Canceled", label: "مغلقة" },
            { id: 3, name: "Done", label: "تم الحل" },
          ]}
          defaultSelectedKeys={[rowData.state]}
        >
          {item => (
            <SelectItem dir="rtl" className="text-start" key={item.name}>
              {item.label}
            </SelectItem>
          )}
        </Select>

        {/* <Input
          size="lg"
          label="طريقة الحل"
          labelPlacement="outside"
          name="solution"
          placeholder="طريقة الحل"
          className="col-span-2"
        /> */}

        <Input
          size="lg"
          label="الملاحظات"
          labelPlacement="outside"
          name="notes"
          defaultValue={rowData.notes}
          placeholder="الملاحظات"
          className="col-span-2"
        />
      </div>
      <div className="justify-end mt-auto w-full flex gap-2 p-2">
        <Button type="reset" color="danger" variant="light" onPress={() => dispatch(closeModal())}>
          إلغاء
        </Button>
        <Button type="submit" color="success">
          تحديث عملية الصيانة
        </Button>
      </div>
    </Form>
  );
}
