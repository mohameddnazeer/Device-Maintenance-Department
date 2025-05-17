import { getUrl } from "@/utils/utils";
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
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function RegionModal({ onClose, isOpen, onOpenChange }) {
  const [errors, setErrors] = useState({}); // State to store backend errors
  const targetRef = useRef(null);
  const queryClient = useQueryClient();
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const navigate = useNavigate();
  const { showError, showSuccess, promiseToast } = useToast();

  const onSubmit = e => {
    // Prevent default browser page refresh.
    e.preventDefault();

    try {
      // Clear previous errors
      setErrors({});

      // Get form data as an object.
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const accessToken = window.localStorage.getItem("accessToken");
      if (!accessToken) return navigate("/login");

      let config = {
        method: "post",
        url: getUrl() + `api/regions`,
        headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
        data: data.name,
      };

      promiseToast(axios.request(config), {
        loading: "جاري اضافة القطاع",
        success: () => {
          onClose();
          queryClient.refetchQueries({ type: "active" });
          return "تم اضافة القطاع بنجاح";
        },
        duration: 5000,
      });
    } catch (error) {
      // This will catch any synchronous errors
      showError(error);
    }
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
                id="add-region-form"
                onSubmit={onSubmit}
                className="w-full flex flex-col items-center justify-center"
              >
                <div className="w-full overflow-auto max-h-[65vh] p-2">
                  <Input
                    size="lg"
                    isRequired
                    errorMessage={errors.name}
                    maxLength={50}
                    label="اسم القطاع"
                    labelPlacement="outside"
                    name="name"
                    placeholder="اسم القطاع"
                  />
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
                إضافة
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default RegionModal;
