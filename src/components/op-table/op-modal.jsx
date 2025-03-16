import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";
import { Button } from "@heroui/button";
import { PlusIcon } from "lucide-react";
import { OPForm } from "./new-op-form";

function OpModal() {
  const { setOpen } = useModal();

  return (
    <>
      <ModalTrigger className="bg-success text-success-foreground flex justify-center group/modal-btn">
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 bg-success text-success-foreground">
          استلام
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-success-foreground z-20">
          <PlusIcon className="w-6 h-6" />
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent className="overflow-auto scrollbar-hide">
          <OPForm />
        </ModalContent>
        <ModalFooter className="!bg-secondary gap-4">
          <div className="flex gap-4">
            <Button color="danger" form="add-op-form" type="reset" onPress={() => setOpen(false)}>
              الغاء
            </Button>
            <Button color="success" form="add-op-form" type="submit">
              إضافة
            </Button>
          </div>
        </ModalFooter>
      </ModalBody>
    </>
  );
}

export default OpModal;
