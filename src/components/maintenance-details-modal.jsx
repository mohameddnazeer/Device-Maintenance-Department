import { closeMaintenance } from "@/store/maintenanceModalSlice";
import { Modal, ModalBody, ModalContent, ModalHeader, useDraggable } from "@heroui/modal";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaintenanceDetails from "./MaintenanceDetails";

function MaintenanceDetailsModal() {
  const dispatch = useDispatch();
  const targetRef = useRef(null);
  const data = useSelector(state => state.maintenance.rowData);
  const id = useSelector(state => state.maintenance.ID);
  const isOpen = useSelector(state => state.maintenance.isOpen);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  const onOpenChange = () => {
    dispatch(closeMaintenance());
  };

  return (
    <Modal
      size="5xl"
      ref={targetRef}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ base: "bg-light-background" }}
    >
      <ModalContent dir="rtl">
        {() => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              <h2 className="text-xl">تفاصيل عملية الصيانة</h2>
            </ModalHeader>
            <ModalBody className="overflow-auto scrollbar-hide p-4 pt-0">
              <MaintenanceDetails id={id} rowData={data} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default MaintenanceDetailsModal;
