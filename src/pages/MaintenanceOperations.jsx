import UpdateModal from "@/components/edit-modal";
import Table from "@/components/op-table/table";
import { ReceiveOpForm } from "@/components/receive-op-form";
import { Input } from "@/components/ui/input";
import { UpdateOpForm } from "@/components/update-op-form";
import UpdateOPModal from "@/components/update-op-modal";
import { UpdateStatusForm } from "@/components/update-status-form";
import { objectToSearchParamsStr } from "@/lib/utils";
import { closeModal as closeReceive } from "@/store/receiveModalSlice";
import { closeModal } from "@/store/updateModalSlice";
import { closeStatus } from "@/store/updateStatusSlice";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/utils/Navbar";

export const MaintenanceOperations = () => {
  const dispatch = useDispatch();
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => URLSearchParams.get("SearchTerm") || "");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isUpdateOpen = useSelector(state => state.updateModal.isOpen);
  const isStatusOpen = useSelector(state => state.updateStatus.isOpen);
  const isReceiveOpen = useSelector(state => state.receiveModal.isOpen);

  useEffect(() => {
    setURLSearchParams(objectToSearchParamsStr({ searchTerm: search }, URLSearchParams), {
      replace: true,
    });
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

            <Button type="button" onPress={onOpen} color="success">
              إضافة عملية صيانة
            </Button>
            {/* <OpModal isOpen={isOpen} onOpenChange={onOpenChange} /> */}
            <UpdateOPModal isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>
          <Table />
        </div>
      </div>
      <UpdateModal
        title="تحديث عملية الصيانة"
        isOpen={isUpdateOpen}
        onOpenChange={() => dispatch(closeModal())}
        form={<UpdateOpForm />}
        name="update-op-form"
        buttonText="تحديث البيانات"
      />
      <UpdateModal
        title="تحديث عملية الصيانة"
        isOpen={isReceiveOpen}
        onOpenChange={() => dispatch(closeReceive())}
        form={<ReceiveOpForm />}
        name="receive-op-form"
        buttonText="تحديث البيانات"
      />
      <UpdateModal
        title="تحديث الحالة"
        isOpen={isStatusOpen}
        onOpenChange={() => dispatch(closeStatus())}
        form={<UpdateStatusForm />}
        name="update-status-form"
        buttonText="تحديث الاعطال"
      />
    </>
  );
};
