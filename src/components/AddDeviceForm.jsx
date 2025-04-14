import { fetchData, getUrl } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AddDeviceForm({ onSuccess }) {
  const navigate = useNavigate();

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
    queryFn: async () => fetchData("api/regions"),
  });
  const regionData = useMemo(
    () => (Array.isArray(regionRes?.data) ? regionRes.data : []),
    [regionRes.data]
  );
  const gateRes = useQuery({
    queryKey: ["addDevice", "gate", regionState.selectedKey],
    queryFn: async () => {
      return fetchData(`api/regions/${regionState.selectedKey}/gates`);
    },
    enabled: !!regionState.selectedKey,
  });
  const gateData = useMemo(
    () => (Array.isArray(gateRes?.data) ? gateRes.data : []),
    [gateRes.data]
  );

  const departmentRes = useQuery({
    queryKey: ["addDevice", "department", regionState.selectedKey, gateState.selectedKey],
    queryFn: async () => {
      return fetchData(
        `api/regions/${regionState.selectedKey}/gates/${gateState.selectedKey}/departments`
      );
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
      return fetchData(
        `api/regions/${regionState.selectedKey}/gates/${gateState.selectedKey}/departments/${departmentState.selectedKey}/offices`
      );
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
      let selectedItem = prevState.items.find(option => option.id.toString() === key?.toString());
      return { inputValue: selectedItem?.name || "", selectedKey: key, items: data };
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
      items: data.filter(item => item.name.includes(value)),
    }));
  };

  const onSubmit = async event => {
    event.preventDefault();
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");
    // Get form data as an object.
    const data = JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)));
    console.log("🚀", data);
    let config = {
      method: "post",
      url:
        getUrl() +
        `api/regions/${regionState.selectedKey}/gates/${gateState.selectedKey}/departments/${departmentState.selectedKey}/offices/${officeState.selectedKey}/devices`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      data,
    };

    toast.promise(axios.request(config), {
      loading: <p>جاري اضافة الجهاز</p>,
      success: res => {
        console.log("🚀 ", res);
        onSuccess?.();
        return "تم اضافة الجهاز بنجاح";
      },
      error: err => {
        console.log(err);
        return err.response.data.message || "حدث خطأ اثناء اضافة الجهاز";
      },
    });
  };

  const elList = useMemo(
    () => [
      {
        isRequired: false,
        title: "رقم الجهاز",
        placeholder: "ادخل رقم الجهاز",
        name: "domainIDIfExists",
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
        name: "owner",
        errorMsg: "اسم المسؤول مطلوب",
      },
      {
        isRequired: true,
        title: "رقم المسؤول عن الجهاز",
        placeholder: "ادخل الرقم ",
        name: "phoneNmber",
        errorMsg: "رقم المسؤول مطلوب",
      },
      {
        isRequired: false,
        title: "نوع الجهاز",
        placeholder: "ادخل نوع الجهاز",
        name: "type",
        errorMsg: "نوع الجهاز مطلوب",
      },
      {
        isRequired: false,
        title: "MAC",
        placeholder: "ادخل MAC",
        name: "mac",
        errorMsg: "عنوان MAC مطلوب",
      },
      { isRequired: false, title: "CPU", placeholder: "ادخل موديل CPU", name: "cpu" },
      { isRequired: false, title: "GPU", placeholder: "ادخل موديل GPU", name: "gpu" },
      { isRequired: false, title: "RAM", placeholder: "ادخل حجم RAM", name: "ramTotal" },
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
      className="w-full flex flex-col items-center justify-center p-2"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      {item.name}
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

export default AddDeviceForm;
