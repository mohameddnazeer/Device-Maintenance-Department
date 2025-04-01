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

function UpdateModal({ title, desc, isOpen, onOpenChange, form, name, buttonText }) {
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  return (
    <Modal size="2xl" ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent dir="rtl">
        {onClose => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              <h2 className="text-xl">{title}</h2>
              <p className="text-muted-foreground">{desc}</p>
            </ModalHeader>
            <ModalBody>{form}</ModalBody>
            <ModalFooter>
              <Button form={name} type="reset" color="danger" variant="light" onPress={onClose}>
                إلغاء
              </Button>
              <Button form={name} type="submit" color="success">
                {buttonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default UpdateModal;
