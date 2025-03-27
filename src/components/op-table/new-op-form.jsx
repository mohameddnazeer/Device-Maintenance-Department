import { fetchData } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function OPForm() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(null);
  const [idState, setIdState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [macState, setMacState] = useState({ selectedKey: null, inputValue: "", items: [] });

  const { data: idData } = useQuery({
    queryKey: ["op-table", "devices-id", idState.inputValue],
    queryFn: async () =>
      fetchData(
        "api/devices" + (idState.inputValue ? "?domainIDIfExists=" + idState.inputValue : "")
      ),
  });

  const { data: macData } = useQuery({
    queryKey: ["op-table", "devices-macAddress", macState.inputValue],
    queryFn: async () =>
      fetchData("api/devices" + (macState.inputValue ? "?macAddress=" + macState.inputValue : "")),
  });

  useEffect(() => {
    macData && setMacState(prevState => ({ ...prevState, items: macData }));
  }, [macData]);
  useEffect(() => {
    idData && setIdState(prevState => ({ ...prevState, items: idData }));
  }, [idData]);

  const onSelectionChange = (key, setState, data, name) => {
    setState(prevState => {
      let selectedItem = prevState.items.find(option => option[name] === key);
      return { inputValue: selectedItem?.[name] || "", selectedKey: key, items: data };
    });
  };

  const onInputChange = (value, setState) => {
    setState(state => ({ ...state, inputValue: value }));
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
    <Form
      id="add-op-form"
      onSubmit={onSubmit}
      className="w-full flex flex-col items-center justify-center p-2"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto max-h-[65vh] scrollbar-hide">
        <div className="flex w-full justify-between items-center gap-x-2 col-span-2">
          <Autocomplete
            isDisabled={macState.selectedKey}
            size="lg"
            inputValue={idState.inputValue}
            items={idState.items}
            placeholder="اختر جهاز (رقم الجهاز)"
            selectedKey={idState.selectedKey}
            onInputChange={value => onInputChange(value, setIdState)}
            onSelectionChange={key => onSelectionChange(key, setIdState, idData, "id")}
          >
            {item => <AutocompleteItem key={item.id}>{item.id}</AutocompleteItem>}
          </Autocomplete>
          <span>أو</span>
          <Autocomplete
            isDisabled={idState.selectedKey}
            size="lg"
            inputValue={macState.inputValue}
            items={macState.items}
            placeholder="اختر جهاز (عنوان MAC)"
            selectedKey={macState.selectedKey}
            onInputChange={value => onInputChange(value, setMacState)}
            onSelectionChange={key => onSelectionChange(key, setMacState, macData, "macAddress")}
          >
            {item => <AutocompleteItem key={item.macAddress}>{item.macAddress}</AutocompleteItem>}
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
          name="soldierName"
          placeholder="اسم المسلّم"
        />
        <Input
          size="lg"
          isRequired
          errorMessage="من فضلك ادخل رقم المسلّم"
          label="رقم المسلّم"
          labelPlacement="outside"
          name="soldierNumber"
          placeholder="رقم المسلّم"
        />
        <Input
          size="lg"
          isRequired
          errorMessage="من فضلك ادخل اسم المستلم"
          label="اسم المستلم"
          labelPlacement="outside"
          name="nozomSoldierName"
          placeholder="اسم المستلم"
        />
        <Input
          size="lg"
          // isRequired
          // errorMessage="من فضلك ادخل اسم القائم بالصيانة"
          label="القائم بالصيانة"
          labelPlacement="outside"
          name="maintenanceSoldier"
          placeholder="القائم بالصيانة"
        />
        <Input
          size="lg"
          isRequired
          errorMessage="من فضلك ادخل العطل"
          label="العطل"
          labelPlacement="outside"
          name="error"
          placeholder="العطل"
          className="col-span-2"
        />
        <Input
          size="lg"
          // isRequired
          // errorMessage="من فضلك ادخل الملاحظات"
          label="الملاحظات"
          labelPlacement="outside"
          name="notes"
          placeholder="الملاحظات"
          className="col-span-2"
        />

        {submitted && (
          <div className="text-small text-default-500">
            You submitted: <code>{JSON.stringify(submitted)}</code>
          </div>
        )}
      </div>
    </Form>
  );
}
