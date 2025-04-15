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

function DelFailureModal({ onClose, isOpen, onOpenChange }) {
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedKey, setSelectedKey] = useState();
  const { data: failures } = useQuery({
    select: data => data.data,
    queryKey: ["delete-failure"],
    queryFn: async () => customFetch("api/failures"),
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
      url: getUrl() + `api/failures/${selectedKey}`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      data: data.name,
    };

    toast.promise(axios.request(config), {
      loading: "جاري حذف العطل",
      success: () => {
        onClose();
        setSelectedKey(null);
        queryClient.refetchQueries({ type: "active" });
        return "تم حذف العطل بنجاح";
      },
      error: err => {
        console.log(err);
        return err.response.data.message || "حدث خطأ اثناء حذف العطل";
      },
    });
  };

  return (
    <Modal
      size="lg"
      ref={targetRef}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => setSelectedKey(null)}
    >
      <ModalContent dir="rtl">
        <ModalHeader {...moveProps} className="flex flex-col gap-1">
          <h2 className="text-xl">حذف عطل</h2>
          <p className="text-sm text-muted-foreground">
            يمكنك حذف عطل من خلال اختيار العطل من القائمة ثم الضغط على زر حذف
          </p>
        </ModalHeader>
        <ModalBody>
          <Form
            id="add-region-form"
            onSubmit={onSubmit}
            className="w-full flex flex-col items-center justify-center"
          >
            <div className="w-full overflow-auto max-h-[65vh] scrollbar-hide p-2 space-y-4">
              <Autocomplete
                isRequired
                size="lg"
                items={failures}
                label="العطل"
                labelPlacement="outside"
                placeholder="اختر العطل"
                selectedKey={selectedKey}
                onSelectionChange={setSelectedKey}
                errorMessage="من فضلك اختر العطل"
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
            form="add-region-form"
            type="reset"
            color="danger"
            variant="light"
            onPress={onClose}
          >
            إلغاء
          </Button>
          <Button form="add-region-form" type="submit" color="success">
            حذف
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DelFailureModal;
