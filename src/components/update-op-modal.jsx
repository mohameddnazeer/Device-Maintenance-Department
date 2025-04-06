import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDraggable,
} from "@heroui/modal";
import { Tab, Tabs } from "@heroui/tabs";
import { useRef } from "react";
import { UpdateOpForm } from "./update-op-form";
import { ReceiveOpForm } from "./receive-op-form";
import { UpdateStatusForm } from "./update-status-form";

function UpdateOPModal({ isOpen, onOpenChange }) {
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  return (
    <Modal size="2xl" ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent dir="rtl">
        {onClose => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              <h2 className="text-xl">تحديث عملية صيانة</h2>
              <p className="text-muted-foreground">
                يرجى ادخال المعلومات المطلوبة لتحديث عملية الصيانة
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-col">
                <Tabs fullWidth radius="lg" aria-label="Options">
                  <Tab key="updateOp" title="تحديث عملية صيانة">
                    <UpdateOpForm />
                  </Tab>
                  <Tab key="receiveOp" title="تسليم جهاز">
                    <ReceiveOpForm />
                  </Tab>
                  <Tab key="updateStatus" title="تحديث حالة العطل">
                    <UpdateStatusForm />
                  </Tab>
                </Tabs>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                إلغاء
              </Button>
              <Button color="success">تحديث البيانات</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default UpdateOPModal;
