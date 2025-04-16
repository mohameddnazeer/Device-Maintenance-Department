import { getUrl } from "@/lib/utils";
import { closeModal, nextTab } from "@/store/updateModalSlice";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function DeliverDevice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rowData = useSelector(state => state.updateModal.rowData); // Access row data from Redux store
  const queryClient = useQueryClient();

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
        dispatch(nextTab());
        queryClient.refetchQueries(["op-table", "maintenance"]);
        return "تم تسليم الجهاز بنجاح";
      },
      error: err => {
        console.log(err);
        return err.response.data.message || "حدث خطأ أثناء تسليم الجهاز";
      },
    });
  };

  return (
    <div className="flex flex-col gap-3 size-full">
      <span className="text-xl p-2">هل انت متأكد من تسليم الجهاز؟</span>
      <div className="flex justify-end mt-auto w-full gap-2 p-2">
        <Button color="danger" variant="light" onPress={() => dispatch(closeModal())}>
          إلغاء
        </Button>
        <Button color="success" onPress={onReceive}>
          تسليم
        </Button>
      </div>
    </div>
  );
}
