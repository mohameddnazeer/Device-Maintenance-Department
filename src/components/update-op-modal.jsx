import { getUrl } from "@/lib/utils";
import { setRefetchOp } from "@/store/refetchOpSlice";
import { closeModal } from "@/store/updateModalSlice";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDraggable } from "@heroui/modal";
import { Tab, Tabs } from "@heroui/tabs";
import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UpdateOpForm } from "./update-op-form";
import { UpdateStatusForm } from "./update-status-form";

function UpdateOPModal({ isOpen, onOpenChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  const rowData = useSelector(state => state.updateModal.rowData); // Access row data from Redux store

  const onReceive = () => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");

    let config = {
      method: "put",
      url: getUrl() + `api/maintenance/MarkDeviceDone?MaintainId=${rowData.id}`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
    };

    toast.promise(axios.request(config), {
      loading: "جاري تسليم الجهاز...",
      success: () => {
        dispatch(closeModal());
        // TODO: change this later to refetch all queries
        dispatch(setRefetchOp());
        return "تم تسليم الجهاز بنجاح";
      },
      error: err => {
        console.log(err);
        return err.response.data.message || "حدث خطأ أثناء تسليم الجهاز";
      },
    });
  };

  return (
    <Modal size="2xl" ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent dir="rtl">
        {() => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              {/* <h2 className="text-xl">تحديث عملية صيانة</h2>
              <p className="text-muted-foreground">
                يرجى ادخال المعلومات المطلوبة لتحديث عملية الصيانة
              </p> */}
            </ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-col">
                <Tabs fullWidth radius="lg" aria-label="Options">
                  <Tab key="updateStatus" title="تحديث حالة العطل">
                    <UpdateStatusForm />
                  </Tab>
                  <Tab key="updateOp" title="تحديث عملية صيانة">
                    <UpdateOpForm />
                  </Tab>
                  <Tab key="receiveOp" title="تسليم جهاز">
                    هل انت متأكد من تسليم الجهاز؟
                    <div className="flex justify-end items-center w-full gap-2 pb-3">
                      <Button color="danger" variant="light" onPress={() => dispatch(closeModal())}>
                        إلغاء
                      </Button>
                      <Button color="success" onPress={onReceive}>
                        تسليم
                      </Button>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </ModalBody>
            {/* <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                إلغاء
              </Button>
              <Button color="success">تحديث البيانات</Button>
            </ModalFooter> */}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default UpdateOPModal;
