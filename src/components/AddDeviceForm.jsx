import { fetchData, getUrl } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useMutation, useQuery } from "@tanstack/react-query"; // Added useMutation
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import { Button } from "./ui/button";
import { Button } from '@heroui/button';

function AddDeviceForm({ onSuccess }) {
  const navigate = useNavigate();
  // Add state variables for cpu, gpu, mac, and ramTotal
  const [cpu, setCpu] = useState("");
  const [gpu, setGpu] = useState("");
  const [mac, setMac] = useState("");
  const [ramTotal, setRamTotal] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [regionState, setRegionState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [gateState, setGateState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [departmentState, setDepartmentState] = useState({
    selectedKey: null,
    inputValue: "",
    items: [],
  });
  const [officeState, setOfficeState] = useState({ selectedKey: null, inputValue: "", items: [] });

  const [ipAddress, setIpAddress] = useState("");
  const hardwareMutation = useMutation({
    mutationFn: async ip => {
      setIsLoading(true);
      const response = await axios.get(`http://${ip}:5000/hardware`);
      return response.data;
    },
    onSuccess: data => {
      setIsLoading(false);
      toast.success("تم جلب بيانات الجهاز بنجاح");
      console.log("Hardware Data:", data);


      setCpu(data.cpu || "");
      setGpu(data.gpu || "");
      setMac(data.macAddress || "");
      setRamTotal(data.ram.totalRAM || "");
      setUsername(data.username || "");
    },
    onError: error => {
      setIsLoading(false);
      toast.error("فشل في جلب بيانات الجهاز");
      console.error("Error fetching hardware data:", error);

    },
  });
  const handleFetchHardware = () => {
    if (!ipAddress) {
      toast.error("يرجى إدخال عنوان IP");
      return;
    }
    hardwareMutation.mutate(ipAddress);
  };
  const regionRes = useQuery({
    select: data => data.data,
    queryKey: ["addDevice", "region"],
    queryFn: async () => fetchData("api/regions"),
  });
  const regionData = useMemo(
    () => (Array.isArray(regionRes?.data) ? regionRes.data : []),
    [regionRes.data]
  );
  const gateRes = useQuery({
    select: data => data.data,
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
    select: data => data.data,
    queryKey: ["addDevice", "department", regionState.selectedKey, gateState.selectedKey],
    queryFn: async () => {
      return fetchData(
        `api/regions/${regionState.selectedKey}/gates/${gateState.selectedKey}/departments`
      );
    },
    enabled: !!gateState.selectedKey,
  });

  const officeRes = useQuery({
    select: data => data.data,
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

    const data = JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)));
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
      success: () => {
        onSuccess?.();
        return "تم اضافة الجهاز بنجاح";
      },
      error: err => {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
          const errorMessages = Object.values(err.response.data.errors).flat();
          toast.error(errorMessages.join(" - "));
        } else {
          toast.error("حدث خطأ اثناء اضافة الجهاز");
        }
        return;
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
        value: username,
        // maxLength: 36,
        // errorMessage: ({ validationDetails: { valueMissing } }) => {
        //   // if (tooShort) return "لا يقل عن 10 احرف";
        //   // if (tooLong) return "لا يقل عن 36 احرف";
        //   if (valueMissing) return "رقم الجهاز مطلوب";
        // },
        errorMessage: errors.domainIDIfExists,
        onChange: e => setUsername(e.target.value),
      },
      {
        isRequired: false,
        title: "عنوان IP",
        placeholder: "ادخل عنوان IP",
        name: "ipAddress",
        value: ipAddress,
        onChange: e => setIpAddress(e.target.value),
        // errorMessage: "عنوان IP مطلوب",
        errorMessage: errors.ipAddress,
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
        // errorMessage: "القطاع مطلوب",
        errorMessage: errors.region,
      },
      {
        isRequired: true,
        isDisabled: !regionState.selectedKey,
        title: "البوابة",
        name: "gate",
        label: "البوابة",
        state: gateState,
        setState: setGateState,
        data: gateData,
        placeholder: "اختر البوابة",
        // errorMessage: "البوابة مطلوبة",
        errorMessage: errors.gate,
      },
      {
        isRequired: true,
        isDisabled: !gateState.selectedKey,
        title: "الإدارة",
        name: "department",
        label: "الإدارة",
        state: departmentState,
        setState: setDepartmentState,
        data: departmentRes.data,
        placeholder: "اختر الإدارة",
        // errorMessage: "الإدارة مطلوبة",
        errorMessage: errors.department,
      },
      {
        isRequired: true,
        isDisabled: !departmentState.selectedKey,
        title: "المكتب",
        name: "office",
        label: "المكتب",
        state: officeState,
        setState: setOfficeState,
        data: officeRes.data,
        placeholder: "اختر المكتب",
        // errorMessage: "المكتب مطلوب",
        errorMessage: errors.office,
      },
      {
        isRequired: true,
        title: "اسم المسؤول عن الجهاز",
        placeholder: "ادخل الاسم ",
        name: "owner",

        minLength: 2,
        // maxLength: 36,
        // errorMessage: ({ validationDetails: { tooShort, valueMissing } }) => {
        //   if (tooShort) return "لا يقل عن 2 احرف";
        //   // if (tooLong) return "لا يقل عن 36 احرف";
        //   if (valueMissing) return "اسم المسؤول مطلوب";
        // },
        errorMessage: errors.owner,
      },
      {
        isRequired: true,
        title: "رقم المسؤول عن الجهاز",
        placeholder: "ادخل الرقم ",
        pattern: "^(010|011|012|015)[0-9]{8}$", // Egyptian phone number format
        name: "phoneNmber",
        minLength: 10,
        maxLength: 11,
        errorMessage: ({
          validationDetails: { tooShort, tooLong, valueMissing, patternMismatch },
        }) => {
          if (tooShort) return "لا يقل عن 10 احرف";
          if (tooLong) return "لا يقل عن 11 احرف";
          if (valueMissing) return "رقم المسؤول مطلوب";
          if (patternMismatch) return "رقم الهاتف غير صحيح";
        },
      },
      {
        isRequired: false,
        title: "نوع الجهاز",
        placeholder: "ادخل نوع الجهاز",
        name: "type",
        // errorMessage: "نوع الجهاز مطلوب",
      },
      //
      {
        isRequired: false,
        title: "CPU",
        placeholder: "ادخل موديل CPU",
        name: "cpu",
        value: cpu,
        onChange: e => setCpu(e.target.value),
        errorMessage: errors.cpu,
      },
      {
        isRequired: false,
        title: "GPU",
        placeholder: "ادخل موديل GPU",
        errorMessage: errors.gpu,
        name: "gpu",
        value: gpu,
        onChange: e => setGpu(e.target.value),
      },
      {
        isRequired: true,
        title: "MAC",
        placeholder: "ادخل MAC",
        name: "mac",
        value: mac,
        onChange: e => setMac(e.target.value),
        pattern: "^(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$", // Backend-compatible regex
        errorMessage: ({ validationDetails: { patternMismatch, valueMissing } }) => {
          if (valueMissing) return "عنوان MAC مطلوب";
          if (patternMismatch) return "صيغة MAC غير صحيحة";
        },
      },
      {
        isRequired: false,
        title: "RAM",
        placeholder: "ادخل حجم RAM",
        name: "ramTotal",
        value: ramTotal,
        errorMessage: errors.ramTotal,
        onChange: e => setRamTotal(e.target.value),
      },
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
      ipAddress,
      cpu,
      gpu,
      mac,
      ramTotal,
      username,
      errors,
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
        {elList.map(({ name, title, label, state, errorMessage, setState, data, ...props }) => {
          if (label)
            return (
              <Autocomplete
                key={name}
                name={name}
                size="lg"
                inputValue={state.inputValue}
                items={state.items}
                label={label || title}
                labelPlacement="outside"
                selectedKey={state.selectedKey}
                onInputChange={value => onInputChange(value, setState, data)}
                onSelectionChange={key => onSelectionChange(key, setState, data, name)}
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
              key={name}
              name={name}
              label={label || title}
              labelPlacement="outside"
              size="lg"
              errorMessage={errorMessage}
              {...props}
            />
          );
        })}
      </div>
      <div className="flex justify-end mt-4">
        <Button
          isLoading={isLoading} // Pass loading state to the button
          type="button"
          onClick={handleFetchHardware}
          className="btn btn-primary"
        >
          جلب بيانات الجهاز
        </Button>
      </div>
    </Form>
  );
}

export default AddDeviceForm;
