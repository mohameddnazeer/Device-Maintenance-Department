import { fetchData, getUrl } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDraggable,
} from "@heroui/modal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function OfficeModal({ isOpen, onOpenChange }) {
  const targetRef = useRef(null);
  const navigate = useNavigate();
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const [regionState, setRegionState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [gateState, setGateState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [departmentState, setDepartmentState] = useState({
    selectedKey: null,
    inputValue: "",
    items: [],
  });
  const regionRes = useQuery({
    queryKey: ["addDevice", "region"],
    queryFn: async () => fetchData("api/regions"),
  });
  const gateRes = useQuery({
    queryKey: ["addDevice", "gate", regionState.selectedKey],
    queryFn: async () => {
      return fetchData(`api/regions/${regionState.selectedKey}/gates`);
    },
    enabled: !!regionState.selectedKey,
  });
  const departmentRes = useQuery({
    queryKey: ["addDevice", "department", regionState.selectedKey, gateState.selectedKey],
    queryFn: async () => {
      return fetchData(
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

  const onSubmit = e => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    const data = JSON.stringify(Object.fromEntries(new FormData(e.currentTarget)));
    console.log("🚀:", data);
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");

    let config = {
      method: "post",
      url:
        getUrl() +
        `api/regions/${regionState.selectedKey}/gates/${gateState.selectedKey}/departments/${departmentState.selectedKey}/offices?officeName=${data.name}`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      // data,
    };

    toast.promise(axios.request(config), {
      loading: <p>جاري اضافة المكتب</p>,
      success: () => {
        window.location.reload();
        return "تم اضافة المكتب بنجاح";
      },
      error: err => {
        console.log(err);
        return "حدث خطأ اثناء اضافة المكتب";
      },
    });
  };

  return (
    <Modal size="lg" ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent dir="rtl">
        {onClose => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              <h2 className="text-xl">اضافة قطاع</h2>
              <p className="text-sm text-muted-foreground">يرجى ادخال المعلومات الخاصة بالقطاع</p>
            </ModalHeader>
            <ModalBody>
              <Form
                id="add-gate-form"
                onSubmit={onSubmit}
                className="w-full flex flex-col items-center justify-center"
              >
                <div className="flex flex-col gap-y-4 w-full overflow-auto max-h-[65vh] scrollbar-hide p-2">
                  <Autocomplete
                    isRequired
                    name="regionId"
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
                    name="gateId"
                    size="lg"
                    inputValue={gateState.inputValue}
                    items={gateState.items}
                    label="البوابة"
                    labelPlacement="outside"
                    placeholder="اختر البوابة"
                    selectedKey={gateState.selectedKey}
                    onInputChange={value => onInputChange(value, setGateState, gateRes.data)}
                    onSelectionChange={key =>
                      onSelectionChange(key, setGateState, gateRes.data, "gateId")
                    }
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
                    name="deptId"
                    size="lg"
                    inputValue={departmentState.inputValue}
                    items={departmentState.items}
                    label="الإدارة"
                    labelPlacement="outside"
                    placeholder="اختر الإدارة"
                    selectedKey={departmentState.selectedKey}
                    onInputChange={value =>
                      onInputChange(value, setDepartmentState, departmentRes.data)
                    }
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

                  <Input
                    size="lg"
                    isRequired
                    errorMessage="من فضلك ادخل اسم المكتب"
                    label="اسم المكتب"
                    labelPlacement="outside"
                    name="name"
                    placeholder="اسم المكتب"
                  />
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                form="add-gate-form"
                type="reset"
                color="danger"
                variant="light"
                onPress={onClose}
              >
                إلغاء
              </Button>
              <Button form="add-gate-form" type="submit" color="success">
                إضافة
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default OfficeModal;
