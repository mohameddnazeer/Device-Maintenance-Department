import { fetchData } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

function ProfileForm({ onClose }) {
  const [regionState, setRegionState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [gateState, setGateState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [departmentState, setDepartmentState] = useState({
    selectedKey: null,
    inputValue: "",
    items: [],
  });
  const [officeState, setOfficeState] = useState({ selectedKey: null, inputValue: "", items: [] });

  const regionRes = useQuery({
    queryKey: ["addDevice", "region"],
    queryFn: async () => fetchData("regions"),
  });
  const regionData = useMemo(
    () => (regionRes.data ? [{ id: "null", label: "بدون" }, ...regionRes.data] : []),
    [regionRes.data]
  );

  const gateRes = useQuery({
    queryKey: ["addDevice", "gate", regionState.selectedKey],
    queryFn: async () => {
      const query = new URLSearchParams();
      if (regionState.selectedKey && regionState.selectedKey === "null")
        query.set("region", "null");
      else if (regionState.selectedKey) query.set("region", regionState.selectedKey);
      return fetchData("gates?" + query.toString());
    },
    enabled: !!regionState.selectedKey,
  });
  const gateData = useMemo(
    () => (gateRes.data ? [{ id: "null", label: "بدون" }, ...gateRes.data] : []),
    [gateRes.data]
  );

  const departmentRes = useQuery({
    queryKey: ["addDevice", "department", regionState.selectedKey, gateState.selectedKey],
    queryFn: async () => {
      const query = new URLSearchParams();
      if (regionState.selectedKey && regionState.selectedKey === "null")
        query.set("region", "null");
      else if (regionState.selectedKey) query.set("region", regionState.selectedKey);
      if (gateState.selectedKey && gateState.selectedKey === "null") query.set("gate", "null");
      else if (gateState.selectedKey) query.set("gate", gateState.selectedKey);
      return fetchData("departments?" + query.toString());
    },
    enabled: !!gateState.selectedKey,
  });

  const officeRes = useQuery({
    queryKey: [
      "addDevice",
      "office",
      regionState.selectedKey,
      gateState.selectedKey,
      departmentState.selectedKey,
    ],
    queryFn: async () => {
      const query = new URLSearchParams();
      if (regionState.selectedKey && regionState.selectedKey === "null")
        query.set("region", "null");
      else if (regionState.selectedKey) query.set("region", regionState.selectedKey);
      if (gateState.selectedKey && gateState.selectedKey === "null") query.set("gate", "null");
      else if (gateState.selectedKey) query.set("gate", gateState.selectedKey);
      if (departmentState.selectedKey) query.set("department", departmentState.selectedKey);
      return fetchData("offices?" + query.toString());
    },
    enabled: !!departmentState.selectedKey,
  });

  useEffect(() => {
    regionRes.data && setRegionState(prevState => ({ ...prevState, items: regionData }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionRes.data]);
  useEffect(() => {
    gateRes.data && setGateState(prevState => ({ ...prevState, items: gateData }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gateRes.data]);
  useEffect(() => {
    departmentRes.data &&
      setDepartmentState(prevState => ({ ...prevState, items: departmentRes.data }));
  }, [departmentRes.data]);
  useEffect(() => {
    officeRes.data && setOfficeState(prevState => ({ ...prevState, items: officeRes.data }));
  }, [officeRes.data]);

  const onSelectionChange = (key, setState, data, name) => {
    setState(prevState => {
      let selectedItem = prevState.items.find(option => option.id === key);
      return { inputValue: selectedItem?.label || "", selectedKey: key, items: data };
    });
    switch (name) {
      case "region":
        setGateState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        setDepartmentState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        setOfficeState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        break;
      case "gate":
        setDepartmentState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        setOfficeState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        break;
      case "department":
        setOfficeState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        break;
      default:
        break;
    }
  };

  const onInputChange = (value, setState, data) => {
    setState(state => ({
      ...state,
      inputValue: value,
      items: data.filter(item => item.label.includes(value)),
    }));
  };

  const { mutateAsync } = useMutation({
    mutationFn: variables =>
      fetchData("devices", { method: "POST", body: JSON.stringify(variables) }),
  });

  const onSubmit = async event => {
    event.preventDefault();
    // Get form data as an object.
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const res = mutateAsync(data);
    toast.promise(res, {
      loading: <p>جاري الإضافة</p>,
      // eslint-disable-next-line no-unused-vars
      success: data => {
        console.log("🚀 ", data);
        onClose();
        return "تم الإضافة";
      },
      error: { message: "حدث خطأ ما" },
    });
  };

  const elList = useMemo(
    () => [
      {
        isRequired: false,
        title: "رقم الجهاز",
        placeholder: "ادخل رقم الجهاز",
        name: "id",
        errorMsg: "رقم الجهاز مطلوب",
      },
      {
        isRequired: true,
        title: "المنطقة",
        name: "region",
        label: "القطاع",
        state: regionState,
        setState: setRegionState,
        data: regionData,
        placeholder: "اختر القطاع",
        errorMsg: "القطاع مطلوب",
      },
      {
        isRequired: true,
        disabled: !regionState.selectedKey,
        title: "البوابة",
        name: "gate",
        label: "البوابة",
        state: gateState,
        setState: setGateState,
        data: gateData,
        placeholder: "اختر البوابة",
        errorMsg: "البوابة مطلوبة",
      },
      {
        isRequired: true,
        disabled: !gateState.selectedKey,
        title: "الإدارة",
        name: "department",
        label: "الإدارة",
        state: departmentState,
        setState: setDepartmentState,
        data: departmentRes.data,
        placeholder: "اختر الإدارة",
        errorMsg: "الإدارة مطلوبة",
      },
      {
        isRequired: true,
        disabled: !departmentState.selectedKey,
        title: "المكتب",
        name: "office",
        label: "المكتب",
        state: officeState,
        setState: setOfficeState,
        data: officeRes.data,
        placeholder: "اختر المكتب",
        errorMsg: "المكتب مطلوب",
      },
      {
        isRequired: true,
        title: "اسم المسؤول عن الجهاز",
        placeholder: "ادخل الاسم ",
        name: "ownerName",
        errorMsg: "اسم المسؤول مطلوب",
      },
      {
        isRequired: true,
        title: "رقم المسؤول عن الجهاز",
        placeholder: "ادخل الرقم ",
        name: "ownerNumber",
        errorMsg: "رقم المسؤول مطلوب",
      },
      {
        isRequired: true,
        title: "نوع الجهاز",
        placeholder: "ادخل نوع الجهاز",
        name: "deviceType",
        errorMsg: "نوع الجهاز مطلوب",
      },
      {
        isRequired: true,
        title: "عنوان MAC",
        placeholder: "ادخل  MAC",
        name: "macAddress",
        errorMsg: "عنوان MAC مطلوب",
      },
      { isRequired: false, title: "موديل CPU", placeholder: "ادخل موديل CPU", name: "cpuModel" },
      { isRequired: false, title: "موديل GPU", placeholder: "ادخل موديل GPU", name: "gpuModel" },
      { isRequired: false, title: "حجم RAM", placeholder: "ادخل حجم RAM", name: "ramSize" },
    ],
    [
      regionState,
      gateState,
      departmentState,
      officeState,
      regionData,
      gateData,
      departmentRes.data,
      officeRes.data,
    ]
  );

  return (
    <Form
      dir="rtl"
      id="add-device-form"
      onSubmit={onSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto max-h-[65vh] scrollbar-hide">
        {elList.map(
          ({
            name,
            placeholder,
            title,
            label,
            state,
            setState,
            disabled,
            data,
            isRequired,
            errorMsg,
          }) => {
            if (label)
              return (
                <Autocomplete
                  isRequired={isRequired}
                  key={name}
                  isDisabled={disabled}
                  size="lg"
                  inputValue={state.inputValue}
                  items={state.items}
                  label={label || title}
                  labelPlacement="outside"
                  placeholder={placeholder}
                  selectedKey={state.selectedKey}
                  onInputChange={value => onInputChange(value, setState, data)}
                  onSelectionChange={key => onSelectionChange(key, setState, data, name)}
                  errorMessage={errorMsg}
                >
                  {item => (
                    <AutocompleteItem dir="rtl" key={item.id} className="text-right">
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              );
            return (
              <Input
                isRequired={isRequired}
                key={name}
                label={label || title}
                labelPlacement="outside"
                size="lg"
                name={name}
                placeholder={placeholder}
                errorMessage={errorMsg}
              />
            );
          }
        )}
      </div>
    </Form>
  );
}

export default ProfileForm;
