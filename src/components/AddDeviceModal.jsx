import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDraggable,
} from "@heroui/modal";
import { useRef } from "react";
import ProfileForm from "./AddDeviceForm";

const AddDeviceModal = ({ isOpen, onOpenChange }) => {
  const targetRef = useRef(null);

  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  return (
    <Modal size="5xl" ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent dir="rtl">
        {onClose => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              <h2 className="text-xl">اضافة جهاز</h2>
              <p className="text-sm text-muted-foreground">يرجى ادخال المعلومات الخاصة بالجهاز</p>
            </ModalHeader>
            <ModalBody>
              <div className="overflow-auto scrollbar-hide">
                <ProfileForm onClose={onClose} />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                form="add-device-form"
                type="reset"
                color="danger"
                variant="light"
                onPress={onClose}
              >
                إلغاء
              </Button>
              <Button form="add-device-form" type="submit" color="success">
                إضافة
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddDeviceModal;
