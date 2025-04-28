import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { customFetch, getUrl } from "@/lib/utils";
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
  const [errors, setErrors] = useState({}); // State to store backend errors

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
    regionRes.data && setRegionState(prevState => ({ ...prevState, items: regionRes?.data?.data }));
  }, [regionRes?.data?.data]);
  useEffect(() => {
    gateRes.data && setGateState(prevState => ({ ...prevState, items: gateRes?.data?.data }));
  }, [gateRes?.data?.data]);
  useEffect(() => {
    departmentRes.data &&
      setDepartmentState(prevState => ({ ...prevState, items: departmentRes?.data?.data }));
  }, [departmentRes?.data?.data]);

  const toggleVisibility = useCallback(
    value => setIsVisible(prev => ({ ...prev, [value]: !prev[value] })),
    []
  );

  const onSelectionChange = (key, setState, data, name) => {
    setState(prevState => {
      let selectedItem = prevState.items?.find(option => option.id.toString() === key?.toString());
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

    let config = {
      method: "post",
      url: getUrl() + "api/Users",
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      data: JSON.stringify(data),
    };

    toast.promise(axios.request(config), {
      loading: "جاري اضافة مستخدم جديد",
      success: () => {
        onSuccess?.();
        queryClient.refetchQueries({ type: "active" });
        return "تم اضافة المستخدم بنجاح";
      },
      error: err => {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
          const errorMessages = Object.values(err.response.data.errors).flat();
          toast.error(errorMessages.join(" - "));
        } else {
          toast.error("حدث خطأ ما");
        }
        return;
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
          placeholder="ادخل الاسم بالكامل"
          // errorMessage="الاسم مطلوب"
          errorMessage={errors.name}
        />
        <Input
          isRequired
          label="اسم المستخدم"
          labelPlacement="outside"
          size="lg"
          name="userName"
          placeholder="ادخل اسم المستخدم"
          pattern="^[a-zA-Z0-9_]{3,}$" // At least 8 characters and only letters, numbers, and underscores
          // errorMessage={({ validationDetails: { valueMissing, tooShort, patternMismatch } }) => {
          //   if (valueMissing) return "اسم المستخدم مطلوب";
          //   if (tooShort) return "لا يقل عن 8 احرف";
          //   if (patternMismatch) return "يجب ان يحتوي على احرف و ارقام و _ فقط";
          // }}
          errorMessage={errors.userName}
        />
        <Input
          isRequired
          label="كلمة المرور"
          labelPlacement="outside"
          size="lg"
          name="password"
          placeholder="ادخل كلمة المرور"
          minLength={5}
          maxLength={36}
          pattern=".*[0-9].*" // Includes at least 1 number
          // errorMessage={({
          //   validationDetails: { tooShort, tooLong, valueMissing, patternMismatch },
          // }) => {
          //   if (valueMissing) return "كلمة المرور مطلوبة";
          //   if (tooShort) return "لا يقل عن 5 احرف";
          //   if (tooLong) return "لا يقل عن 36 احرف";
          //   if (patternMismatch)
          //     return "يجب ان تحتوي كلمة المرور على رقم واحد على الاقل ولا يقل عن 5 احرف";
          // }}
          errorMessage={errors.password}
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
          minLength={5}
          maxLength={36}
          pattern=".*[0-9].*" // Includes at least 1 number
          // errorMessage={({
          //   validationDetails: { tooShort, tooLong, valueMissing, patternMismatch },
          // }) => {
          //   if (valueMissing) return "كلمة المرور مطلوبة";
          //   if (tooShort) return "لا يقل عن 5 احرف";
          //   if (tooLong) return "لا يقل عن 36 احرف";
          //   if (patternMismatch)
          //     return "يجب ان تحتوي كلمة المرور على رقم واحد على الاقل ولا يقل عن 5 احرف";
          // }}
          errorMessage={errors.confirmPass}
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
          pattern="^(010|011|012|015)[0-9]{8}$" // Egyptian phone number format
          minLength={10}
          maxLength={11}
          // errorMessage={({
          //   validationDetails: { tooShort, tooLong, valueMissing, patternMismatch },
          // }) => {
          //   if (tooShort) return "لا يقل عن 10 احرف";
          //   if (tooLong) return "لا يقل عن 11 احرف";
          //   if (valueMissing) return "رقم المسؤول مطلوب";
          //   if (patternMismatch) return "رقم الهاتف غير صحيح";
          // }}
          errorMessage={errors.phoneNumber}
        />
        <Select
          isRequired
          size="lg"
          label="الصلاحيات"
          placeholder="اختر الصلاحيات"
          labelPlacement="outside"
          // errorMessage="الصلاحيات مطلوبة"
          errorMessage={errors.roles}
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
      </div>
    </Form>
  );
}

export default AddUserForm;
