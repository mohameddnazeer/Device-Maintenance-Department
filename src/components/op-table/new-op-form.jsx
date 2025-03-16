import { fetchData } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function OPForm() {
  const [submitted, setSubmitted] = useState(null);
  const [idState, setIdState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [macState, setMacState] = useState({ selectedKey: null, inputValue: "", items: [] });

  const { data } = useQuery({
    queryKey: ["op-table", "devices-id", idState.inputValue],
    queryFn: async () =>
      fetchData("devices" + (idState.inputValue ? "?id=" + idState.inputValue : "")),
  });

  useEffect(() => {
    data && setIdState(prevState => ({ ...prevState, items: data }));
    data && setMacState(prevState => ({ ...prevState, items: data }));
  }, [data]);

  const onIdSelectionChange = key => {
    setIdState(prevState => {
      let selectedItem = prevState.items.find(option => option.key === key);
      return { inputValue: selectedItem?.label || "", selectedKey: key, items: data };
    });
  };

  const onIdInputChange = value => {
    setIdState(state => ({ ...state, inputValue: value }));
  };

  const onMacSelectionChange = key => {
    setMacState(prevState => {
      let selectedItem = prevState.items.find(option => option.key === key);
      return { inputValue: selectedItem?.label || "", selectedKey: key, items: data };
    });
  };

  const onMacInputChange = value => {
    setMacState(state => ({ ...state, inputValue: value }));
  };

  const onSubmit = e => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // console.log("🚀:", data);

    // Submit data to your backend API.
    setSubmitted(data);
  };

  return (
    <Form id="add-op-form" onSubmit={onSubmit}>
      <div className="flex w-full justify-between items-center">
        <Autocomplete
          disabled={macState.selectedKey}
          className="max-w-xs"
          size="lg"
          inputValue={idState.inputValue}
          items={idState.items}
          placeholder="اختر جهاز (رقم الجهاز)"
          selectedKey={idState.selectedKey}
          onInputChange={onIdInputChange}
          onSelectionChange={onIdSelectionChange}
        >
          {item => <AutocompleteItem key={item.id}>{item.id}</AutocompleteItem>}
        </Autocomplete>
        <span>أو</span>
        <Autocomplete
          disabled={idState.selectedKey}
          className="max-w-xs"
          size="lg"
          inputValue={macState.inputValue}
          items={macState.items}
          placeholder="اختر جهاز (عنوان MAC)"
          selectedKey={macState.selectedKey}
          onInputChange={onMacInputChange}
          onSelectionChange={onMacSelectionChange}
        >
          {item => <AutocompleteItem key={item.macAddress}>{item.macAddress}</AutocompleteItem>}
        </Autocomplete>
      </div>
      <Input
        label="اختر جهاز (رقم الجهاز)"
        labelPlacement="outside"
        name="id"
        placeholder="اختر جهاز"
      />
      <Input
        label="اختر جهاز (عنوان MAC)"
        labelPlacement="outside"
        name="macAddress"
        placeholder="اختر جهاز"
      />
      <Input
        isRequired
        errorMessage="من فضلك ادخل اسم المسلّم"
        label="اسم المسلّم"
        labelPlacement="outside"
        name="soldierName"
        placeholder="اسم المسلّم"
      />
      <Input
        isRequired
        errorMessage="من فضلك ادخل رقم المسلّم"
        label="رقم المسلّم"
        labelPlacement="outside"
        name="soldierNumber"
        placeholder="رقم المسلّم"
      />
      <Input
        isRequired
        errorMessage="من فضلك ادخل اسم المستلم"
        label="اسم المستلم"
        labelPlacement="outside"
        name="nozomSoldierName"
        placeholder="اسم المستلم"
      />
      <Input
        // isRequired
        // errorMessage="من فضلك ادخل اسم القائم بالصيانة"
        label="القائم بالصيانة"
        labelPlacement="outside"
        name="maintenanceSoldier"
        placeholder="القائم بالصيانة"
      />
      <Input
        isRequired
        errorMessage="من فضلك ادخل العطل"
        label="العطل"
        labelPlacement="outside"
        name="error"
        placeholder="العطل"
      />
      <Input
        // isRequired
        // errorMessage="من فضلك ادخل الملاحظات"
        label="الملاحظات"
        labelPlacement="outside"
        name="notes"
        placeholder="الملاحظات"
      />

      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
  );
}
