import { customFetch, fetchData, getUrl } from "@/lib/utils";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function OfficeModal({ onClose, isOpen, onOpenChange }) {
  const [errors, setErrors] = useState({}); // State to store backend errors
  const targetRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const [regionSelectedKey, setRegionSelectedKey] = useState();
  const [gateSelectedKey, setGateSelectedKey] = useState();
  const [departmentSelectedKey, setDepartmentSelectedKey] = useState();

  const { data: regions } = useQuery({
    select: data => data?.data,
    queryKey: ["add-office", "region"],
    queryFn: async () => customFetch("api/regions"),
  });
  const { data: gates } = useQuery({
    select: data => data?.data,
    queryKey: ["add-office", "gate", regionSelectedKey],
    queryFn: async () => {
      return customFetch(`api/regions/${regionSelectedKey}/gates`);
    },
    enabled: !!regionSelectedKey,
  });
  const { data: departments } = useQuery({
    queryKey: ["add-office", "department", regionSelectedKey, gateSelectedKey],
    queryFn: async () => {
      return fetchData(`api/regions/${regionSelectedKey}/gates/${gateSelectedKey}/departments`);
    },
    enabled: !!gateSelectedKey,
  });

  const onSubmit = e => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");

    let config = {
      method: "post",
      url:
        getUrl() +
        `api/regions/${regionSelectedKey}/gates/${gateSelectedKey}/departments/${departmentSelectedKey}/offices?officeName=${data.name}`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      // data,
    };

    toast.promise(axios.request(config), {
      loading: <p>جاري اضافة المكتب</p>,
      success: () => {
        onClose();
        setDepartmentSelectedKey(null);
        setGateSelectedKey(null);
        setRegionSelectedKey(null);
        queryClient.refetchQueries({ type: "active" });
        return "تم اضافة المكتب بنجاح";
      },
      error: err => {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors); // Set errors in the state
          const errorMessages = Object.values(err.response.data.errors).flat();
          toast.error(errorMessages.join(" - "));
        } else {
          toast.error("حدث خطأ اثناء اضافة المكتب");
        }
        return "فشل في اضافة المكتب";
      },
    });
  };

  return (
    <Modal
      size="lg"
      ref={targetRef}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        setDepartmentSelectedKey(null);
        setGateSelectedKey(null);
        setRegionSelectedKey(null);
      }}
    >
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
                <div className="flex flex-col gap-y-4 w-full overflow-auto max-h-[65vh] p-2">
                  <Autocomplete
                    isRequired
                    name="regionId"
                    size="lg"
                    items={regions?.data || []}
                    label="القطاع"
                    labelPlacement="outside"
                    placeholder="اختر القطاع"
                    selectedKey={regionSelectedKey}
                    onSelectionChange={setRegionSelectedKey}
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
                    isDisabled={!regionSelectedKey}
                    name="gateId"
                    size="lg"
                    items={gates?.data || []}
                    label="البوابة"
                    labelPlacement="outside"
                    placeholder="اختر البوابة"
                    selectedKey={gateSelectedKey}
                    onSelectionChange={setGateSelectedKey}
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
                    isDisabled={!gateSelectedKey}
                    name="deptId"
                    size="lg"
                    items={departments?.data || []}
                    label="الإدارة"
                    labelPlacement="outside"
                    placeholder="اختر الإدارة"
                    selectedKey={departmentSelectedKey}
                    onSelectionChange={setDepartmentSelectedKey}
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
                    errorMessage={errors.name}
                    maxLength={50}
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
