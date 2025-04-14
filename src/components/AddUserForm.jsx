import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { customFetch, getUrl } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AddUserForm({ onSuccess }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isVisible, setIsVisible] = useState({ password: false, confirmPass: false });
  const [value, setValue] = useState(new Set([]));
  const [regionState, setRegionState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [gateState, setGateState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [departmentState, setDepartmentState] = useState({
    selectedKey: null,
    inputValue: "",
    items: [],
  });

  const regionRes = useQuery({
    select: data => data.data,
    queryKey: ["add-user", "region"],
    queryFn: async () => customFetch("api/regions"),
  });
  const gateRes = useQuery({
    select: data => data.data,
    queryKey: ["add-user", "gate", regionState.selectedKey],
    queryFn: async () => {
      return customFetch(`api/regions/${regionState.selectedKey}/gates`);
    },
    enabled: !!regionState.selectedKey,
  });
  const departmentRes = useQuery({
    select: data => data.data,
    queryKey: ["add-user", "department", regionState.selectedKey, gateState.selectedKey],
    queryFn: async () => {
      return customFetch(
        `api/regions/${regionState.selectedKey}/gates/${gateState.selectedKey}/departments`
      );
    },
    enabled: !!gateState.selectedKey,
  });

  useEffect(() => {
    regionRes.data && setRegionState(prevState => ({ ...prevState, items: regionRes.data }));
  }, [regionRes.data]);
  useEffect(() => {
    gateRes.data && setGateState(prevState => ({ ...prevState, items: gateRes.data }));
  }, [gateRes.data]);
  useEffect(() => {
    departmentRes.data &&
      setDepartmentState(prevState => ({ ...prevState, items: departmentRes.data }));
  }, [departmentRes.data]);

  const toggleVisibility = useCallback(
    value => setIsVisible(prev => ({ ...prev, [value]: !prev[value] })),
    []
  );

  const onSelectionChange = (key, setState, data, name) => {
    setState(prevState => {
      let selectedItem = prevState.items.find(option => option.id.toString() === key?.toString());
      return { inputValue: selectedItem?.name || "", selectedKey: key, items: data };
    });
    switch (name) {
      case "regionId":
        setGateState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        setDepartmentState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        break;
      case "gateId":
        setDepartmentState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
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
    data.roles = Array.from(value);
    data.departmentId = departmentState.selectedKey;
    console.log("🚀", data);

    let config = {
      method: "post",
      url: getUrl() + `api/Users`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      data: JSON.stringify(data),
    };

    toast.promise(axios.request(config), {
      loading: "جاري اضافة مستخدم جديد",
      success: res => {
        console.log("🚀 ", res);
        onSuccess?.();
        queryClient.refetchQueries({ type: "active" });
        return "تم اضافة المستخدم بنجاح";
      },
      error: err => {
        console.log(err);
        // TODO: handle error messages for validation errors
        return err.response.data.message || "حدث خطأ ما";
      },
    });
  };

  return (
    <Form
      dir="rtl"
      id="add-device-form"
      onSubmit={onSubmit}
      className="w-full flex flex-col items-center justify-center p-2"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          isRequired
          label="الاسم بالكامل"
          labelPlacement="outside"
          size="lg"
          name="name"
          placeholder="احمد محمد ..."
          errorMessage="الاسم مطلوب"
        />
        <Input
          isRequired
          label="اسم المستخدم"
          labelPlacement="outside"
          size="lg"
          name="userName"
          placeholder="ahmed123"
          errorMessage="اسم المستخدم مطلوب"
        />
        <Input
          isRequired
          label="كلمة المرور"
          labelPlacement="outside"
          size="lg"
          name="password"
          placeholder="ادخل كلمة المرور"
          minLength={10}
          maxLength={36}
          errorMessage={({ validationDetails: { tooShort, tooLong, valueMissing } }) => {
            if (tooShort) return "لا يقل عن 10 احرف";
            if (tooLong) return "لا يقل عن 36 احرف";
            if (valueMissing) return "كلمة المرور مطلوبة";
          }}
          type={isVisible.password ? "text" : "password"}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => toggleVisibility("password")}
            >
              {isVisible.password ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <Input
          isRequired
          label="تأكيد كلمة المرور"
          labelPlacement="outside"
          size="lg"
          name="confirmPass"
          placeholder="ادخل كلمة المرور"
          minLength={10}
          maxLength={36}
          errorMessage={({ validationDetails: { tooShort, tooLong, valueMissing } }) => {
            if (tooShort) return "لا يقل عن 10 احرف";
            if (tooLong) return "لا يقل عن 36 احرف";
            if (valueMissing) return "تأكيد كلمة المرور مطلوبة";
          }}
          type={isVisible.confirmPass ? "text" : "password"}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => toggleVisibility("confirmPass")}
            >
              {isVisible.confirmPass ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <Input
          isRequired
          label="رقم الهاتف"
          labelPlacement="outside"
          size="lg"
          name="phoneNumber"
          placeholder="01122334455"
          errorMessage="رقم الهاتف مطلوب"
        />
        <Select
          isRequired
          size="lg"
          label="الصلاحيات"
          placeholder="اختر الصلاحيات"
          labelPlacement="outside"
          errorMessage="الصلاحيات مطلوبة"
          selectedKeys={value}
          onSelectionChange={setValue}
          items={[
            { key: "Admin", label: "ادمن" },
            { key: "User", label: "مستخدم" },
          ]}
          classNames={{ label: "-mb-2" }}
        >
          {({ key, label }) => (
            <SelectItem key={key} dir="rtl" className="text-start">
              {label}
            </SelectItem>
          )}
        </Select>

        <Autocomplete
          isRequired
          // name="regionId"
          size="lg"
          inputValue={regionState.inputValue}
          items={regionState.items}
          label="القطاع"
          labelPlacement="outside"
          placeholder="اختر القطاع"
          selectedKey={regionState.selectedKey}
          onInputChange={value => onInputChange(value, setRegionState, regionRes.data)}
          onSelectionChange={key =>
            onSelectionChange(key, setRegionState, regionRes.data, "regionId")
          }
          errorMessage="من فضلك اختر القطاع"
        >
          {item => (
            <AutocompleteItem dir="rtl" key={item.id} className="text-right">
              {item.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          isRequired
          isDisabled={!regionState.selectedKey}
          // name="gateId"
          size="lg"
          inputValue={gateState.inputValue}
          items={gateState.items}
          label="البوابة"
          labelPlacement="outside"
          placeholder="اختر البوابة"
          selectedKey={gateState.selectedKey}
          onInputChange={value => onInputChange(value, setGateState, gateRes.data)}
          onSelectionChange={key => onSelectionChange(key, setGateState, gateRes.data, "gateId")}
          errorMessage="من فضلك اختر البوابة"
        >
          {item => (
            <AutocompleteItem dir="rtl" key={item.id} className="text-right">
              {item.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          isRequired
          isDisabled={!gateState.selectedKey}
          // name="deptId"
          size="lg"
          inputValue={departmentState.inputValue}
          items={departmentState.items}
          label="الإدارة"
          labelPlacement="outside"
          placeholder="اختر الإدارة"
          selectedKey={departmentState.selectedKey}
          onInputChange={value => onInputChange(value, setDepartmentState, departmentRes.data)}
          onSelectionChange={key =>
            onSelectionChange(key, setDepartmentState, departmentRes.data, "departmentId")
          }
          errorMessage="من فضلك اختر الإدارة"
        >
          {item => (
            <AutocompleteItem dir="rtl" key={item.id} className="text-right">
              {item.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </Form>
  );
}

export default AddUserForm;
