import ProfileForm from "@/components/AddDeviceForm";
import Table from "@/components/device-table/table";
import { Input } from "@/components/ui/input";
import { objectToSearchParamsStr } from "@/lib/utils";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  useDraggable,
} from "@heroui/modal";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/utils/Navbar";

const AllDevices = () => {
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    const search = URLSearchParams.get("_q");
    return search || "";
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  useEffect(() => {
    setURLSearchParams(objectToSearchParamsStr({ _q: search }, URLSearchParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <Navbar />
      <div dir="rtl" className="flex flex-col items-center justify-center mt-10">
        <div className="container space-y-4">
          <div className="flex justify-between items-center w-full">
            <Input
              placeholder="بحث"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="dark:bg-light-background md:text-xl h-12 w-2/3"
            />
            <Button onPress={onOpen} color="success">
              اضافة جهاز
            </Button>
          </div>
          <Table />
          <Modal size="5xl" ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent dir="rtl">
              {onClose => (
                <>
                  <ModalHeader {...moveProps} className="flex flex-col gap-1">
                    <h2 className="text-xl">اضافة جهاز</h2>
                    <p className="text-sm text-muted-foreground">
                      يرجى ادخال المعلومات الخاصة بالجهاز
                    </p>
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
                      variant="flat"
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
        </div>
      </div>
    </>
  );
};

export default AllDevices;
