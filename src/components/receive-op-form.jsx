import { customFetch } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./loader";

const states = [
  { id: 1, name: "CancelledDeviceNotNeedIt", label: "تم الإلغاء لعدم الحاجة" },
  { id: 2, name: "CancelledBasedOnOwnerRequest", label: "تم الإلغاء بناءاً علي طلب المالك" },
  { id: 3, name: "Solved", label: "تم الحل" },
  { id: 4, name: "NotSolved", label: "لم يتم الحل" },
];

export function ReceiveOpForm() {
  const [submitted, setSubmitted] = useState(null);
  const [failures, setFailures] = useState(new Set([]));

  const rowData = useSelector(state => state.updateModal.rowData); // Access row data from Redux store
  // const rowData = useSelector(state => state.receiveModal.rowData); // Access row data from Redux store

  useEffect(() => {
    if (rowData) setFailures(rowData.failureMaintains);
  }, [rowData]);

  // const { isFetching, data: failureData } = useQuery({
  //   queryKey: ["receive-op-form", "failures"],
  //   queryFn: async () => fetchData("api/failures"),
  // });

  const { isFetching: isFetchingUser, data: users } = useQuery({
    select: data => data.data,
    queryKey: ["receive-op-form", "users"],
    queryFn: async () => customFetch("api/Users/UsersNamesWithIds"),
  });

  const onSubmit = e => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));
    data.failureMaintains = Array.from(failures);

    // Submit data to your backend API.
    setSubmitted(data);
  };

  if (isFetchingUser) return <Loader />;
  return (
    <Form
      id="update-op-form"
      onSubmit={onSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto max-h-[65vh] scrollbar-hide p-2">
        {/* <Select
          disallowEmptySelection
          className="col-span-2"
          label="الاعطال"
          size="lg"
          labelPlacement="outside"
          placeholder="اختر الاعطال"
          selectedKeys={failures}
          selectionMode="multiple"
          onSelectionChange={keys => {
            const newSet = new Set([]);
            keys.forEach(key => {
              const failureId = failureData.find(f => f.id === key)?.id;
              if (failureId) newSet.add(failureId);
            });
            setFailures(newSet);
          }}
          items={failureData ?? []}
        >
          {item => (
            <SelectItem dir="rtl" className="text-start">
              {item.name}
            </SelectItem>
          )}
        </Select> */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto max-h-[65vh] scrollbar-hide col-span-2">
          {Array.from(failures).map(({ name, state }, idx) => {
            return (
              <Select
                key={idx}
                name={idx}
                label={name}
                size="lg"
                labelPlacement="outside"
                placeholder="اختر الحالة"
                selectionMode="single"
                items={states}
                defaultSelectedKeys={[state]}
              >
                {item => (
                  <SelectItem className="text-right" dir="rtl" key={item.name}>
                    {item.label}
                  </SelectItem>
                )}
              </Select>
            );
          })}
        </div>

        <Input
          size="lg"
          label="اسم المستلم"
          labelPlacement="outside"
          name="delievry"
          defaultValue={rowData.delievry}
          placeholder="اسم المستلم"
        />
        <Input
          size="lg"
          label="رقم الهاتف"
          labelPlacement="outside"
          name="phoneNumber"
          defaultValue={rowData.delievryPhoneNumber}
          placeholder="رقم الهاتف"
        />
        <Autocomplete
          name="maintainerId"
          // Todo: get over here later
          // defaultInputValue={rowData.maintainerId}
          // defaultSelectedKey={""}
          label="القائم بالصيانة"
          labelPlacement="outside"
          size="lg"
          className="col-span-2"
          classNames={{ selectorButton: "text-default-500" }}
          defaultItems={users ?? []}
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

        <Input
          size="lg"
          label="طريقة الحل"
          labelPlacement="outside"
          name="solution"
          placeholder="طريقة الحل"
          className="col-span-2"
        />

        <Input
          size="lg"
          label="الملاحظات"
          labelPlacement="outside"
          name="notes"
          defaultValue={rowData.notes}
          placeholder="الملاحظات"
          className="col-span-2"
        />

        {submitted && (
          <div className="flex flex-col text-small text-default-500">
            {Object.entries(submitted).map(([key, value]) => (
              <span key={key}>
                {key} : {value}
              </span>
            ))}
          </div>
        )}
      </div>
    </Form>
  );
}
