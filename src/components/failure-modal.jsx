import { getUrl } from "@/lib/utils";
import { closeModal } from "@/store/failureModalSlice";
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
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function FailureModal({ isOpen, onOpenChange }) {
  const targetRef = useRef(null);
  const dispatch = useDispatch();
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      url: getUrl() + `api/failures`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      data: data.name,
    };

    toast.promise(axios.request(config), {
      loading: <p>جاري اضافة العطل</p>,
      success: () => {
        dispatch(closeModal());
        queryClient.refetchQueries({ type: "active" });
        return "تم اضافة العطل بنجاح";
      },
      error: err => {
        console.log(err);
        return err.response.data.message || "حدث خطأ اثناء اضافة العطل";
      },
    });
  };

  return (
    <Modal size="lg" ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent dir="rtl">
        {onClose => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              <h2 className="text-xl">اضافة عطل</h2>
              <p className="text-sm text-muted-foreground">يرجى ادخال المعلومات الخاصة بالعطل</p>
            </ModalHeader>
            <ModalBody>
              <Form
                id="add-region-form"
                onSubmit={onSubmit}
                className="w-full flex flex-col items-center justify-center"
              >
                <div className="w-full overflow-auto max-h-[65vh] scrollbar-hide p-2 space-y-4">
                  <Input
                    size="lg"
                    isRequired
                    errorMessage="من فضلك ادخل اسم العطل"
                    label="اسم العطل"
                    labelPlacement="outside"
                    name="name"
                    placeholder="اسم العطل"
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

export default FailureModal;
