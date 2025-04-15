import { getUrl } from "@/lib/utils";
import { setRefetchOp } from "@/store/refetchOpSlice";
import { closeStatus } from "@/store/updateStatusSlice";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loader from "./loader";
import { Button } from "@heroui/button";
import { closeModal } from "@/store/updateModalSlice";

const states = [
  { id: 1, name: "CancelledDeviceNotNeedIt", label: "تم الإلغاء لعدم الحاجة" },
  { id: 2, name: "CancelledBasedOnOwnerRequest", label: "تم الإلغاء بناءاً علي طلب المالك" },
  { id: 3, name: "Solved", label: "تم الحل" },
  { id: 4, name: "NotSolved", label: "لم يتم الحل" },
];

export function UpdateStatusForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [failures, setFailures] = useState(new Set([]));

  const rowData = useSelector(state => state.updateModal.rowData); // Access row data from Redux store
  // const rowData = useSelector(state => state.updateStatus.rowData); // Access row data from Redux store

  useEffect(() => {
    if (rowData) setFailures(rowData.failureMaintains);
  }, [rowData]);

  const onSubmit = e => {
    // Prevent default browser page refresh.
    e.preventDefault();
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));

    let configs = [];
    Object.entries(data).forEach(([key, value]) => {
      if (rowData[key] !== value && key !== "solution") {
        configs.push({
          method: "put",
          headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
          url:
            getUrl() +
            `api/maintenance/ChangeFailureStatus?MaintainId=${rowData.id}&FailureId=${key}&status=${value}`,
        });
      }
    });

    toast.promise(Promise.all(configs.map(config => axios.request(config))), {
      loading: "جاري تحديث الحالة",
      success: () => {
        dispatch(closeStatus());
        dispatch(setRefetchOp());
        return "تم تحديث الحالة بنجاح";
      },
      error: err => {
        console.log(err);
        return err.response.data.message || "حدث خطأ أثناء تحديث الحالة";
      },
    });
  };

  if (!rowData) return <Loader />;
  return (
    <Form
      id="update-status-form"
      onSubmit={onSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto max-h-[65vh] scrollbar-hide p-2">
        {Array.from(failures).map(({ id, name, state }) => {
          return (
            <Select
              key={id}
              name={id}
              label={name}
              size="lg"
              labelPlacement="outside"
              placeholder="اختر الحالة"
              selectionMode="single"
              // TODO: Ask adham !!!!!!
              items={states}
              defaultSelectedKeys={[state]}
            >
              {item => (
                <SelectItem className="text-right" dir="rtl" key={item.name}>
                  {item.label}
                </SelectItem>
              )}
            </Select>
          );
        })}
      </div>
      <div className="justify-end w-full flex gap-2 p-2">
        <Button type="reset" color="danger" variant="light" onPress={() => dispatch(closeModal())}>
          إلغاء
        </Button>
        <Button type="submit" color="success">
          تحديث البيانات
        </Button>
      </div>
    </Form>
  );
}
