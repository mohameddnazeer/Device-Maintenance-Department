import Table from "@/components/op-table/table";
import { Input } from "@/components/ui/input";
// import { UpdateOpForm } from "@/components/update-op-form";
import OpModal from "@/components/op-modal";
import UpdateOPModal from "@/components/update-op-modal";
import { objectToSearchParamsStr } from "@/lib/utils";
import { closeModal } from "@/store/delRegionModalSlice";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "./Layout";
export const MaintenanceOperations = () => {
  const dispatch = useDispatch();
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => URLSearchParams.get("SearchTerm") || "");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isUpdateOpen = useSelector(state => state.updateModal.isOpen);

  useEffect(() => {
    setURLSearchParams(objectToSearchParamsStr({ searchTerm: search }, URLSearchParams), {
      replace: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <PageWrapper>
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
            <OpModal isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>
          <Table />
        </div>
      </div>
      <UpdateOPModal isOpen={isUpdateOpen} onOpenChange={() => dispatch(closeModal())} />
      {/* <UpdateModal
        title="تحديث عملية الصيانة"
        isOpen={isUpdateOpen}
        onOpenChange={() => dispatch(closeModal())}
        form={<UpdateOpForm />}
        name="update-op-form"
        buttonText="تحديث البيانات"
      /> */}
      {/*
      <UpdateModal
        title="تسليم الجهاز"
        isOpen={isReceiveOpen}
        onOpenChange={() => dispatch(closeReceive())}
        desc="هل انت متأكد من تسليم الجهاز؟"
      >
        <div className="flex justify-end items-center w-full gap-2 pb-3">
          <Button color="danger" variant="light" onPress={() => dispatch(closeReceive())}>
            إلغاء
          </Button>
          <Button color="success" onPress={onReceive}>
            تسليم
          </Button>
        </div>
      </UpdateModal>
      */}
      {/* <UpdateModal
        title="تحديث الحالة"
        isOpen={isStatusOpen}
        onOpenChange={() => dispatch(closeStatus())}
        form={<UpdateStatusForm />}
        name="update-status-form"
        buttonText="تحديث الاعطال"
      /> */}
    </PageWrapper>
  );
};
