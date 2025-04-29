import { closeModal, setSelectedTab } from "@/store/updateModalSlice";
import { Modal, ModalBody, ModalContent, ModalHeader, useDraggable } from "@heroui/modal";
import { Tab, Tabs } from "@heroui/tabs";
import { Tally1Icon, Tally2Icon, Tally3Icon } from "lucide-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeliverDevice } from "./receive-op-form";
import { UpdateOpForm } from "./update-op-form";
import { UpdateStatusForm } from "./update-status-form";

export const tabs = [
  {
    key: "updateStatus",
    icon: <Tally1Icon className="text-muted-foreground" />,
    title: "تحديث حالة الأعطال",
    description: "يرجى التأكد من عدم وجود أي عطل لم يتم حله قبل تسليم الجهاز",
    content: <UpdateStatusForm />,
  },
  {
    key: "updateOp",
    icon: <Tally2Icon className="text-muted-foreground" />,
    title: "تحديث عملية صيانة",
    description: "يرجى التأكد من ان حالة عملية الصيانة منتهية قبل تسليم الجهاز",
    content: <UpdateOpForm />,
  },
  {
    key: "receiveOp",
    icon: <Tally3Icon className="text-muted-foreground" />,
    title: "تسليم جهاز",
    description:
      "يرجى التأكد من عدم وجود أي عطل لم يتم حله قبل تسليم الجهاز وان عملية الصيانة منتهية",
    content: <DeliverDevice />,
  },
];

function UpdateOPModal({ isOpen, onOpenChange, onClose }) {
  const dispatch = useDispatch();
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  const selectedTabKey = useSelector(state => state.updateModal.selectedTab); // Access selected tab from Redux store
  const selectedTab = tabs.find(tab => tab.key === selectedTabKey); // Get the selected tab object

  return (
    <Modal
      size="2xl"
      ref={targetRef}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => dispatch(closeModal())}
    >
      <ModalContent dir="rtl">
        <ModalHeader {...moveProps} className="flex flex-col gap-1">
          <h2 className="text-xl">{selectedTab?.title || ""}</h2>
          <p className="text-muted-foreground">{selectedTab?.description || ""}</p>
        </ModalHeader>
        <ModalBody>
          <div className="flex w-full flex-col">
            <Tabs
              fullWidth
              radius="lg"
              aria-label="Options"
              items={tabs}
              selectedKey={selectedTabKey}
              onSelectionChange={selectedKey => dispatch(setSelectedTab(selectedKey))}
              classNames={{ panel: "h-[50vh] overflow-auto" }}
              // className="overflow-auto"
            >
              {({ key, title, content, icon }) => (
                <Tab
                  key={key}
                  title={
                    <div className="flex items-center gap-x-2">
                      {icon}
                      <span className="text-sm font-medium">{title}</span>
                    </div>
                  }
                >
                  {content}
                </Tab>
              )}
            </Tabs>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UpdateOPModal;
