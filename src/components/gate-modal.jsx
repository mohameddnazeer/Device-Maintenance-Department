import { customFetch, getUrl } from "@/lib/utils";
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
import { data } from "autoprefixer";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function GateModal({ onClose, isOpen, onOpenChange }) {
  const targetRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const [regionSelectedKey, setRegionSelectedKey] = useState();

  const { data: regions } = useQuery({
    select: data => data?.data,
    queryKey: ["add-gate", "region"],
    queryFn: async () => customFetch("api/regions"),
  });
  console.log(data.data);

  const onSubmit = e => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");

    let config = {
      method: "post",
      url: getUrl() + `api/regions/${regionSelectedKey}/gates`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      data: data.name,
    };

    toast.promise(axios.request(config), {
      loading: <p>جاري اضافة البوابة</p>,
      success: () => {
        onClose();
        setRegionSelectedKey(null);
        queryClient.refetchQueries({ type: "active" });
        return "تم اضافة البوابة بنجاح";
      },
      error: err => {
        console.log(err);
        return err.response.data.message || "حدث خطأ اثناء اضافة البوابة";
      },
    });
  };

  return (
    <Modal
      size="lg"
      ref={targetRef}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => setRegionSelectedKey(null)}
    >
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
                <div className="w-full overflow-auto max-h-[65vh] flex flex-col gap-y-4 p-2">
                  <Autocomplete
                    isRequired
                    name="regionId"
                    size="lg"
                    items={regions.data}
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
