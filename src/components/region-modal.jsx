import { getUrl } from "@/lib/utils";
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
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function RegionModal({ isOpen, onOpenChange }) {
  const targetRef = useRef(null);

  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const navigate = useNavigate();

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
      url: getUrl() + `api/regions`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      data: data.name,
    };

    toast.promise(axios.request(config), {
      loading: <p>جاري اضافة القطاع</p>,
      success: () => {
        window.location.reload();
        return "تم اضافة القطاع بنجاح";
      },
      error: err => {
        console.log(err);
        return "حدث خطأ اثناء اضافة القطاع";
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
                id="add-region-form"
                onSubmit={onSubmit}
                className="w-full flex flex-col items-center justify-center"
              >
                <div className="w-full overflow-auto max-h-[65vh] scrollbar-hide p-2">
                  <Input
                    size="lg"
                    isRequired
                    errorMessage="من فضلك ادخل اسم القطاع"
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
