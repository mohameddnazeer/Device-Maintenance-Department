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

export function UpdateOpForm({ onComplete }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [maintainerId, setMaintainerId] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const queryClient = useQueryClient();
  const rowData = useSelector((state) => state.updateModal.rowData);

  const { isFetching: isFetchingUser, data: users } = useQuery({
    select: (data) => data.data,
    queryKey: ["update-op-form", "users"],
    queryFn: async () => customFetch("api/Users/UsersNamesWithIds"),
  });

  useEffect(() => {
    if (rowData) {
      setMaintainerId(rowData.maintainerId ?? null);
      setSelectedState(rowData.state ?? null);
    }
  }, [rowData]);

  const onSubmit = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const patchData = [];

    // Compare and collect changes
    for (const [key, value] of Object.entries(formData)) {
      if (rowData[key] !== value) {
        patchData.push({ op: "replace", path: `/${key}`, value });
      }
    }

    // Handle selected state separately
    if (selectedState !== rowData.state) {
      patchData.push({ op: "replace", path: "/state", value: selectedState });
    }

    // Handle selected maintainerId
    if (maintainerId !== rowData.maintainerId) {
      patchData.push({ op: "replace", path: "/maintainerId", value: maintainerId });
    }

    if (patchData.length === 0) {
      toast.warning("لا توجد تغييرات لتحديثها");
      return;
    }

    const config = {
      method: "patch",
      url: `${getUrl()}api/maintenance/${rowData.id}`,
      headers: {
        "Content-Type": "application/json-patch+json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: JSON.stringify(patchData),
    };

    toast.promise(axios.request(config), {
      loading: "جاري تحديث البيانات",
      success: () => {
        dispatch(nextTab());
        queryClient.refetchQueries(["op-table", "maintenance"]);
        onComplete();
        return "تم تحديث البيانات بنجاح";
      },
      error: (err) => {
        console.error(err);
        return err.response?.data?.message || "فشل تحديث البيانات";
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
          {(item) => (
            <AutocompleteItem key={item.id} textValue={item.name}>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-small">{item.name}</span>
                  </div>
                </div>
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>

        <Select
          className="col-span-2"
          name="state"
          label="الحالة"
          size="lg"
          labelPlacement="outside"
          placeholder="اختر الحالة"
          selectionMode="single"
          selectedKeys={selectedState ? [selectedState] : []}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0];
            setSelectedState(key);
          }}
          items={[
            { id: 1, name: "WorkingOnIt", label: "قيد العمل" },
            { id: 2, name: "Canceled", label: "مغلقة" },
            { id: 3, name: "Done", label: "تم الحل" },
          ]}
        >
          {(item) => (
            <SelectItem dir="rtl" className="text-start" key={item.name}>
              {item.label}
            </SelectItem>
          )}
        </Select>

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
