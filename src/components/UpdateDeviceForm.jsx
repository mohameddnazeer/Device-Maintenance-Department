import { fetchData, getUrl } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function UpdateDeviceForm({ onSuccess }) {
  const navigate = useNavigate();
  const rowData = useSelector(state => state.updateDevice.rowData); // Access row data from Redux store
  const [regionState, setRegionState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [gateState, setGateState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [departmentState, setDepartmentState] = useState({
    selectedKey: null,
    inputValue: "",
    items: [],
  });
  const [officeState, setOfficeState] = useState({ selectedKey: null, inputValue: "", items: [] });

  useEffect(() => {
    setRegionState(prevState => ({
      ...prevState,
      selectedKey: rowData?.region?.id,
      inputValue: rowData?.region?.name,
    }));
    setGateState(prevState => ({
      ...prevState,
      selectedKey: rowData?.gate?.id,
      inputValue: rowData?.gate?.name,
    }));
    setDepartmentState(prevState => ({
      ...prevState,
      selectedKey: rowData?.department?.id,
      inputValue: rowData?.department?.name,
    }));
    setOfficeState(prevState => ({
      ...prevState,
      selectedKey: rowData?.office?.id,
      inputValue: rowData?.office?.name,
    }));
  }, [rowData]);

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
    const data = Object.fromEntries(new FormData(event.currentTarget));
    data.id = rowData.id;
    let config = {
      method: "put",
      url:
        getUrl() +
        `api/regions/${regionState.selectedKey}/gates/${gateState.selectedKey}/departments/${departmentState.selectedKey}/offices/${officeState.selectedKey}/devices`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      data: JSON.stringify(data),
    };

    toast.promise(axios.request(config), {
      loading: "جاري تحديث البيانات",
      success: () => {
        onSuccess?.();
        return "تم تحديث البيانات بنجاح";
      },
      error: err => {
        console.log(err);
        return err.response.data.message || "فشل تحديث البيانات";
      },
    });
  };

  return (
    <Form
      dir="rtl"
      id="update-device-form"
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
            ...props
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
                  {...props}
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
                defaultValue={rowData[name]}
                {...props}
              />
            );
          }
        )}
      </div>
    </Form>
  );
}

export default UpdateDeviceForm;

const elList = [
  {
    title: "رقم الدومين",
    placeholder: "ادخل رقم الدومين",
    name: "domainIDIfExists",
    maxLength: 8,
    errorMessage: ({ validationDetails: { tooLong } }) => {
      if (tooLong) return "لا يزيد عن 8 حرفا";
    },
  },
  {
    title: "اسم المسؤول عن الجهاز",
    placeholder: "ادخل الاسم ",
    name: "owner",
    maxLength: 50,
    errorMessage: ({ validationDetails: { tooLong } }) => {
      if (tooLong) return "لا يزيد عن 50 حرفا";
    },
  },
  {
    title: "رقم المسؤول عن الجهاز",
    placeholder: "ادخل الرقم ",
    name: "phoneNmber",
    pattern: "^(010|011|012|015)[0-9]{8}$", // Egyptian phone number format
    minLength: 10,
    maxLength: 11,
    errorMessage: ({ validationDetails: { tooShort, tooLong, patternMismatch } }) => {
      if (tooShort) return "لا يقل عن 10 احرف";
      if (tooLong) return "لا يقل عن 11 احرف";
      if (patternMismatch) return "رقم الهاتف غير صحيح";
    },
  },
  {
    title: "نوع الجهاز",
    placeholder: "ادخل نوع الجهاز",
    name: "type",
    maxLength: 20,
    errorMessage: ({ validationDetails: { tooLong } }) => {
      if (tooLong) return "لا يزيد عن 20 حرفا";
    },
  },
  {
    title: "MAC",
    placeholder: "ادخل MAC",
    name: "mac",
    pattern:
      "^(?:(?:[0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}|(?:[0-9a-fA-F]{2}-){5}[0-9a-fA-F]{2}|[0-9a-fA-F]{12})$",
    errorMessage: ({ validationDetails: { patternMismatch } }) => {
      if (patternMismatch) return "صيغة MAC غير صحيحة";
    },
  },
  {
    title: "CPU",
    placeholder: "ادخل موديل CPU",
    name: "cpu",
    maxLength: 20,
    errorMessage: ({ validationDetails: { tooLong } }) => {
      if (tooLong) return "لا يزيد عن 20 حرفا";
    },
  },
  {
    title: "GPU",
    placeholder: "ادخل موديل GPU",
    name: "gpu",
    maxLength: 100,
    errorMessage: ({ validationDetails: { tooLong } }) => {
      if (tooLong) return "لا يزيد عن 100 حرفا";
    },
  },
  {
    title: "RAM",
    placeholder: "ادخل حجم RAM",
    name: "ramTotal",
    maxLength: 8,
    errorMessage: ({ validationDetails: { tooLong } }) => {
      if (tooLong) return "لا يزيد عن 8 حرفا";
    },
  },
];
