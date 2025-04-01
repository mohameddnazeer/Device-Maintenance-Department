import { fetchData, getUrl } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseInt } from "lodash";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function OPForm({ onClose }) {
  const navigate = useNavigate();
  const [idState, setIdState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [macState, setMacState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [failures, setFailures] = useState(new Set([]));

  const { data: users } = useQuery({
    queryKey: ["update-op-form", "users"],
    queryFn: async () => fetchData("api/users"),
  });
  const { data: idData } = useQuery({
    select: data => data.data,
    queryKey: ["op-table", "devices-id", idState.inputValue],
    queryFn: async () =>
      fetchData(
        "api/devices" + (idState.inputValue ? "?domainIDIfExists=" + idState.inputValue : "")
      ),
  });
  const { data: macData } = useQuery({
    select: data => data.data,
    queryKey: ["op-table", "devices-mac", macState.inputValue],
    queryFn: async () =>
      fetchData("api/devices" + (macState.inputValue ? "?mac=" + macState.inputValue : "")),
  });

  const { data: failureData } = useQuery({
    queryKey: ["update-op-form", "failures"],
    queryFn: async () => fetchData("api/failures"),
  });

  useEffect(() => {
    macData && setMacState(prevState => ({ ...prevState, items: macData }));
  }, [macData]);
  useEffect(() => {
    idData && setIdState(prevState => ({ ...prevState, items: idData }));
  }, [idData]);

  const onSelectionChange = (key, setState, data, name) => {
    setState(prevState => {
      let selectedItem = prevState.items.find(option => option.id?.toString() === key);
      return { inputValue: selectedItem?.[name] || "", selectedKey: key, items: data };
    });
  };

  const onInputChange = (value, setState) => {
    setState(state => ({ ...state, inputValue: value }));
  };

  const onSubmit = e => {
    // Prevent default browser page refresh.
    e.preventDefault();
    if (!idState.selectedKey && !macState.selectedKey) return;
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");
    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));
    data.deviceId = idState.selectedKey
      ? parseInt(idState.selectedKey)
      : parseInt(macState.selectedKey);
    data.failureIds = Array.from(failures);
    console.log("🚀 ~ OPForm ~ data:", data);
    let config = {
      method: "post",
      url: getUrl() + "api/maintenance",
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      data,
    };

    toast.promise(axios.request(config), {
      loading: <p>جاري اضافة عملية الصيانة</p>,
      success: () => {
        onClose?.();
        return "تم اضافة عملية الصيانة بنجاح";
      },
      error: err => {
        console.log(err);
        return "حدث خطأ اثناء اضافة عملية الصيانة";
      },
    });
  };

  return (
    <Form
      id="add-op-form"
      onSubmit={onSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto max-h-[65vh] scrollbar-hide p-2">
        <div className="flex w-full justify-between items-center gap-x-2 col-span-2">
          <Autocomplete
            isDisabled={macState.selectedKey}
            size="lg"
            inputValue={idState.inputValue}
            defaultItems={idState.items || []}
            placeholder="اختر جهاز (رقم الجهاز)"
            selectedKey={idState.selectedKey}
            onInputChange={value => onInputChange(value, setIdState)}
            onSelectionChange={key =>
              onSelectionChange(key, setIdState, idData, "domainIDIfExists")
            }
          >
            {item => (
              <AutocompleteItem dir="rtl" className="text-right" key={item.id}>
                {item.domainIDIfExists}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <span>أو</span>
          <Autocomplete
            isDisabled={idState.selectedKey}
            size="lg"
            inputValue={macState.inputValue}
            defaultItems={macState.items || []}
            placeholder="اختر جهاز (عنوان MAC)"
            selectedKey={macState.selectedKey}
            onInputChange={value => onInputChange(value, setMacState)}
            onSelectionChange={key => onSelectionChange(key, setMacState, macData, "mac")}
          >
            {item => (
              <AutocompleteItem dir="rtl" className="text-right" key={item.id}>
                {item.mac}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <span>أو</span>
          <Button
            size="lg"
            color="success"
            type="button"
            onPress={() => navigate("/addDevice")}
            className="min-w-28"
          >
            إضافة جهاز
          </Button>
        </div>

        <Input
          size="lg"
          isRequired
          errorMessage="من فضلك ادخل اسم المسلّم"
          label="اسم المسلّم"
          labelPlacement="outside"
          name="delievry"
          placeholder="اسم المسلّم"
        />
        <Input
          size="lg"
          isRequired
          errorMessage="من فضلك ادخل رقم المسلّم"
          label="رقم المسلّم"
          labelPlacement="outside"
          name="delievryPhoneNumber"
          placeholder="رقم المسلّم"
        />

        <Select
          name="maintainLocation"
          // className="col-span-2"
          label="مكان الصيانة"
          size="lg"
          labelPlacement="outside"
          placeholder="اختر مكان الصيانة"
          selectionMode="single"
          items={[
            { id: 1, name: "InOurBranch", label: "داخل فرع النظم" },
            { id: 2, name: "InDeviceOwnerOffice", label: "مع صاحب الجهاز" },
          ]}
        >
          {item => (
            <SelectItem dir="rtl" className="text-start" key={item.name}>
              {item.label}
            </SelectItem>
          )}
        </Select>

        <Select
          isRequired
          disallowEmptySelection
          label="الاعطال"
          size="lg"
          labelPlacement="outside"
          placeholder="اختر الاعطال"
          selectionMode="multiple"
          errorMessage="من فضلك اختر الاعطال"
          selectedKeys={failures}
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
            <SelectItem dir="rtl" className="text-right">
              {item.name}
            </SelectItem>
          )}
        </Select>
        <Autocomplete
          name="receiverID"
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
                    <div className="flex gap-x-2">
                      {item.specializations.map((spec, index) => (
                        <span key={index} className="text-tiny text-default-400">
                          {spec.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Input
          size="lg"
          label="الملاحظات"
          labelPlacement="outside"
          name="notes"
          placeholder="الملاحظات"
          className="col-span-2"
        />
      </div>
    </Form>
  );
}
