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

function GateModal({ isOpen, onOpenChange }) {
  const targetRef = useRef(null);
  const navigate = useNavigate();
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const [regionState, setRegionState] = useState({ selectedKey: null, inputValue: "", items: [] });

  const regionRes = useQuery({
    queryKey: ["addDevice", "region"],
    queryFn: async () => fetchData("api/regions"),
  });

  useEffect(() => {
    regionRes.data && setRegionState(prevState => ({ ...prevState, items: regionRes.data }));
  }, [regionRes.data]);

  const onSelectionChange = (key, setState, data) => {
    setState(prevState => {
      let selectedItem = prevState.items.find(option => option.id.toString() === key?.toString());
      return { inputValue: selectedItem?.name || "", selectedKey: key, items: data };
    });
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
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("🚀:", data);
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");

    let config = {
      method: "post",
      url: getUrl() + `api/regions/${regionState.selectedKey}/gates`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      data: data.name,
    };

    toast.promise(axios.request(config), {
      loading: <p>جاري اضافة البوابة</p>,
      success: () => {
        window.location.reload();
        return "تم اضافة البوابة بنجاح";
      },
      error: err => {
        console.log(err);
        return "حدث خطأ اثناء اضافة البوابة";
      },
    });
  };

  return (
    <Modal size="lg" ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent dir="rtl">
        {onClose => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              <h2 className="text-xl">اضافة بوابة</h2>
              <p className="text-sm text-muted-foreground">يرجى ادخال المعلومات الخاصة بالبوابة</p>
            </ModalHeader>
            <ModalBody>
              <Form
                id="add-gate-form"
                onSubmit={onSubmit}
                className="w-full flex flex-col items-center justify-center"
              >
                <div className="w-full overflow-auto max-h-[65vh] scrollbar-hide flex flex-col gap-y-4 p-2">
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
                      onSelectionChange(key, setRegionState, regionRes.data)
                    }
                    errorMessage="من فضلك اختر القطاع"
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
                    errorMessage="من فضلك ادخل اسم البوابة"
                    label="اسم البوابة"
                    labelPlacement="outside"
                    name="name"
                    placeholder="اسم البوابة"
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

export default GateModal;
