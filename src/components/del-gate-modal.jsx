import { customFetch, getUrl } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
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

function DelGateModal({ onClose, isOpen, onOpenChange }) {
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedKey, setSelectedKey] = useState();
  const [regionSelectedKey, setRegionSelectedKey] = useState();
  const { data: regions } = useQuery({
    select: data => data.data,
    queryKey: ["delete-gate", "region"],
    queryFn: async () => customFetch("api/regions"),
  });
  const { data: gates } = useQuery({
    select: data => data.data,
    queryKey: ["delete-gate", "gate", regionSelectedKey],
    queryFn: async () => customFetch(`api/Regions/${regionSelectedKey}/Gates`),
    enabled: !!regionSelectedKey,
  });

  const onSubmit = e => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");

    let config = {
      method: "delete",
      url: getUrl() + `api/Regions/${regionSelectedKey}/Gates/${selectedKey}`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      data: data.name,
    };

    toast.promise(axios.request(config), {
      loading: "جاري حذف البوابة",
      success: () => {
        onClose();
        setSelectedKey(null);
        setRegionSelectedKey(null);
        queryClient.refetchQueries({ type: "active" });
        return "تم حذف البوابة بنجاح";
      },
      error: err => {
        console.log(err);
        return err.response.data.message || "حدث خطأ اثناء حذف البوابة";
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
        setRegionSelectedKey(null);
        setSelectedKey(null);
      }}
    >
      <ModalContent dir="rtl">
        <ModalHeader {...moveProps} className="flex flex-col gap-1">
          <h2 className="text-xl">حذف بوابة</h2>
          <p className="text-sm text-muted-foreground">
            يمكنك حذف بوابة من خلال اختيار البوابة من القائمة ثم الضغط على زر حذف
          </p>
        </ModalHeader>
        <ModalBody>
          <Form
            id="delete-gate-form"
            onSubmit={onSubmit}
            className="w-full flex flex-col items-center justify-center"
          >
            <div className="w-full overflow-auto max-h-[65vh] scrollbar-hide p-2 space-y-4">
              <Autocomplete
                isRequired
                size="lg"
                items={regions}
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
                size="lg"
                items={gates || []}
                label="البوابة"
                labelPlacement="outside"
                placeholder="اختر البوابة"
                selectedKey={selectedKey}
                onSelectionChange={setSelectedKey}
                errorMessage="من فضلك اختر البوابة"
              >
                {item => (
                  <AutocompleteItem dir="rtl" key={item.id} className="text-right">
                    {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            form="delete-gate-form"
            type="reset"
            color="danger"
            variant="light"
            onPress={onClose}
          >
            إلغاء
          </Button>
          <Button form="delete-gate-form" type="submit" color="success">
            حذف
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DelGateModal;
