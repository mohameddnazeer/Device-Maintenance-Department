import UpdateModal from "@/components/edit-modal";
import Table from "@/components/op-table/table";
import { Input } from "@/components/ui/input";
import { UpdateOpForm } from "@/components/update-op-form";
// import UpdateOPModal from "@/components/update-op-modal";
import OpModal from "@/components/op-modal";
import { UpdateStatusForm } from "@/components/update-status-form";
import { getUrl, objectToSearchParamsStr } from "@/lib/utils";
import { closeModal as closeReceive } from "@/store/receiveModalSlice";
import { setRefetchOp } from "@/store/refetchOpSlice";
import { closeModal } from "@/store/updateModalSlice";
import { closeStatus } from "@/store/updateStatusSlice";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import PageWrapper from "./Layout";

export const MaintenanceOperations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => URLSearchParams.get("SearchTerm") || "");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isUpdateOpen = useSelector(state => state.updateModal.isOpen);
  const isStatusOpen = useSelector(state => state.updateStatus.isOpen);
  const isReceiveOpen = useSelector(state => state.receiveModal.isOpen);
  const rowData = useSelector(state => state.receiveModal.rowData); // Access row data from Redux store

  useEffect(() => {
    setURLSearchParams(objectToSearchParamsStr({ searchTerm: search }, URLSearchParams), {
      replace: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
      success: res => {
        console.log("🚀 ", res);
        dispatch(closeReceive());
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
            {/* <UpdateOPModal isOpen={isOpen} onOpenChange={onOpenChange} /> */}
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
      <UpdateModal
        title="تحديث الحالة"
        isOpen={isStatusOpen}
        onOpenChange={() => dispatch(closeStatus())}
        form={<UpdateStatusForm />}
        name="update-status-form"
        buttonText="تحديث الاعطال"
      />
    </PageWrapper>
  );
};
